# Profile Data

- **Profile data / static HTML synchronization is mandatory.** `C:\www\rochapablo\src\js\profile-data` is the canonical source for public profile and content information. Any addition, edit, removal, rename, or restructuring under that directory that affects content rendered on the public website must also update or regenerate the corresponding crawlable/static content in `C:\www\rochapablo\index.html` in the same task, using the existing `npm run sync:html` mechanism (or `npm run build`, which runs it). The task is incomplete until the JavaScript-rendered content and `index.html` are verified to represent the same current information. Never leave profile data changed while the static HTML is stale, missing, or inconsistent.
- Use the existing synchronization mechanism; do not create a parallel content-to-HTML implementation. If a new or restructured profile field or section is not represented in static HTML, update `src/tools/sync-static-html.js` as part of that task.
- Ensure generated static HTML includes all SEO-relevant public profile content that should be available without JavaScript. Build success alone does not prove synchronization: inspect the resulting `index.html` and verify that JavaScript-rendered and crawlable/static content represent the same current information before considering the task complete.
- Do not modify files in `src/js/profile-data/` unless the user explicitly requests a content update.
- Layout, rendering, and style changes must preserve existing profile values exactly.
- Do not rename, rewrite, translate, simplify, normalize, or "improve" profile text without explicit instruction.
- Do not replace real companies, roles, periods, locations, focus descriptions, links, strengths, career direction, or contact values with placeholders.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- Human-readable content in source files must use normal UTF-8 characters directly. Do not replace readable accents, bullets, dashes, punctuation, or other display text with `\uXXXX`, HTML entities, or similar escapes unless a technical protocol explicitly requires it.
- Keep ordinary editable profile copy together in one clear data file rather than splitting each text section into its own module.
- Keep links/contact destinations separate from general copy, and keep experience/history separate when its structured size justifies it.
- Keep structured skills and years-of-experience data in a dedicated skills data file, and reuse that source instead of duplicating the same skill-duration information elsewhere.
- Keep SEO-visible profile metadata aligned with the actual profile content and human-readable for recruiters and search engines without keyword stuffing.
- Reuse existing identity, links, skills, and location data when building metadata or JSON-LD instead of duplicating maintainable values across files.
- Preserve valid JSON-LD when modifying profile information, and keep readable UTF-8 text directly in source.
- Avoid false precision for skill durations; prefer conservative maintainable values such as `7+ years` when exact totals are not defensible from the existing profile history.
- If a requested layout change seems to require content changes, report the required content decision instead of guessing.
