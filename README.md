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
npm run build
npm run typecheck
npm audit --audit-level=high
```

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

The content follows the project's documented scope. The offer explains the free invitation-only beta and the future subscription per town hall. The final commercial price is not published until validated. Workflows and training remain development work. The contact form sends a name, email and message through FormSubmit, and confirms success before navigating to the thank-you page. The external project link points to the Mairie360 GitHub organization.

## Audience and contact funnel

Plausible is optional. Without a configured site script, no tracker is loaded and the privacy page says collection is inactive. To activate it, add mairie360.fr to your Plausible account and copy its exact `https://plausible.io/js/pa-….js` script URL into `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` before building. For GitHub Pages, set the repository variable `MAIRIE360_PLAUSIBLE_SCRIPT_URL`; the build workflow passes it through. Rebuild and deploy after changing it. No API key is needed in the browser.

Create these custom-event goals in Plausible, using the exact names:

- `Offre vue` and `Contact vu`: section visible by at least 25%, once per page mount.
- `CTA contact`: button origin (`hero`, `offre`, `mobile`) and intention (`beta`, `demo`).
- `Contact commence`: first actual non-empty input, once per form mount.
- `Contact tentative`: valid submission to the provider.
- `Contact erreur`: validation or delivery error category.
- `Contact envoye`: provider success confirmed before navigation.

Pageviews are automatic. Keep automatic form-submission tracking disabled: an attempt is not a confirmed contact. Opening `/merci/` directly never sends `Contact envoye`. A retry can produce multiple attempts; compare unique conversions or an ordered funnel over the same period and channel filter, rather than raw event totals. Analytics failures never block the contact form. No input contents or arbitrary properties are transmitted by custom events. Do not put personal data in campaign parameters. Check the Plausible installation and goals in the live account before assuming collection is active; local visits are excluded by default.

The original Mairie360 brand assets are retained. All interface text and controls are rendered in HTML; illustrations contain no functional interface.

`next` and `eslint-config-next` use the matching patched 15.5.28 release. The PostCSS override stays within the compatible 8.x line, and the lockfile includes patched transitive dependencies. The complete dependency audit remains enabled in CI.

The Next lint plugin pulls in `braces`, which has an [unpatched recursion vulnerability](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Its directory-discovery dependency is therefore redirected to the private adapter in `vendor/eslint-glob`. The adapter exposes only the `globSync` API used by the plugin, backed by `tinyglobby`, with directory expansion disabled and root paths normalized. The plugin version and configured rules are retained. Regression tests cover literal and wildcard roots, App Router dynamic links, and document rules under ESLint 9. Remove this workaround once the upstream glob dependency is fixed.
