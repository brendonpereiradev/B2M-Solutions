# Mobile page standardization (tokens) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce shared CSS custom properties for page-hero spacing and title scale on mobile/tablet, apply them across `assets/css/styles.css` per `docs/superpowers/specs/2026-04-10-mobile-page-standardization-design.md`, then regenerate the minified bundle.

**Architecture:** All new values live in `:root` under existing design tokens. Existing selectors (`.section-title`, `.about-hero`, `.hero-title`, etc.) reference `var(--page-hero-*)` and `var(--case-hero-*)` instead of raw `rem`. Home `.hero-title` keeps its **640px / 1024px / 1280px** size steps; only the default mobile size uses the shared token where it matches (2.25rem). Case-study titles use `clamp()` built from case tokens.

**Tech Stack:** Vanilla CSS in `assets/css/styles.css`; `npx clean-css-cli --inline imports` for `styles.min.css`. No HTML changes required for the baseline spec.

---

## File map

| File | Role |
|------|------|
| `assets/css/styles.css` | Add tokens in `:root`; update selectors listed in tasks. |
| `assets/css/styles.min.css` | Regenerated output; do not hand-edit. |

---

### Task 1: Add page/case tokens to `:root`

**Files:**
- Modify: `assets/css/styles.css` (inside the existing `:root { ... }` block, after `--radius-full: 9999px;` and before the closing `}`)

- [ ] **Step 1.1:** Insert these custom properties (exactly):

```css
    /* Page hero — espaçamento e título (mobile / tablet); alinhado ao header fixo ~5rem */
    --page-hero-padding-top-mobile: 6.875rem;
    --page-hero-padding-top-md: 6.5rem;
    --page-hero-padding-bottom-mobile: 4rem;
    --page-hero-padding-bottom-md: 5rem;
    --page-hero-title-size-mobile: 2.25rem;
    --page-hero-title-size-md: 3rem;
    /* Case study (solutions) — base do clamp do título do projeto */
    --case-hero-title-size-min: 2rem;
    --case-hero-title-size-fluid: 3.5vw;
    --case-hero-title-size-max: 3.5rem;
```

- [ ] **Step 1.2:** Commit

```bash
git add assets/css/styles.css
git commit -m "feat(css): add page-hero and case-hero design tokens"
```

---

### Task 2: `.section-title` — use page title tokens

**Files:**
- Modify: `assets/css/styles.css` (replace the `.section-title` rule and its `@media (min-width: 768px)` block)

- [ ] **Step 2.1:** Replace:

```css
.section-title {
    font-family: var(--font-display);
    font-size: 1.875rem;
```

with:

```css
.section-title {
    font-family: var(--font-display);
    font-size: var(--page-hero-title-size-mobile);
```

- [ ] **Step 2.2:** In the same file, replace inside `@media (min-width: 768px) { .section-title { font-size: 3rem; } }` the value `3rem` with `var(--page-hero-title-size-md)`.

- [ ] **Step 2.3:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): tie section-title sizes to page-hero tokens"
```

---

### Task 3: `.hero-title` — mobile base uses token

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 3.1:** In `.hero-title`, change `font-size: 2.25rem;` to `font-size: var(--page-hero-title-size-mobile);`

- [ ] **Step 3.2:** Do **not** change `@media (min-width: 640px)`, `(768px)`, `(1024px)`, `(1280px)` values for `.hero-title` (home keeps its marketing scale above mobile).

- [ ] **Step 3.3:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): hero-title mobile size uses page-hero token"
```

---

### Task 4: `.about-hero-title` — level A two-step scale

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 4.1:** Replace the entire block from `.about-hero-title {` through the closing `}` of `@media (min-width: 768px) { .about-hero-title { ... } }` with:

```css
.about-hero-title {
    font-family: var(--font-display);
    font-size: var(--page-hero-title-size-mobile);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-top: 0;
    text-align: center;
    width: 100%;
}

@media (min-width: 768px) {
    .about-hero-title {
        font-size: var(--page-hero-title-size-md);
    }
}
```

(This removes the former `@media (min-width: 640px)` step so the scale matches the spec: mobile token until 768px, then `--page-hero-title-size-md`.)

- [ ] **Step 4.2:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): align about-hero-title with page-hero token scale"
```

---

### Task 5: `.about-hero` and `.contact-intro` — padding uses tokens; remove redundant mobile-only overrides

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 5.1:** Replace the `.about-hero { ... }` rule so `padding` uses tokens. Find:

```css
    padding: 5.5rem var(--container-padding) 4rem;
```

Replace with:

```css
    padding: var(--page-hero-padding-top-mobile) var(--container-padding) var(--page-hero-padding-bottom-mobile);
```

- [ ] **Step 5.2:** Replace the `@media (min-width: 768px) { .about-hero { padding-top: 6.5rem; padding-bottom: 5rem; } }` block with:

```css
@media (min-width: 768px) {
    .about-hero {
        padding-top: var(--page-hero-padding-top-md);
        padding-bottom: var(--page-hero-padding-bottom-md);
    }
}
```

- [ ] **Step 5.3:** Delete the entire `@media (max-width: 767px) { .about-hero { padding-top: 6.875rem; } }` block (no longer needed).

- [ ] **Step 5.4:** In `.contact-intro`, replace `padding-top: 5.5rem;` and `padding-bottom: 4rem;` with:

```css
    padding-top: var(--page-hero-padding-top-mobile);
    padding-bottom: var(--page-hero-padding-bottom-mobile);
```

- [ ] **Step 5.5:** Replace `@media (min-width: 768px) { .contact-intro { padding-top: 6.5rem; padding-bottom: 5rem; } }` with:

```css
@media (min-width: 768px) {
    .contact-intro {
        padding-top: var(--page-hero-padding-top-md);
        padding-bottom: var(--page-hero-padding-bottom-md);
    }
}
```

- [ ] **Step 5.6:** Delete the entire `@media (max-width: 767px) { .contact-intro { padding-top: 6.875rem; } }` block.

- [ ] **Step 5.7:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): page-hero padding tokens for about and contact intros"
```

---

### Task 6: `.problem-section.legal-page-section` — mobile padding-top token

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 6.1:** Remove the single rule `.problem-section.legal-page-section { padding-top: clamp(...); padding-bottom: clamp(...); }` and replace with:

```css
.problem-section.legal-page-section {
    padding-top: var(--page-hero-padding-top-mobile);
    padding-bottom: clamp(3rem, 10vw, 5rem);
}

@media (min-width: 768px) {
    .problem-section.legal-page-section {
        padding-top: clamp(var(--page-hero-padding-top-md), 14vw, 9.375rem);
        padding-bottom: clamp(3rem, 10vw, 5rem);
    }
}
```

- [ ] **Step 6.2:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): legal page section padding uses page-hero tokens"
```

---

### Task 7: `.problem-section--notfound` — mobile token; preserve desktop padding

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 7.1:** Replace `.problem-section--notfound { padding-top: 8.75rem; padding-bottom: 5rem; }` with:

```css
.problem-section--notfound {
    padding-top: var(--page-hero-padding-top-mobile);
    padding-bottom: 5rem;
}

@media (min-width: 768px) {
    .problem-section--notfound {
        padding-top: 8.75rem;
    }
}
```

- [ ] **Step 7.2:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): 404 hero padding-top uses token on mobile"
```

---

### Task 8: `.solutions-intro h1` — token at 768px

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 8.1:** In `.solutions-intro h1`, set `font-size: var(--page-hero-title-size-mobile);` (replaces `2.25rem`).

- [ ] **Step 8.2:** In `@media (min-width: 768px) { .solutions-intro h1 { font-size: 3.75rem; } }`, replace `3.75rem` with `var(--page-hero-title-size-md)`.

- [ ] **Step 8.3:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): clients solutions-intro h1 uses page-hero title tokens"
```

---

### Task 9: `.sol-card-title` — `clamp` from case tokens

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 9.1:** Replace the `.sol-card-title` `font-size` line with:

```css
    font-size: clamp(
        var(--case-hero-title-size-min),
        var(--case-hero-title-size-fluid),
        var(--case-hero-title-size-max)
    );
```

- [ ] **Step 9.2:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): sol-card-title clamp uses case-hero tokens"
```

---

### Task 10: Regenerate `styles.min.css`

**Files:**
- Modify: `assets/css/styles.min.css`

- [ ] **Step 10.1:** From the repository root, run:

```bash
npx --yes clean-css-cli --inline imports -o assets/css/styles.min.css assets/css/styles.css
```

- [ ] **Step 10.2:** Expected: exit code 0. Verify the min file contains the substring `--page-hero-padding-top-mobile` or `page-hero-padding-top-mobile` (inlined values may drop `var` names if inlined — if variables remain, grep for `page-hero`).

- [ ] **Step 10.3:** Commit

```bash
git add assets/css/styles.min.css
git commit -m "chore(css): minify after mobile page standardization tokens"
```

---

### Task 11: Manual QA (acceptance from spec §8)

**Files:** none

- [ ] **Step 11.1:** Serve the site at `http://127.0.0.1:5500/` (or your usual static server).

- [ ] **Step 11.2:** With viewport width **≤767px**, visit in order: `/`, `/sobre/`, `/contato/`, `/clientes/`, `/politica-de-privacidade/` (or `/termos-de-uso/`), `/404.html` (or a non-existent path), `/solutions/gasplanos/`. Check: spacing under the fixed header feels consistent; page titles do not jump jarringly between institutional pages.

- [ ] **Step 11.3:** With viewport **≥768px**, spot-check the same URLs for obvious layout regressions (titles not clipped; legal/404 top spacing acceptable).

---

## Self-review (spec coverage)

| Spec section | Task |
|--------------|------|
| §4.1 spacing tokens | Task 1, 5, 6, 7 |
| §4.2 title tokens level A | Task 1, 2, 3, 4, 8 |
| §4.3 case tokens | Task 1, 9 |
| §5 Home `.hero-title` | Task 3 |
| §5 Sobre / Contato | Task 4, 5 |
| §5 Clientes | Task 8 |
| §5 Legais | Task 6 |
| §5 404 | Task 7 |
| §5 Soluções | Task 9 |
| §7 minify | Task 10 |
| §8 tests | Task 11 |

Placeholder scan: none.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-10-mobile-page-standardization.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
