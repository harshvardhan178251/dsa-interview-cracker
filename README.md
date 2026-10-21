# DSA Interview Cracker

**316 Java DSA problems** across **24 topics** for SDE interviews — each with a clean
solution, the exact stdin format, a **step-by-step dry run**, a complexity analysis,
interview notes, a JUnit test, and a browser UI where you can **run the Java code against
your own test cases**.

Plus 48 written guides: topic concept notes, an 8-week study plan, the interview
playbook, a Java cheatsheet, and system-design / low-level-design material.

```
D:\dsa
├─ src/main/java/com/dsa/     # 24 topic packages — the problems
│  ├─ utils/                  # shared helpers (FastScanner, ListNode, TreeNode, heaps…)
│  ├─ templates/              # copy-paste pattern templates for the main techniques
│  └─ <topic>/                # <Problem>.java  +  <Problem>.md  (colocated)
├─ src/test/java/com/dsa/     # JUnit 5 tests, one class per problem
├─ docs/                      # guides, topic notes, system design, LLD
├─ scripts/                   # run.ps1 · test.ps1 · dev.ps1
└─ web/                       # React + Vite + Tailwind study site
```

---

## Quick start

```powershell
# 1. everything at once: regenerate the site data, run the tests, start the site
.\scripts\dev.ps1
# → http://localhost:5173

# 2. just the tests
.\scripts\test.ps1

# 3. run one problem
.\scripts\run.ps1 arrays.TwoSum "4`n2 7 11 15`n9"
# → 0 1
```

Requirements: **JDK 17+** and **Node 20+**. Maven is **not** required — the repository ships
a Maven wrapper (`mvnw.cmd`) that downloads it on first use.

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot"
```

---

## The website

The site is the fastest way to work through the set.

| Feature | What it does |
|---|---|
| **Search + filters** | Instant client-side search over title, pattern, company, tag and LeetCode id. Filter chips for topic, difficulty, company, pattern and status. All state lives in the URL, so any filtered view is shareable. |
| **Topic pages** | Click any topic to open a page with **every** problem it contains, its difficulty mix, the patterns it covers, the companies that ask it, and a per-difficulty filter. Company pages work the same way. |
| **Dry-run viewer** | The companion markdown rendered as styled HTML — including the dry-run tables as real tables. |
| **Code viewer** | Syntax-highlighted Java with line numbers and a copy button, plus the self-contained source the browser runner receives. |
| **In-browser Java runner** | Compiles and runs the solution on the public Judge0 API against stdin you type. Verifies the output against the documented sample. |
| **Progress tracking** | Per-problem status (to do / attempted / solved), stars and attempts, persisted in `localStorage`. A dashboard, per-topic progress, and a spaced-repetition review queue. |
| **Guides** | The topic notes, study plan, playbook, system design and LLD material, all in the same UI. |

```powershell
cd web
npm install
npm run dev          # http://localhost:5173
npm run build        # static bundle in web/dist
npm run preview      # serve the built bundle on http://localhost:4173
```

The build is fully static — no server logic, no database, no API keys. Browsers refuse to
load ES modules over `file://`, so serve the `dist` folder over http (any static server
works: `npm run preview`, `npx serve dist`, `python -m http.server`). The site then runs
entirely offline; only the in-browser Java runner needs an internet connection, because it
compiles on the public Judge0 API.

---

## Repository layout in detail

### `src/main/java/com/dsa/<topic>/`

Each problem is two files with the same base name:

- **`Problem.java`** — the solution. A `public static` method holds the algorithm; `main`
  reads from stdin and prints only the answer.
- **`Problem.md`** — the walkthrough: statement, input format, sample I/O, approach, a
  **dry run table** showing the algorithm's state at every step, complexity, and interview
  notes (follow-ups, common mistakes, how to narrate).

They are colocated so your IDE shows the explanation right next to the code.

### `src/main/java/com/dsa/utils/`

Shared helpers used across problems: `FastScanner`, `ListNode`, `TreeNode`, `TrieNode`,
`MinHeap`, `MaxHeap`, `UnionFind`, `Pair`, `Interval`.

The website's runner inlines whichever of these a problem needs, so every solution compiles
and runs standalone on Judge0 without any change to the code you are studying.

### `src/main/java/com/dsa/templates/`

Copy-paste starting points for the main interview patterns: binary search (all four
flavours), two pointers and sliding windows, graph traversal, DP, backtracking,
stack/queue, and trees/BSTs. Each has a runnable `main` that prints a worked example.

### `src/test/java/com/dsa/<topic>/`

One JUnit 5 class per problem — **2000+ tests** covering the happy path, edge cases,
duplicates and boundary values.

### `docs/`

| Folder | Contents |
|---|---|
| `guides/` | How to use this repo, the 8-week study plan, the company problem map, the pattern index, the coverage matrix, the full problem index, the Java cheatsheet, the interview playbook |
| `topics/` | One concept note per topic — intuition, when to use which pattern, traps, complexity cheat sheet |
| `system-design/` | Caching, load balancing, sharding, message queues, rate limiting, and four case studies |
| `lld/` | Low-level design: LRU, parking lot, elevator, chess, tic-tac-toe, rate limiter |
| `CONTRIBUTING.md` | **How to author a problem** — read this before adding one |

---

## The data pipeline

The site does not keep its own copy of the problems. It reads them out of the Java tree:

```
src/main/java/com/dsa/<topic>/Problem.java  ─┐
src/main/java/com/dsa/<topic>/Problem.md    ─┼─►  web/scripts/generate-data.mjs
src/test/java/com/dsa/<topic>/ProblemTest.java ┘        │
                                                         ▼
                                       web/src/data/index.json      (listings, eager)
                                       web/src/data/problems/*.json (one per problem, lazy)
                                       web/src/data/guides/*.json   (one per guide, lazy)
                                       web/src/data/guides.json     (guide index, eager)
                                       web/src/data/meta.json
```

The listing data is bundled eagerly; the heavy per-problem payload (source, runner
source and write-up) is a separate chunk that is fetched the moment you open a problem.
That keeps the initial bundle at ~370 kB instead of ~4 MB.

```powershell
cd web
npm run gen:guides    # rebuilds the company map, pattern index, coverage matrix and problem index
npm run gen:data      # rebuilds index.json / problems/*.json / guides/*.json / meta.json
npm run verify:judge  # compiles & runs every problem's runner source against its sample
```

`npm run verify:judge` is the real quality gate: it compiles each generated runner source
with `javac`, runs it with the documented sample input, and compares stdout to the
documented sample output. **If this passes, the problem works in the browser's Run tab.**

---

## Topics

| Topic | Problems | Topic | Problems |
|---|---:|---|---:|
| Arrays | 20 | Trees & BST | 26 |
| Strings | 16 | Trie | 6 |
| Linked List | 20 | Graphs | 20 |
| Stacks | 13 | Advanced Graphs | 12 |
| Queues & Deques | 6 | Dynamic Programming | 30 |
| Heaps | 12 | Backtracking | 13 |
| Binary Search | 17 | Greedy | 13 |
| Sorting | 10 | Intervals | 9 |
| Hashing | 9 | Bit Manipulation | 12 |
| Two Pointers | 10 | Math & Number Theory | 12 |
| Sliding Window | 9 | Design | 13 |
| Prefix Sums | 8 | Concurrency | 6 |

See the [coverage matrix](docs/guides/04-coverage-matrix.md) for the difficulty and
completeness breakdown, and the [full problem index](docs/guides/05-problem-index.md)
for every problem with its patterns and company tags.

---

## Verification

Four gates, all green:

| Gate | Command | What it proves |
|---|---|---|
| **Unit tests** | `.\scripts\test.ps1` | 2000+ JUnit tests — every algorithm is correct |
| **Runner sources** | `cd web; npm run verify:judge` | Every problem compiles standalone and prints exactly its documented output — the same path the browser uses |
| **Site build** | `cd web; npm run build` | The site compiles and bundles cleanly |
| **Browser smoke test** | `npm run qa` | The landing page, topic pages, catalogue, search, filters, write-ups, code viewer and progress tracking all work in a real browser |
| **Production build** | `node scripts/qa-offline.mjs` | The built static bundle works when served over http, with no console errors |

`npm run qa` needs a running server (`cd web; npm run dev`) and a one-time
`npm run qa:install` to fetch the headless browser.

---

## Adding a problem

Read [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) first — it is the exact contract for the
frontmatter, the Java file, the markdown sections and the test file.

```powershell
# after adding
cd web
npm run gen:data
npm run verify:judge -- --id arrays.MyNewProblem
```

---

## Deployment

The site is a static single-page app — no server, no database, no API keys. It deploys
anywhere that can serve files, and every target below is pre-configured.

| Target | Command | Notes |
|---|---|---|
| **Docker** | `npm run docker:build` then `npm run docker:run` | Builds the bundle and serves it with nginx on <http://localhost:8080>. `docker compose up --build` works too |
| **Vercel** | `vercel --cwd web` | `web/vercel.json` has the build command, the SPA rewrite and the cache headers |
| **Netlify** | `netlify deploy --dir=web/dist` | `web/netlify.toml` and `web/public/_redirects` cover the rewrite |
| **GitHub Pages** | push to `main` | `.github/workflows/deploy.yml` builds and publishes, including the `404.html` fallback Pages needs |
| **Any static host** | upload `web/dist` | Serve `index.html` for unknown paths |

**Before deploying, set the site URL.** It feeds the canonical link, the Open Graph tags,
the sitemap and the structured data:

```powershell
cd web
Copy-Item .env.example .env
# edit .env:  VITE_SITE_URL=https://your-domain.com
npm run build
```

`BASE_PATH` is only needed for a sub-path deployment (GitHub Pages); leave it `/` for
everything else.

**What a deployment includes**

- **SEO** — per-page titles and descriptions, Open Graph and Twitter cards, canonical
  links, `robots.txt`, and a generated `sitemap.xml` covering all 421 routes.
- **PWA** — a web manifest, generated icons (192/512/maskable) and a service worker, so
  the site is installable and keeps working offline.
- **Resilience** — an error boundary around the app shell, so a bad page cannot
  white-screen the site, and a styled 404 that points at the catalogue.
- **Performance** — the initial bundle is ~390 kB (87 kB gzipped); every problem and guide
  is a separate lazy chunk that loads on demand.

---

## Git

```powershell
git add .
git commit -m "Add DSA problems and the study site"
```

The repository is initialised but has no commits yet.
