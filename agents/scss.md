# SCSS

- Edit SCSS partials, not generated CSS directly.
- Compile SCSS to `dist/css/styles.css`.
- Control colors through `src/scss/_variables.scss`.
- Do not hardcode repeated colors in component partials.
- Keep the dark green/charcoal, warm off-white, and gold-accent direction unless the user explicitly asks for a new palette.
- Preserve accessible contrast and visible focus states.
- Keep partials small and focused.
- Avoid deep nesting.
- Reuse existing classes and layout patterns before adding new ones.
- Remove obsolete selectors when changing layout.
- Do not create duplicate button, card, or timeline styles.

Relevant SCSS files:

- `src/scss/_variables.scss`
- `src/scss/_base.scss`
- `src/scss/_layout.scss`
- `src/scss/_components.scss`
- `src/scss/_experience.scss`
- `src/scss/_utilities.scss`
- `src/scss/styles.scss`
