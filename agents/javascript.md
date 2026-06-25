# JavaScript

- Use vanilla JavaScript and browser-native ES modules.
- Keep modules small and focused.
- Keep rendering split into small files.
- Keep profile/page content centralized in `src/js/profile-data.js`.
- Do not hardcode repeated profile content in HTML.
- Do not duplicate rendering logic.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- Do not invent experience data.
- Remove unused constants, functions, selectors, and event listeners.

Relevant JavaScript files:

- `src/js/profile-data.js`
- `src/js/main.js`
- `src/js/render.js`
- `src/js/render-experience.js`
