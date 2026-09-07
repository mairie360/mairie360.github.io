# Mairie360 showcase

French public website presenting Mairie360, a modular platform in development for municipal teams. Built with Next.js, React and TypeScript, and exported as static files for GitHub Pages.

## Development

Node.js 22 or later is required.

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

The content follows the project's documented scope. Training is marked as in development, and the project section states the platform's development status. The page does not collect personal information, set analytics cookies or submit contact forms. The external project link points to the Mairie360 GitHub organization.

The original Mairie360 brand assets are retained. All interface text and controls are rendered in HTML; illustrations contain no functional interface.

`next` remains on the patched 15.5 release line. Its PostCSS dependency is overridden within the compatible 8.x line to include the fixes reported by the dependency audit.
