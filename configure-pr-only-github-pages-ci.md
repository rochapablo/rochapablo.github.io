# PR-Only CI and GitHub Pages

## Intended behavior

The custom `PR CI` workflow validates only a same-repository pull request from `develop` to `master`. It starts when the PR is opened, reopened, or receives new commits. It does not run for ordinary pushes, PRs to other targets, or PRs from other branches, and it has no deployment steps or production secrets. A newer run for the same PR cancels its obsolete run.

| Event | Custom CI | GitHub Pages deployment |
| --- | --- | --- |
| Push to `develop` without an open PR | No | No |
| Open PR `develop` → `master` | Yes | No |
| Update that PR | Yes; older run is canceled | No |
| Reopen that PR | Yes | No |
| Close PR without merging | No new run | No |
| Merge PR into `master` | No additional custom run | Existing Pages workflow runs from `master` |
| PR from another branch or to another target | No | No |
| Direct push to `master` | No custom CI | Pages may run; prevent direct pushes through branch protection |

The workflow runs `npm ci` and `npm run validate`. The existing `validate` script runs the build and lint scripts. There are no test or typecheck scripts in `package.json` to invoke.

## Publishing and repository settings

No repository-authored Actions workflow existed before this change, so there was no custom CI workflow building ordinary `develop` pushes. The GitHub Actions API reports the active automatically generated `pages-build-deployment` workflow, and its five most recent runs were all `dynamic` events on `master`. Those observed builds are the production publishing path; no evidence of Pages builds from `develop` was found. The API's Pages settings endpoint returned 404, so the configured Pages source cannot be independently confirmed through the available access. Keep that generated workflow enabled and confirm in **Settings → Pages** that publishing is from `master`.

The GitHub API returned 401 when branch protection was requested, and no authenticated GitHub CLI is available in this environment. Protection for `master` could not be inspected. Require pull requests before merging, require the `PR CI / validate` check to pass, require the branch to be up to date if appropriate for the project, and restrict direct pushes to `master` in the repository's branch protection or ruleset settings. These settings have not been changed here.
