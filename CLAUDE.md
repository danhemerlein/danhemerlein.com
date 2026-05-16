# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start development server (react-app-rewired)
yarn build        # Production build
yarn test         # Jest in watch mode (single file)
yarn test-all     # Jest watching all files
yarn coverage     # Jest coverage report
yarn verify       # lint-staged (ESLint + Prettier) — runs automatically on pre-commit
```

## Stack

- **React 18** SPA with **React Router DOM v6**, bootstrapped via Create React App + `react-app-rewired` for custom webpack config without ejecting
- **Redux 4** + Redux Thunk + **Redux Persist** (persists `siteSettings` and `countdowns` to localStorage)
- **Styled Components 5** for all styling — no CSS files, no CSS modules
- **Contentful** (headless CMS) accessed via both REST API and GraphQL
- **Netlify** for deployment; Lighthouse CI runs on PRs

## Architecture

### Routing & Layout

`index.js` → Redux Provider + BrowserRouter → `App.js` → ThemeProvider + `Header` / `Switch` (router) / `Footer`

Routes defined in `src/components/navigation/Switch/`. Dynamic routes: `/music/:handle` and `/notes/:handle`. 404 falls through to `NotFound`.

### Data Flow (Contentful)

All content comes from Contentful. Two access patterns:
- **REST**: via `contentfulClient.js` (`createClient()`)
- **GraphQL**: via `contentfulClient.js` `contentfulRequest()` helper — queries live in `src/components/pages/[PageName]/queries.js`

Environment variables required: `REACT_APP_CONTENTFUL_SPACE_ID`, `REACT_APP_CONTENTFUL_ACCESS_TOKEN`.

Rich text from Contentful is rendered via `@contentful/rich-text-react-renderer` with custom renderers in `src/utils/rich-text-helpers.js`.

### Theme System

4 modes: `light`, `dim`, `dark`, `yan`. Theme tokens live in `src/styles/theme.js` and are injected via Styled Components' `ThemeProvider`. The active theme is stored in Redux (`siteSettings` reducer) and persisted to localStorage. Access theme tokens in styled components via `${({ theme }) => theme.someToken}`.

### Styling Conventions

- REM units with `html { font-size: 62.5% }` → `1rem = 10px`. Use `src/utils/remHelper.js` for conversion.
- Breakpoints via `above.mobile / above.tablet / above.desktop / above.desktop-max` imported from `src/styles/utilities/breakpoints.js`.
- Global CSS reset + utility classes (`.block-scroll`, `.visually-hidden`) in `src/styles/global.js`.
- Custom fonts: `lack` (display), `happy-times` (serif), `phantom-ghost` — defined in `src/styles/fonts/`.

### Absolute Imports

`jsconfig.json` sets `baseUrl: "./src"`, so imports from `src/` can omit the path prefix (e.g., `import foo from 'utils/lib'`).

### Redux Store Shape

```
siteSettings   — theme mode, persisted
mobileNav      — open/closed boolean
countdowns     — countdown timer state, persisted
```

### Linting & Formatting

ESLint extends `wesbos` config. Prettier: `singleQuote: true`, `semi: false`, `trailingComma: none`, `tabWidth: 2`. Pre-commit hook runs `yarn verify` (lint-staged) automatically.
