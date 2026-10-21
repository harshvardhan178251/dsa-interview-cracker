# Study site

The browser front-end for the **DSA Interview Cracker** — a React + Vite + Tailwind app that
reads its content from the Java sources in this repository.

See the [repository README](../README.md) for the full picture.

## Commands

```powershell
npm install          # once
npm run dev          # dev server on http://localhost:5173
npm run build        # production bundle in dist/
npm run preview      # serve the production bundle on http://localhost:4173
npm run lint         # oxlint
```

## Content pipeline

The site has **no content of its own**. Everything comes from the Java tree:

```
src/main/java/com/dsa/<topic>/Problem.java  ─┐
src/main/java/com/dsa/<topic>/Problem.md    ─┼─►  scripts/generate-data.mjs
src/test/java/com/dsa/<topic>/ProblemTest.java ┘        │
                                                         ▼
                                       src/data/index.json      (listings, eager)
                                       src/data/problems/*.json (one per problem, lazy)
                                       src/data/guides/*.json   (one per guide, lazy)
                                       src/data/meta.json
```

```powershell
npm run gen:data      # rebuild src/data/** from the Java sources
npm run gen:guides    # rebuild the company map, pattern index and problem index
npm run gen:sitemap   # rebuild public/sitemap.xml
npm run sync          # all three, in order
npm run verify:judge  # compile and run every problem against its documented sample
```

`src/data/` is **generated but committed**, so the site builds with no Node toolchain and
no network access.

## Why the data is split

The catalogue is eagerly bundled; the heavy per-problem payload (Java source, the
self-contained runner source and the write-up) lives in one JSON file per problem and is
fetched only when a problem is opened. That keeps the initial bundle at ~390 kB instead of
~4 MB.

## Environment

Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the public origin of the
deployment. It feeds the canonical link, the Open Graph tags, the sitemap and the
structured data. `BASE_PATH` is only needed for a sub-path deployment (GitHub Pages).
