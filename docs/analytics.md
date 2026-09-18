# Umami analytics

The site uses the Umami Cloud tracker in the `<head>` of `index.html`. The website ID is configured there; this static GitHub Pages project has no analytics environment variable. The tracker is restricted to `rochapablo.github.io`, respects browser Do Not Track, and excludes URL query strings and hashes. Automatic page views are disabled; `trackInitialPageView()` in `src/js/analytics/index.js` records one initial page view after startup. Hash navigation does not add duplicate page views; section navigation is represented by section events.

Local development and preview hosts are excluded by `data-domains`. To exclude your own production visits, run `localStorage.setItem('umami.disabled', 1)` in that site's browser console. Remove the setting with `localStorage.removeItem('umami.disabled')`. Umami documents this browser-local exclusion at [Exclude my own visits](https://docs.umami.is/docs/exclude-my-own-visits).

## Event taxonomy

| Event | Properties | When it fires |
| --- | --- | --- |
| `engaged-visit` | `threshold_seconds: 15`, `depth` (0/25/50/75/90) | Once per tab session after 15 seconds of visible time accompanied by recent pointer, keyboard, touch, wheel, or scroll activity. Hidden tabs and periods over 30 seconds without activity do not count. |
| `minimal-scroll` | None | Once per tab session when vertical scroll reaches 100px. The passive listener removes itself after the threshold is reached. |
| `scroll-depth` | `depth` (25/50/75/90) | The first time a visitor reaches each page-depth milestone. Each milestone fires at most once per tab session. |
| `section-viewed` | `section` (`about`, `strengths`, `skills`, `experience`, `contact`) | Once when at least 35% of the section is visible. The observer stops watching that section after the first event. |
| `resume-click` | `location` (`header`, `hero`, `contact`) | A click on a resume link. This records a click, not a confirmed open or download. |
| `outbound-click` | `destination` (`linkedin`, `github`, `email`, `certificate`) | A click on one of the site's professional or contact links. No raw URLs or email addresses are sent as event properties. |
| `visitor-intent` | `intent` (`hiring`, `networking`, `technical`, `browsing`) | A visitor chooses an option in the delayed prompt. The optional company text field was removed; free text is not sent to analytics. |

The shared helper in `src/js/analytics/` allows only these event names and property keys, no-ops when Umami is unavailable, catches tracker errors, and uses session storage to suppress repeat section/depth/engagement events after rerenders or reloads within the same tab session. Link listeners are also bound only once per element. Storage restrictions can reduce de-duplication across reloads, but in-memory observers and milestone sets still suppress repeats during a page load.

## Interpreting reports

Umami defines visit duration as the time between the first and last event, and says duration is only calculated for visits with more than one page. A visitor who reads this single-page site, scrolls, or clicks a link and leaves can therefore still have a `0s` visit duration. Custom events provide behavioral evidence but do not make Umami's duration metric an active-time measurement. See [Umami metric definitions](https://docs.umami.is/docs/metric-definitions).

Umami filters bots by default according to its [configuration documentation](https://docs.umami.is/docs/environment-variables), but no analytics event or location can prove that a visitor is human. Datacenter or proxy locations may be automated traffic or legitimate visitors. Treat engagement, section exploration, and resume/contact clicks as signals, not identity or intent certainty. Umami's anonymous session reporting can show repeat activity according to its session model, but it cannot reliably establish a real-world identity.

No dashboard configuration is required to collect these events. After the first events arrive, optionally create Goals for `engaged-visit` and `resume-click` under **Goals → Triggered event**; use the Events and Properties views to compare section, destination, and intent values. Umami Goals accept a page view or event as the conversion action ([Goals documentation](https://docs.umami.is/docs/goals)).

## Validation

After deployment, open the site with browser developer tools and check that `https://cloud.umami.is/script.js` loads and that event requests contain only the event names and controlled properties above. Confirm localhost/staging hosts send no tracker data; confirm the production host records one initial page view; test a background tab, section scrolling, resume links, outbound links, and each prompt option. Then inspect **Events** and **Properties** in `cloud.umami.is`. This repository validation cannot confirm that live events have reached the production dashboard.
