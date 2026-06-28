import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type NewsletterSubscriber = {
  id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  newsletter_opt_in: boolean;
  consent_timestamp: string;
  unsubscribed: boolean;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function mailerLiteDate(value: string) {
  return new Date(value).toISOString().slice(0, 19).replace("T", " ");
}

function collectSecretValues(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectSecretValues);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectSecretValues);
  }
  return [];
}

function isAuthorizedRequest(request: Request) {
  const suppliedApiKey = request.headers.get("apikey");
  if (!suppliedApiKey) return false;

  const acceptedApiKeys = [Deno.env.get("SUPABASE_ANON_KEY") || ""];
  const publishableKeys = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");

  if (publishableKeys) {
    try {
      acceptedApiKeys.push(...collectSecretValues(JSON.parse(publishableKeys)));
    } catch {
      // Ignore malformed platform metadata and fall back to the legacy anon key.
    }
  }

  return acceptedApiKeys.includes(suppliedApiKey);
}

async function updateProviderSync(
  supabaseAdmin: ReturnType<typeof createClient>,
  id: string,
  providerSync: Record<string, unknown>
) {
  await supabaseAdmin
    .from("newsletter_subscribers")
    .update({ provider_sync: providerSync })
    .eq("id", id);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  if (!isAuthorizedRequest(request)) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const mailerLiteApiKey = Deno.env.get("MAILERLITE_API_KEY");
  const mailerLiteGroupId = Deno.env.get("MAILERLITE_GROUP_ID");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase Edge Function secrets are not configured." }, 500);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  let email = "";
  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  if (!email) {
    return jsonResponse({ error: "Email is required." }, 400);
  }

  const { data: subscriber, error: subscriberError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id,name,first_name,last_name,email,newsletter_opt_in,consent_timestamp,unsubscribed")
    .eq("email", email)
    .single<NewsletterSubscriber>();

  if (subscriberError || !subscriber) {
    return jsonResponse({ error: "Newsletter subscriber was not found." }, 404);
  }

  if (!subscriber.newsletter_opt_in || subscriber.unsubscribed) {
    const providerSync = {
      provider: "mailerlite",
      status: "skipped",
      reason: subscriber.unsubscribed ? "unsubscribed" : "no_consent",
      lastAttemptAt: new Date().toISOString()
    };
    await updateProviderSync(supabaseAdmin, subscriber.id, providerSync);
    return jsonResponse({ synced: false, providerSync });
  }

  if (!mailerLiteApiKey || !mailerLiteGroupId) {
    const providerSync = {
      provider: "mailerlite",
      status: "not_configured",
      lastAttemptAt: new Date().toISOString()
    };
    await updateProviderSync(supabaseAdmin, subscriber.id, providerSync);
    return jsonResponse({ synced: false, providerSync });
  }

  const mailerLiteResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${mailerLiteApiKey}`
    },
    body: JSON.stringify({
      email: subscriber.email,
      fields: {
        name: subscriber.first_name || subscriber.name,
        last_name: subscriber.last_name || ""
      },
      groups: [mailerLiteGroupId],
      status: "active",
      subscribed_at: mailerLiteDate(subscriber.consent_timestamp)
    })
  });

  const mailerLiteBody = await mailerLiteResponse.json().catch(() => ({}));
  const attemptedAt = new Date().toISOString();

  if (!mailerLiteResponse.ok) {
    const providerSync = {
      provider: "mailerlite",
      status: "failed",
      lastAttemptAt: attemptedAt,
      groupId: mailerLiteGroupId,
      lastError: JSON.stringify(mailerLiteBody).slice(0, 500)
    };
    await updateProviderSync(supabaseAdmin, subscriber.id, providerSync);
    return jsonResponse({ synced: false, providerSync, mailerLite: mailerLiteBody }, 502);
  }

  const providerSync = {
    provider: "mailerlite",
    status: "synced",
    lastAttemptAt: attemptedAt,
    groupId: mailerLiteGroupId,
    subscriberId: mailerLiteBody?.data?.id ?? null
  };
  await updateProviderSync(supabaseAdmin, subscriber.id, providerSync);

  return jsonResponse({ synced: true, providerSync });
});
