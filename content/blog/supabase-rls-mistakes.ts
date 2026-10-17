import type { Post } from "./types";

export const post: Post = {
  slug: "supabase-rls-mistakes",
  title: "Supabase Row Level Security: Mistakes That Leak Customer Data",
  metaTitle: "Supabase RLS Mistakes That Leak Data",
  description:
    "Supabase RLS best practices from auditing 157 API routes: the policy mistakes that expose customer data, how to spot them, and how to fix them safely.",
  keyword: "supabase rls best practices",
  datePublished: "2026-10-17",
  dateModified: "2026-10-17",
  service: "supabase-developer",
  related: ["supabase-vs-firebase", "rag-chatbot-openai-pgvector", "saas-mvp-cost"],
  intro:
    "Supabase exposes your Postgres tables through an API that anyone with your public anon key can call, so Row Level Security (RLS) is what keeps one customer's data away from everyone else. Most leaks come from a short list of mistakes: RLS left off, policies that are too broad, missing WITH CHECK rules, and server code that bypasses RLS entirely.",
  sections: [
    {
      id: "why-rls",
      title: "Why RLS matters more in Supabase",
      blocks: [
        {
          p: "In a traditional backend, the database sits behind your own API, and only your server talks to it. In Supabase, the browser talks to the database through the auto-generated API. That is what makes Supabase fast to build with, and it is why the [Supabase docs](https://supabase.com/docs/guides/database/postgres/row-level-security) treat RLS as essential for any table in an exposed schema.",
        },
        {
          p: "RLS is a PostgreSQL feature: each policy is a SQL expression that Postgres adds to every query on the table, so a user can only see or change the rows the policy allows. See the [PostgreSQL documentation on row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).",
        },
        {
          p: "On LeadsMind I audited 157 API routes and fixed RLS across the platform. These are the patterns that came up, and the ones I check first in every audit.",
        },
      ],
    },
    {
      id: "mistake-rls-off",
      title: "Mistake 1: RLS not enabled on a table",
      blocks: [
        {
          p: "A table created with SQL in an exposed schema does not get RLS automatically unless you enable it. Without RLS, the API can read and write that table with the anon key. Enable it on every table in the public schema, then add policies:",
        },
        {
          code: "alter table public.leads enable row level security;",
          lang: "sql",
        },
        {
          p: "Enabling RLS with no policies denies all access through the API. That is safe, but your app will stop working until the right policies exist, so test each one.",
        },
      ],
    },
    {
      id: "mistake-broad-policies",
      title: "Mistake 2: Policies that allow everyone",
      blocks: [
        {
          p: "The quickest way to make an error go away is a policy like `using (true)`. It also gives every signed-in user, and sometimes everyone, access to every row. Scope each policy to the owner or the tenant:",
        },
        {
          code: `create policy "tenant_isolation" on public.leads
  for all to authenticated
  using (org_id = (select auth.jwt() ->> 'org_id')::uuid)
  with check (org_id = (select auth.jwt() ->> 'org_id')::uuid);`,
          lang: "sql",
        },
        {
          p: "Note the `to authenticated` role, so anonymous requests are excluded, and wrapping the function in `select`, which the Supabase docs recommend so Postgres can evaluate it once per query instead of once per row.",
        },
      ],
    },
    {
      id: "mistake-with-check",
      title: "Mistake 3: Missing WITH CHECK on insert and update",
      blocks: [
        {
          p: "`USING` controls which existing rows a user can see or target. `WITH CHECK` controls what the row is allowed to look like after an insert or update. Without it, a user who can update their own row may be able to change its `org_id` and move data into another tenant, or insert rows on behalf of someone else.",
        },
        {
          p: "Every insert and update policy needs a WITH CHECK that ties the new row to the current user or tenant.",
        },
      ],
    },
    {
      id: "mistake-user-metadata",
      title: "Mistake 4: Trusting data the user can edit",
      blocks: [
        {
          p: "Policies that read roles or tenant IDs from user-editable metadata can be bypassed, because users can update their own user metadata. Supabase's guidance is to use app metadata (set only by the server), a custom access token claim, or a lookup in a table the user cannot write to.",
        },
        {
          p: "A safe pattern is a `memberships` table that maps users to organisations, protected by its own RLS, which other policies check with `exists (...)`.",
        },
      ],
    },
    {
      id: "mistake-service-role",
      title: "Mistake 5: Using the service role key where a user client belongs",
      blocks: [
        {
          p: "The service role key bypasses RLS completely. It belongs only in trusted server code for admin tasks, never in the browser. See the [Supabase API keys guide](https://supabase.com/docs/guides/api/api-keys).",
        },
        {
          p: "The subtler version of this mistake is in API routes: a Next.js route handler that uses a service role client to fetch data \"for the current user\" with a filter in JavaScript. If the filter is wrong or missing, RLS is not there to catch it. In the LeadsMind audit, this is exactly the kind of route I looked for. Use a client that carries the user's session so RLS applies, and reserve the service role for jobs that genuinely need it.",
        },
      ],
    },
    {
      id: "mistake-views-functions",
      title: "Mistake 6: Views and functions that bypass RLS",
      blocks: [
        {
          ul: [
            "**Views** run with the permissions of their owner by default, which can skip the RLS of the underlying tables. On Postgres 15 and later, create them with `security_invoker = true` so the caller's policies apply.",
            "**Security definer functions** run with the creator's privileges. Keep them out of exposed schemas, or check permissions inside the function, and set a fixed `search_path`.",
            "**Storage buckets** have their own policies on `storage.objects`. Private files need policies too.",
          ],
        },
      ],
    },
    {
      id: "how-to-test",
      title: "How to test your policies",
      blocks: [
        {
          ol: [
            "List every table, view, function and bucket in exposed schemas, and who should access each.",
            "Create two test users in two different organisations.",
            "For each table, try select, insert, update and delete as user A against user B's rows, and as an anonymous client.",
            "Check every server route that uses the service role key, and justify each one.",
            "Add indexes on the columns your policies filter by, such as `org_id` and `user_id`, so security does not slow queries down.",
          ],
        },
        {
          p: "The Supabase dashboard's security advisor also flags tables without RLS, which is a useful first pass but not a full audit.",
        },
      ],
    },
    {
      id: "get-help",
      title: "Get your Supabase project audited",
      blocks: [
        {
          p: "If you built quickly and are not sure what your anon key can reach, an audit gives you a ranked list of gaps and tested fixes. See my [Supabase developer and RLS audit service](/services/supabase-developer), or read how I approached it in the [LeadsMind case study](/case-studies/leadsmind).",
        },
      ],
    },
  ],
  sources: [
    { label: "Supabase: Row Level Security", href: "https://supabase.com/docs/guides/database/postgres/row-level-security" },
    { label: "Supabase: Understanding API keys", href: "https://supabase.com/docs/guides/api/api-keys" },
    { label: "PostgreSQL: Row Security Policies", href: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html" },
  ],
};
