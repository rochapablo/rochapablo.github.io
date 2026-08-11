# Profile Data

- Treat `src/js/profile-data.js` as the source of truth for visible profile content.
- Do not modify `src/js/profile-data.js` unless the user explicitly requests a content update.
- Layout, rendering, and style changes must preserve existing profile values exactly.
- Do not rename, rewrite, translate, simplify, normalize, or "improve" profile text without explicit instruction.
- Do not change `Pablo Rocha` to another name.
- Do not replace real companies, roles, periods, locations, focus descriptions, links, strengths, career direction, or contact values with placeholders.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- Human-readable content in source files must use normal UTF-8 characters directly. Do not replace readable accents, bullets, dashes, punctuation, or other display text with `\uXXXX`, HTML entities, or similar escapes unless a technical protocol explicitly requires it.
- Keep ordinary editable profile copy together in one clear data file rather than splitting each text section into its own module.
- Keep links/contact destinations separate from general copy, and keep experience/history separate when its structured size justifies it.
- Keep structured skills and years-of-experience data in a dedicated skills data file, and reuse that source instead of duplicating the same skill-duration information elsewhere.
- Avoid false precision for skill durations; prefer conservative maintainable values such as `7+ years` when exact totals are not defensible from the existing profile history.
- If a requested layout change seems to require content changes, report the required content decision instead of guessing.
