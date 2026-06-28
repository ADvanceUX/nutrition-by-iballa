import { requireSupabase } from "./supabaseClient";

export const ASSESSMENT_DRAFT_KEY = "nutritionByIballa.assessmentDraft";

function assertNoError(error) {
  if (error) {
    throw new Error(error.message || "Supabase request failed.");
  }
}

async function syncNewsletterSubscriber(email) {
  const supabase = requireSupabase();
  try {
    const { error } = await supabase.functions.invoke("sync-mailerlite", {
      body: { email: email.trim().toLowerCase() }
    });

    if (error) {
      // The Supabase record is the source of truth; provider sync can be retried later.
      console.warn("MailerLite sync did not complete:", error.message || error);
    }
  } catch (error) {
    console.warn("MailerLite sync did not complete:", error.message || error);
  }
}

export function loadAssessmentDraft() {
  try {
    const value = window.localStorage.getItem(ASSESSMENT_DRAFT_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function saveAssessmentDraft(draft) {
  window.localStorage.setItem(ASSESSMENT_DRAFT_KEY, JSON.stringify(draft));
}

export function clearAssessmentDraft() {
  window.localStorage.removeItem(ASSESSMENT_DRAFT_KEY);
}

export async function createAssessmentLead(contact) {
  const supabase = requireSupabase();
  const consentTimestamp = contact.newsletterOptIn ? new Date().toISOString() : null;
  const { data, error } = await supabase.rpc("create_assessment_lead", {
    p_first_name: contact.firstName.trim(),
    p_last_name: contact.lastName.trim(),
    p_email: contact.email.trim().toLowerCase(),
    p_newsletter_opt_in: Boolean(contact.newsletterOptIn),
    p_consent_timestamp: consentTimestamp
  });

  assertNoError(error);

  if (contact.newsletterOptIn) {
    await syncNewsletterSubscriber(contact.email);
  }

  return {
    leadId: data,
    consentTimestamp
  };
}

export async function saveAssessmentResponse({ leadId, answers, result }) {
  const supabase = requireSupabase();
  const { error } = await supabase.rpc("complete_assessment", {
    p_lead_id: leadId,
    p_answers: answers,
    p_result: result
  });

  assertNoError(error);
}

export async function subscribeFromBlog({ firstName, lastName, email, source = "blog" }) {
  const supabase = requireSupabase();
  const { data, error } = await supabase.rpc("subscribe_newsletter", {
    p_first_name: firstName.trim(),
    p_last_name: lastName.trim(),
    p_email: email.trim().toLowerCase(),
    p_source: source,
    p_consent_timestamp: new Date().toISOString()
  });

  assertNoError(error);
  await syncNewsletterSubscriber(email);
  return data;
}

export async function listSubscribers() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("id,name,first_name,last_name,email,source,newsletter_opt_in,consent_timestamp,signup_date,unsubscribed,unsubscribed_at,provider_sync")
    .order("signup_date", { ascending: false });

  assertNoError(error);
  return data || [];
}

export async function updateUnsubscribeStatus(id, unsubscribed) {
  const supabase = requireSupabase();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({
      unsubscribed,
      unsubscribed_at: unsubscribed ? new Date().toISOString() : null
    })
    .eq("id", id);

  assertNoError(error);
}

export async function getCurrentSession() {
  const supabase = requireSupabase();
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  assertNoError(error);
  return session;
}

export async function signInAdmin(email, password) {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });

  assertNoError(error);
}

export async function signOutAdmin() {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signOut();

  assertNoError(error);
}

export async function isCurrentUserAdmin() {
  const supabase = requireSupabase();
  const { data, error } = await supabase.rpc("is_admin");

  assertNoError(error);
  return Boolean(data);
}
