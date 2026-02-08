# Portfolio content

All project content lives here. **Edit only these files** to update projects, images, and videos—no need to touch React components.

## File

- **`projects.json`** – List of projects. Each project has:
  - **List fields:** `slug`, `title`, `category`, `type` (`"motion"` | `"web"`), `year`, `description`, `image` (card thumbnail)
  - **`detail`:** `heroImage`, optional `heroVideo` (URL), `overview`, `role[]`, `client`, `duration`, `gallery[]` (image URLs), optional `videos[]` (video URLs), `challenge`, `solution`

## Updating content

1. **Images:** Put files in `public/images/` and reference them as `/images/your-file.jpg` in `projects.json`.
2. **Videos:** You can use:
   - **Direct files:** Put files in `public/videos/` and set `detail.heroVideo` or `detail.videos[]` to `/videos/your-file.mp4`.
   - **YouTube:** Use any watch or share URL, e.g. `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`.
   - **Vimeo:** Use `https://vimeo.com/VIDEO_ID` or `https://player.vimeo.com/video/VIDEO_ID`.
   - **Dailymotion:** Use `https://www.dailymotion.com/video/x123abc`.
3. **Hero video:** Set `detail.heroVideo` to a YouTube/Vimeo URL or a direct video URL; the project detail page will show it instead of the hero image (autoplay, muted, loop). Use `null` or omit to keep the image.

## Switching to a headless CMS

To use Sanity, Contentful, or another CMS instead of JSON:

1. Keep the same data shape (see `Project` in `lib/projects.ts`).
2. Replace the JSON import in `lib/projects.ts` with a fetch/API call to your CMS.
3. See `docs/CMS-INTEGRATION.md` for Sanity and Contentful steps.
