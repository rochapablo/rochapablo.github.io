# Profile Data

- Treat `src/js/profile-data.js` as the source of truth for visible profile content.
- Do not modify `src/js/profile-data.js` unless the user explicitly requests a content update.
- Layout, rendering, and style changes must preserve existing profile values exactly.
- Do not rename, rewrite, translate, simplify, normalize, or "improve" profile text without explicit instruction.
- Do not change `Pablo Rocha` to another name.
- Do not replace real companies, roles, periods, locations, focus descriptions, links, strengths, career direction, or contact values with placeholders.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- If a requested layout change seems to require content changes, report the required content decision instead of guessing.
