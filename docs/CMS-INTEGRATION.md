# Headless CMS integration

Your portfolio content is already decoupled: components read from `lib/projects.ts`, which currently loads `content/projects.json`. To use a headless CMS instead, keep the same `Project` type and swap the data source in `lib/projects.ts`.

## Option A: Sanity

1. **Create a Sanity project** at [sanity.io](https://www.sanity.io) and install the CLI:
   ```bash
   npm create sanity@latest
   ```
2. **Define a schema** that matches your project shape, e.g. a document type `project` with fields: `slug`, `title`, `category`, `type` (motion | web), `year`, `description`, `image` (image asset), `detail` (object with `heroImage`, `heroVideo`, `overview`, `role` (array), `client`, `duration`, `gallery` (array of images), `videos` (array of file/url), `challenge`, `solution`).
3. **Install the client** in your Next app:
   ```bash
   pnpm add next-sanity @sanity/image-url
   ```
4. **Add env vars** (e.g. in `.env.local`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. **Create a Sanity data layer**, e.g. `lib/sanity.ts`:
   - Configure `createClient` with project id and dataset.
   - Add a GROQ query that returns all projects (and optionally one by `slug`).
   - Map Sanity response to your `Project` type (image URLs via `urlFor(image).url()` etc.).
6. **In `lib/projects.ts`**: Replace the JSON import with async functions that call your Sanity client and return `Project[]` / `Project | undefined`. Use `generateStaticParams` and page data fetching with the async API (e.g. `getProjects()`, `getProjectBySlug(slug)` as async).

Because Next.js app router supports async server components, making `getProjectBySlug` and project list async is straightforward; update the project page and any server-side callers to `await` them.

## Option B: Contentful

1. **Create a space** at [contentful.com](https://www.contentful.com) and define a Content Model `Project` with the same fields as above (Short text, Number, References to Media, etc.).
2. **Install the client**:
   ```bash
   pnpm add contentful
   ```
3. **Add env vars**:
   ```
   CONTENTFUL_SPACE_ID=...
   CONTENTFUL_ACCESS_TOKEN=...
   ```
4. **Create `lib/contentful.ts`**: Use `createClient({ space, accessToken })`, then `client.getEntries({ content_type: 'project' })` and map entries to your `Project` type (including resolving asset URLs).
5. **In `lib/projects.ts`**: Replace the JSON source with calls to your Contentful layer; make the API async and update pages to await it.

## Shared checklist

- [ ] CMS content model matches `Project` (and `detail`) in `lib/projects.ts`.
- [ ] Image/video URLs are resolved (Sanity `urlFor`, Contentful asset `file.url`).
- [ ] `lib/projects.ts` exports the same interface and function names (`getProjectBySlug`, `getAllSlugs`, and a way to get all projects) so components and `generateStaticParams` need minimal or no changes.
- [ ] Consider ISR or revalidation (e.g. `revalidate = 60` or webhook-triggered revalidate) so content updates appear without a full rebuild.

Once the data layer in `lib/projects.ts` reads from your CMS instead of JSON, your existing React components will continue to work without touching the HTML/JSX.
