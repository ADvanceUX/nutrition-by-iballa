# Supabase Edge Functions

## MailerLite newsletter sync

`sync-mailerlite` is called by the React app after a user has been saved to
`newsletter_subscribers` with newsletter consent.

The browser never receives the MailerLite API key. The function reads the
subscriber from Supabase with the service-role key, then creates or updates the
subscriber in MailerLite and adds them to the configured newsletter group.

Required Supabase secrets:

```bash
npx supabase@latest secrets set SUPABASE_URL=https://znmiqgalznlgxrjdygir.supabase.co --project-ref znmiqgalznlgxrjdygir
npx supabase@latest secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key --project-ref znmiqgalznlgxrjdygir
npx supabase@latest secrets set MAILERLITE_API_KEY=your-mailerlite-api-key --project-ref znmiqgalznlgxrjdygir
npx supabase@latest secrets set MAILERLITE_GROUP_ID=189083886446183631 --project-ref znmiqgalznlgxrjdygir
```

Deploy:

```bash
npm run supabase:functions:deploy
```

The function disables the platform `verify_jwt` check because the browser uses
Supabase's newer `sb_publishable_...` API key, which is not a JWT. The function
still validates the request's `apikey` header against the project's configured
publishable or legacy anon keys before processing a subscriber.

Confirm deployment:

```bash
npm run supabase:functions:list
```

If the function is not listed, run `npm run supabase:login` first and deploy
again. The project is pinned in `supabase/config.toml` and the npm scripts also
pass `--project-ref znmiqgalznlgxrjdygir`.

Recommended MailerLite setup:

1. Create a group named `Nutrition by Iballa Newsletter`.
2. Copy the group ID from MailerLite.
3. Save that ID as `MAILERLITE_GROUP_ID`.

If MailerLite secrets are missing, subscribers still remain safely stored in
Supabase and `provider_sync.status` is set to `not_configured`.

If a MailerLite API token was pasted into chat, logs, or a public place, revoke
that token in MailerLite and generate a new one before using it here.
