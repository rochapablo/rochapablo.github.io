# Profile Data

## Resume and Website Profile Synchronization

- Treat `C:\www\rochapablo\resume.pdf` as the canonical source for professional facts. The modules under `src/js/profile-data/` are the canonical source for how selected profile content is presented on the website; they must not contradict the resume.
- Before changing professional or contact information, read the current resume and inspect **all relevant files** under `src/js/profile-data/`, not only the file being edited. Compare the site against the resume, identify outdated, missing, conflicting, and repeated facts, then update only what is appropriate and validate consistency.
- Run this comparison whenever `resume.pdf` is replaced or updated; assume any relevant profile-data module may need synchronization. Do not make changes if the site is already factually consistent.
- Check titles, summary, years of experience, current/latest role, employers, role names, dates, responsibilities, technologies and skills, leadership experience, education, certifications, location, email, phone, LinkedIn, and website/GitHub URLs where applicable. Also look for website claims removed or materially changed in the resume.
- Do not copy the resume wholesale. Shorter, marketing- or SEO-oriented wording, selected highlights, reordered or grouped facts, and presentation-only content are fine when the underlying facts remain accurate. Do not delete a website-only item just because it is absent from the resume: decide whether it is presentation content or stale professional information first.
- Prefer a single reusable definition for repeated facts such as identity, contact details, titles, employers and dates, skills, education, and profile URLs when safe and simple. Keep ordinary profile copy together, contact destinations separate, and structured experience/skills in their existing focused modules. Avoid broad refactors solely to centralize data.

## Static HTML Synchronization

- **Profile data / static HTML synchronization is mandatory.** Any addition, edit, removal, rename, or restructuring under `src/js/profile-data/` that affects public website content must also update or regenerate the corresponding crawlable/static content in `index.html` in the same task, using the existing `npm run sync:html` mechanism (or `npm run build`, which runs it). The task is incomplete until the JavaScript-rendered content and `index.html` are verified to represent the same current information. Never leave profile data changed while the static HTML is stale, missing, or inconsistent.
- Use the existing synchronization mechanism; do not create a parallel content-to-HTML implementation. If a new or restructured profile field or section is not represented in static HTML, update `src/tools/sync-static-html.js` as part of that task.
- Ensure generated static HTML includes all SEO-relevant public profile content that should be available without JavaScript. Build success alone does not prove synchronization: inspect the resulting `index.html` and verify that JavaScript-rendered and crawlable/static content represent the same current information before considering the task complete.
- Do not modify files in `src/js/profile-data/` during layout/rendering work unless needed to preserve existing values. A request to update profile content or synchronize the site after a resume update authorizes relevant content changes.
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
