# AGENTS.md

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build` — typecheck, then bundle |
| `npm run lint` | `eslint .` (flat config, `eslint.config.js`) |
| `npm run preview` | Serve production build locally |

## Toolchain quirks

- **React Compiler** is active via `@rolldown/plugin-babel` + `reactCompilerPreset` in `vite.config.ts`. Slows dev/build; do not remove.
- **TypeScript ~6.0** with `verbatimModuleSyntax` — use `import type` for type-only imports, never `import { type Foo }`.
- **`erasableSyntaxOnly`** enabled — no enums, no namespaces, no parameter properties.
- **ESLint flat config** — add new rules in `eslint.config.js`, not `.eslintrc.*`.
- **No test framework** installed. Do not add test-related config or dependencies unless asked.
- **No CI/CD** present — no workflows, no deploy config.

## Project layout

- `src/main.tsx` — app entrypoint (mounts `<App />` into `#root`)
- `src/App.tsx` — root component
- `src/assets/` — static images imported in source
- `public/` — static files served at `/` (favicon, icons.svg sprite)
- All source lives under `src/`; no code lives outside it.
