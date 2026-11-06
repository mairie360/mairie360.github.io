# Mairie360 showcase

French public website presenting Mairie360, a modular platform in development for municipal teams. Built with Next.js, React and TypeScript, and exported as static files for GitHub Pages.

## Development

Node.js 22.13 or later is required.

```sh
npm ci
npm run dev
```

## Validation and production build

```sh
npm run lint
npm test             # unit tests of the pure modules in src/lib and src/components
npm run build
npm run test:html    # checks the exported HTML in out/ (run after the build)
npm run typecheck
npm audit --audit-level=high
```

`npm run test:html` parses every exported page with `parse5` and checks what visitors and search
engines receive before any JavaScript runs: French metadata, canonical URLs, sitemap, a single `h1`
and no skipped heading level, alt texts, link targets with trailing slashes, ARIA references, the
contact form fields, the platform tabs and the initial state of the modules board.

The production website is generated in `out/`. To inspect that exact export locally, serve the directory with a static HTTP server, for example:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

GitHub Actions validates `main`, feature branches and pull requests. Only `main` is deployed to GitHub Pages. Static export is configured in `next.config.ts`; no backend or runtime environment variables are needed.

## Content and assets

- `src/lib/showcase-data.ts`: French module descriptions and role-specific content.
- `src/components/module-preview.tsx`: explicitly labelled illustrative examples, not live municipal data.
- `src/app/page.tsx`: page structure, introductory copy and project link.
- `src/app/globals.css`: responsive design tokens and component styles.
- `public/images/mairie-collectif.webp`: original generated town-hall illustration, optimized for the web.
- `src/app/fonts/`: self-hosted Manrope font and its SIL Open Font License.

The landing page follows the Figma mockup [Mairie360 — Site vitrine](https://www.figma.com/design/8IGgmm2Hrs39VMQNWfJHFR) (desktop 1440 and phone 390 pages): hero, a thirty-year timeline of municipal tools, audiences, a without/with Mairie360 module board, the platform tabs, support steps, the free invitation-only beta offer and the demo request form. After the demonstration, accounts are prepared for browser access. A future paid subscription per town hall is planned, with pricing still to be confirmed. No commercial price is published. Workflows and training remain development work. The contact form sends a name, town, work email and an optional need through FormSubmit, and confirms success before navigating to the thank-you page. The external project link points to the Mairie360 GitHub organization.

## Audience and contact funnel

The standard Google Analytics 4 service replaces Plausible. Without a valid Web stream measurement ID, no Google tag or consent banner is loaded. A Tag Manager container (`GTM-…`) is not a GA4 measurement ID and is rejected. No analytics subscription or additional hosting is required for this integration.

### Activation

1. In Google Analytics, create a property and Web data stream for `https://mairie360.fr`. Select the reporting timezone deliberately and retain it for the before/after comparison.
2. Copy its **Measurement ID** (`G-…`) into `NEXT_PUBLIC_GA_MEASUREMENT_ID` for local builds, or the GitHub repository variable `MAIRIE360_GA_MEASUREMENT_ID` for Pages. This public ID is not a password. Rebuild and deploy after changing it; do not add a second Google tag or the supplied GTM container.
3. **Disable enhanced measurement on this Web stream before activation.** Page views, section views and forms are measured explicitly here. Automatic history/form/outbound/search tracking can duplicate events, include URL data or count a submit attempt as a lead. Do not connect Google Ads, enable Google Signals or enable automatic user-provided data collection for this purpose. Review the property's retention and data-sharing settings.
4. In Analytics, mark **`generate_lead`** as a key event. The site sends it only after FormSubmit confirms success, never on a button click or a direct `/merci/` visit. Configure custom dimensions `origine`, `intention` and `etape` only if needed for the reports.
5. On the deployed site, accept analytics and verify the Web stream ID, page views and funnel events in Realtime. Confirm that refusal keeps the tag absent, contact still works and withdrawal stops collection. Exclude identifiable internal QA activity from reporting.

### Consent and payload

Basic consent blocks loading `gtag.js` and drops all events before acceptance, rather than queueing actions for later replay. The equal Accept/Refuse controls leave the contact form available. The choice lasts 180 days, applies across the site and can be changed through **Gérer les cookies** in the footer. Withdrawal sets Google's measurement-disable flag, updates consent to denied, drops pending commands and expires the site's accessible `_ga` cookies. Advertising storage, user data and personalization remain denied. A browser with blocked local storage keeps the choice only for the current document.

The page URL sent to Analytics omits query strings/fragments. Referrers retain only their origin. Only restricted campaign labels from `utm_source`, `utm_medium` and `utm_campaign` are preserved; use static publication codes such as `beta_2026`, never personal data. Form contents, free-text error messages and unknown event properties are not sent. Enhanced measurement must remain disabled so the property does not add a second automatic collection path.

### Events and reporting

| Site action | GA4 event | Optional categories |
| --- | --- | --- |
| Offer section visible at least 25% | `offer_view` | — |
| Contact section visible at least 25% | `contact_view` | — |
| Contact CTA click | `contact_cta` | `origine`: bandeau/hero/offre; `intention`: demo/beta |
| First non-empty form input after consent | `contact_start` | — |
| Valid submission attempt | `contact_attempt` | — |
| Validation or delivery failure | `contact_error` | `etape`: validation/envoi |
| Confirmed provider success | `generate_lead` | — |

Page views are sent explicitly once per route transition. Section views are limited to once per section and consent period. Analytics failures never block the contact form. A retry can create multiple attempts: compare unique users who converted with measured visitors over the **same period**, rather than dividing raw event counts. Name the dates and the modification, and use comparable acquisition channels for before/after periods. These reports cover consenting measurable traffic, not every site visitor. This integration alone cannot prove that a change caused an improvement.

Official references: [basic consent](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic), [configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config), [key events](https://support.google.com/analytics/answer/12946393).

The original Mairie360 brand assets are retained. All interface text and controls are rendered in HTML; illustrations contain no functional interface.

`next` and `eslint-config-next` use the matching patched 15.5.28 release. The PostCSS override stays within the compatible 8.x line, and the lockfile includes patched transitive dependencies. The complete dependency audit remains enabled in CI.

The Next lint plugin pulls in `braces`, which has an [unpatched recursion vulnerability](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Its directory-discovery dependency is therefore redirected to the private adapter in `vendor/eslint-glob`. The adapter exposes only the `globSync` API used by the plugin, backed by `tinyglobby`, with directory expansion disabled and root paths normalized. The plugin version and configured rules are retained. Regression tests cover literal and wildcard roots, App Router dynamic links, and document rules under ESLint 9. Remove this workaround once the upstream glob dependency is fixed.
