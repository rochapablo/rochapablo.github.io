# JavaScript

- Use vanilla JavaScript and browser-native ES modules.
- Keep modules small and focused.
- Keep rendering split into small files.
- Keep profile/page content in the modules under `src/js/profile-data/`. Follow `profile-data.md` for the mandatory static HTML synchronization rule.
- Do not hardcode repeated profile content in HTML.
- Do not duplicate rendering logic.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- Do not invent experience data.
- Remove unused constants, functions, selectors, and event listeners.

Relevant JavaScript files:

- `src/js/profile-data/index.js` and its data modules
- `src/js/main.js`
- `src/js/render/`
