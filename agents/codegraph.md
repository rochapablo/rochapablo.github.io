# CodeGraph Guidance

## Purpose

CodeGraph is installed as project-local developer tooling through `@colbymchenry/codegraph`. Use it to map files, imports, symbols, references, and impact areas before opening many files manually.

## Available npm Scripts

- `npm run codegraph:init` initializes `.codegraph/` and builds the first index.
- `npm run codegraph:status` shows index status and statistics.
- `npm run codegraph:sync` syncs changes since the last index.
- `npm run codegraph:affected` reports affected test files for changed sources when applicable.

CodeGraph is optional for normal local development. The static site still runs with the regular project scripts.

## Agent Workflow

- Run `npm run codegraph:status` first when CodeGraph may already be initialized.
- Run `npm run codegraph:init` if there is no index yet.
- Use CodeGraph before broad manual exploration.
- Query references, imports, and affected areas to identify the smallest safe edit.
- Fall back to targeted manual search when CodeGraph is unavailable, incomplete, or unclear.

## Intended Index Scope

Focus on source and documentation:

- `index.html`
- `src/js/`
- `src/scss/`
- `src/tools/`
- `agents/`
- `README.md`
- `package.json`

Avoid spending attention on generated or heavy paths:

- `node_modules/`
- `dist/`
- `.codegraph/`
- `.codegraph-cache/`

## Sync Rules

- Sync after file moves, branch changes, or source/documentation edits that affect references.
- Re-index only when sync is insufficient or CodeGraph reports an invalid index.
- Do not repeatedly re-index without a clear reason.
- Keep `.codegraph/` and `.codegraph-cache/` uncommitted.

## Cost-Control Rules

- Prefer CodeGraph queries over full-tree scans.
- Read only files needed for the current task.
- Keep optional follow-ups separate from required work.
- Keep final reports concise and mention only commands actually run.

## Final-Report Expectations

- State whether CodeGraph was available.
- List CodeGraph commands actually run and their results.
- Mention uncertainty if the index was unavailable, stale, or incomplete.
- Do not claim CodeGraph validation passed unless it was actually run.
