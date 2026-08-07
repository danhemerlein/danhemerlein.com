# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Dev server on :3000 (react-app-rewired start)
yarn build        # Production build to ./build
yarn verify       # lint-staged (ESLint --fix + Prettier) — also the pre-commit hook
```

Node >= 18 (Netlify pins 18.14.1).

**Testing:** there are no test files in this repo and `jest` is not a declared dependency — it only resolves transitively through `react-scripts`, and there is no jest config. The `test` / `test-all` / `coverage` scripts in `package.json` are vestigial; don't assume they work. If asked to add tests, expect to install and configure jest first.

**Linting:** there is no standalone lint script (the `scripts` block nested inside `eslintConfig` in `package.json` is inert and does nothing). `yarn verify` only lints *staged* files. To lint everything, run `npx eslint src` directly.

**Env:** `REACT_APP_CONTENTFUL_SPACE_ID` and `REACT_APP_CONTENTFUL_ACCESS_TOKEN` are required — the app renders empty pages without them.

## Stack

React 18 SPA (Create React App + `react-app-rewired` for webpack overrides without ejecting) · React Router v6 · Redux 4 + Thunk + Redux Persist · Styled Components 5 · Contentful GraphQL · Sentry · Netlify.

`config-overrides.js` exists solely to override webpack `splitChunks` (one vendor chunk per npm package, `minSize: 0`).

## Architecture

### Composition

`index.js` (Sentry init → Redux `Provider`) → `App.js` → `GlobalReset` + `GlobalFonts` → `ThemeProvider` → `ThemeContextProvider` → `Router` → `Header` / `Switch` / `Footer`.

`App.js` also calls `reactContentfulImageSetup(media, variants)` at module scope — this configures responsive image breakpoints/DPR variants globally for `react-contentful-image`. Note these `media` values are a **separate hardcoded copy** of the breakpoints in `styles/utilities/breakpoints.js`; changing one does not change the other.

Routes live in `src/components/navigation/Switch/index.js`. Dynamic: `/music/:handle`, `/notes/:handle`. `*` → `NotFound`.

### Contentful data flow

**Everything goes through GraphQL.** `contentfulClient.js` exports `contentfulRequest(query, variables)` — a bare `fetch` POST to the Contentful GraphQL endpoint. On errors it `console.warn`s each message and returns an **array**, not the data shape callers expect; callers do not check for this, so a failed query surfaces as a runtime error on `data.someCollection.items`.

The same file default-exports a REST client via `contentful.createClient()`. **Nothing imports it.** Don't add REST usage without a reason — the codebase is uniformly GraphQL.

Each page owns a colocated `queries.js` exporting `gql` template strings, typically composed from shared `sysBase` / `base` fragments in that file. Sort/filter are implemented as *query builders* (e.g. `sortPosts(val)`, `filterPosts(val)`), so changing sort refetches from Contentful rather than sorting client-side.

The page pattern is consistently: local `useState` + `useEffect` → `await contentfulRequest(...)` → `setState`. There is no data layer, cache, or Redux involvement in content fetching.

Rich text is rendered with `@contentful/rich-text-react-renderer` using `generateRichTextParserOptions(content, isBlog)` from `src/utils/rich-text-helpers.js` — pass the entry's `links` payload as `content` so embedded assets resolve.

### Redux

Store is created in `src/redux/store.js`; reducers/actions live in `src/store/`. (The split between `src/redux/` and `src/store/` is historical, not meaningful.)

```
siteSettings — { mode }        persisted
mobileNav    — { mobileNavOpen }
countdowns   — { countdowns[] } persisted
```

Persistence whitelist is in `persistConfig`; adding a slice that must survive reload requires editing it. Actions are plain string-literal types (`'SET_SITE_THEME'`, `'ADD_COUNTDOWN'`) with no constants file. Thunk is installed but currently unused.

Theme mode is dispatched from exactly one place: the theme `<select>` in `components/navigation/MobileNav`.

### Theme

4 modes in `src/styles/theme.js`: `light`, `dim`, `dark`, `yan`. Each is a flat token map (`background`, `foreground`, `border`, `anchor`, `figCaption`) plus nested `general` (raw palette) and `yan` (Young & Nauseous brand tokens). Consume via `${({ theme }) => theme.background}`.

The active mode is delivered **twice**: through Styled Components' `ThemeProvider` (as tokens) and through `context/ThemeContext` (as the raw mode string, via `useThemeContext()`). Use the theme prop for styling; use the context only when a component needs to branch on the mode name itself.

### Styling

No CSS files. Two conventions coexist: styled components declared inline at the top of a component file (majority), or extracted to a sibling `Foo.styles.js` (newer pages — About, BlogIndex, BlogPost, Moodboard, MobileNav). Match whichever the file you're editing already uses.

- **Spacing:** `remHelper` (`src/utils/remHelper.js`) is a Proxy over `SPACING` in `utils/constants/spacing.js`. `remHelper[16]` → `1.6rem`. Off-scale keys still work but log a `Using non-standard value` warning; use `remHelper.override(23)` to opt out intentionally. `html { font-size: 62.5% }` makes `1rem = 10px`.
- **Breakpoints:** `above.mobile` / `above.tablet` / `above.desktop` / `above['desktop-max']` from `styles/utilities/breakpoints.js` — mobile-first `min-width` blocks. `BREAKPOINT` exports the same values as strings for JS use.
- **Shared primitives:** import `FlexContainer`, `Grid`, `H1`–`H3`, `P`, `A`, `StyledLink` from `styles/elements`, and `above`, `anchorColor`, `fullBleed`, `globalTransition`, `transparentBorder`, the `Slide*` keyframes from `styles/utilities`. Both are barrel files — new shared pieces must be re-exported there or they won't be importable by that path.
- Global reset and the `.block-scroll` / `.visually-hidden` utilities are in `styles/global.js`; fonts (`lack`, `happy-times`, `phantom-ghost`) in `styles/utilities/type.js`.

### Conventions

- **Absolute imports** from `src/` (`jsconfig.json` `baseUrl: "./src"`): `import { remHelper } from 'utils/remHelper'`, `import Loading from 'components/other/Loading'`.
- **Per-page SEO** is hand-rolled `react-helmet` blocks (title, description, og:*, twitter:*) using `basePageTitle` / `basePageDescription` from `utils/constants/lib.js`. New pages should follow the existing pages' full meta block.
- **ESLint** extends `wesbos`, with `arrow-body-style: ["warn", "always"]` — arrow functions in this codebase almost always use explicit `return` in braces. Prettier: `singleQuote`, no semicolons, `trailingComma: none`, 2 spaces.
- Scroll locking on route change is handled centrally in `Switch` via `blockScroll(false)`; the Escape-key / modal-close handler lives in `App.js`.

### Deploy

Netlify builds `yarn build`. `@netlify/plugin-lighthouse` audits `/`, `/code`, `/music`, `/moodboard`, `/about`, `/notes` on each deploy (`netlify.toml`). `.lighthouserc.js` is a separate local LHCI config with thresholds (a11y ≥ 0.9, SEO ≥ 0.9, perf ≥ 0.3) and mostly commented-out URLs.
