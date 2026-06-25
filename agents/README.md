# Agent Guidance

## Purpose

This file contains instructions for agents working on this small static landing page. Keep the project simple, maintainable, and GitHub Pages friendly.

## Project Principles

- Keep code clean, simple, and readable.
- Keep code DRY.
- Do not duplicate logic, styles, strings, or data.
- Reuse existing helpers, modules, selectors, styles, and scripts before creating new ones.
- Keep files small and focused.
- Prefer small targeted changes over broad rewrites.
- Preserve existing behavior unless the task explicitly requires changing it.
- Do not invent parallel implementations.
- Do not touch unrelated files.
- Keep the project static and GitHub Pages friendly.
- Do not change `Pablo Rocha` to another name.

## Token and Cost Control

- Start with the smallest relevant files.
- Prefer targeted searches over broad repository scans.
- Read package scripts and existing structure before editing.
- Avoid re-reading large files repeatedly.
- Do not generate unnecessary reports, logs, or verbose explanations.
- Avoid broad refactors unless directly requested.
- Separate required changes from optional follow-ups.
- Keep final reports concise.

## CodeGraph Usage

- Read `agents/codegraph.md` before repository exploration.
- Use CodeGraph first to map relevant files, symbols, references, imports, and impact areas.
- Prefer CodeGraph queries over broad manual searches.
- Use CodeGraph to identify the smallest code surface before opening files.
- Keep CodeGraph synchronized after file moves, generated files, branch changes, or when results appear stale.
- Re-index only when necessary.
- Fall back to targeted manual search only when CodeGraph is insufficient.
- Mention CodeGraph uncertainty in the final report when relevant.

## Layout Preservation

- Read `agents/layout-guidelines.md` before changing layout, theme, sections, SCSS, or portfolio presentation.
- Preserve the accepted visual direction unless the user explicitly asks for a redesign.

## JavaScript Guidance

- Use vanilla JavaScript only.
- Keep ES modules small and focused.
- Keep profile/page data centralized.
- Do not duplicate personal data in multiple JS files.
- Do not hardcode experience content in HTML.
- Prefer clear DOM creation and render functions.
- Remove unused functions, constants, selectors, and event listeners.

## SCSS/CSS Guidance

- Edit SCSS source files, not generated CSS, unless there is a specific reason.
- Compile SCSS to `dist/css/styles.css`.
- Keep partials small and focused.
- Avoid deeply nested selectors.
- Remove unused selectors, variables, utilities, and comments.
- Preserve accessible contrast and responsive layout.

## Validation Guidance

- Use the smallest relevant validation.
- Run `npm run build` when SCSS changes.
- Run `npm run lint` or `npm run validate` when source files change, if available.
- Run `npm run dev` only when local visual verification is needed.
- Do not claim validation passed unless it was actually run and passed.
- Report commands and results only if actually run.

## Documentation Guidance

- Keep the root README minimal.
- Put agent workflow details in `agents/README.md`.
- Avoid duplicating the same instructions in multiple files.
- Keep documentation current with package scripts and folder structure.
