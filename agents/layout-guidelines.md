# Layout Guidelines

## Purpose

This file protects the current portfolio layout and visual system from accidental generic rewrites.

## Layout Identity

- Keep the site editorial but professional.
- Preserve the high-contrast visual direction.
- Keep it minimal but not generic.
- Keep the tone suitable for a Senior Full Stack Developer / Tech Lead.
- Keep the project static and GitHub Pages friendly.
- Use portfolio/resume section rhythm as inspiration without copying external references.

## Required Visual Structure

- Strong hero with a dark contrast background.
- Clear profile facts and focus areas.
- About / Professional Snapshot section.
- Grouped strengths cards.
- Resume/timeline-style experience section.
- Intentional career direction / "What I am looking for" panel.
- Visible contact section with consistent link/button styling.
- Footer with `Pablo Rocha` and the current year behavior.

## Theme Rules

- Control colors through `src/scss/_variables.scss`.
- Do not hardcode repeated colors in component partials.
- Keep the dark green/charcoal, warm off-white, and gold-accent direction unless the user explicitly asks for a new palette.
- Change palettes by adjusting variables first.
- Preserve accessible contrast.
- Preserve visible focus states.

## SCSS Rules

- Edit SCSS partials, not generated CSS directly.
- Compile SCSS to `dist/css/styles.css`.
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

## JavaScript and Content Rules

- Keep profile/page content centralized in `src/js/profile-data.js`.
- Keep rendering split into small modules.
- Do not hardcode repeated profile content in HTML.
- Do not duplicate rendering logic.
- Preserve structured experience attributes: `role`, `company`, `period`, `location`, and `focus`.
- Do not invent experience data.

Relevant JavaScript files:

- `src/js/profile-data.js`
- `src/js/main.js`
- `src/js/render.js`
- `src/js/render-experience.js`

## Change-Control Rules

- Make the smallest stable change needed.
- Preserve the existing layout unless the user explicitly asks to redesign it.
- Make new sections follow the existing rhythm, spacing, contrast, and card/panel language.
- Avoid broad rewrites.
- Avoid reverting to a plain or generic resume layout.
- Keep files small enough to pass file-size linting.
- Keep code clean, DRY, and free of duplicate strings, styles, and helpers.

## Validation Rules

- Run `npm run build` after SCSS changes.
- Run `npm run lint` after source changes.
- Run `npm run validate` when both build and lint should be checked.
- Run `npm run dev` only when visual verification is needed.
- Do not claim validation passed unless commands actually ran and passed.
- Confirm no `Pablo Henrique` reference exists after changes.

## Final Report Expectations

- List files changed.
- Summarize layout/theme impact.
- State whether `Pablo Rocha` was preserved.
- State whether `Pablo Henrique` is absent.
- Report commands run and actual results.
- Mention any uncertainty.
