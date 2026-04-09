# Menu mobile 3.0.0 (restore) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current mobile drawer (`body.nav-open` + `.header-nav-wrapper` as panel + `.mobile-nav-backdrop`) with the full-screen overlay menu from commit `90eacb7` (3.0.0): `#mobileMenu` off-canvas panel, SVG hamburger→X, `body.no-scroll`, footer CTA + contact lines, matching the design spec `docs/superpowers/specs/2026-04-09-menu-mobile-3.0.0-restore-design.md`.

**Architecture:** Styles for the overlay live in `assets/css/components/mobile-menu.css`, imported from `styles.css`. Desktop navigation stays in `.header-nav-wrapper`; on viewports under 768px that wrapper is hidden and links appear only inside the overlay. Behaviour is implemented in `assets/js/mobile-menu.js` (ES5 IIFE). `animations.js` remains reveal-only.

**Tech Stack:** Static HTML, vanilla CSS, JavaScript ES5-style IIFE (same profile as current `mobile-menu.js`), no build pipeline in repo.

---

## File map

| File | Responsibility |
|------|----------------|
| `assets/css/components/mobile-menu.css` | **Create.** Overlay, panel, link animations, toggle SVG lines (`.line-1`–`.line-3`), `.open`/`.active`, `body.no-scroll`. Sourced from commit `90eacb7` (`git show 90eacb7:assets/css/components/mobile-menu.css`). |
| `assets/css/styles.css` | **Modify.** Add `@import "./components/mobile-menu.css";` after the header comment block; remove `body.nav-open`, drawer rules for `.header-nav-wrapper` under 767px, `.mobile-nav-backdrop` rules, `.mobile-menu-toggle__bar` rules; set `.header-nav-wrapper` to `display: none` by default and `display: flex` from 768px up; replace toggle “pill” styles with minimal rules compatible with SVG toggle (or rely on `mobile-menu.css`). |
| `assets/css/styles.min.css` | **Regenerate** from `styles.css` via clean-css-cli (inlines `@import`). |
| `assets/js/mobile-menu.js` | **Replace** with overlay logic (`#mobileMenu`, `.active` on toggle, `.open` on overlay, `no-scroll`, close on overlay click / links / close button / Escape). |
| `index.html` | **Modify** header: SVG toggle, `aria-controls="mobileMenu"`, remove backdrop; add overlay block; mobile links: `/#problemas` for Soluções. |
| `404.html`, `clientes/index.html`, `contato/index.html`, `sobre/index.html`, `politica-de-privacidade/index.html`, `termos-de-uso/index.html` | **Modify** same pattern; preserve page-specific `aria-current` on desktop Contato where present; align `.mobile-nav-link` hrefs with desktop `.nav-link` on each page. |
| `solutions/gasplanos/index.html`, `solutions/chrismedical/index.html` | **Modify** same pattern (header already uses `header-inner`). |

---

### Task 1: Add `assets/css/components/mobile-menu.css`

**Files:**
- Create: `assets/css/components/mobile-menu.css`

- [ ] **Step 1.1:** Create the directory `assets/css/components/` if it does not exist.

- [ ] **Step 1.2:** Create `assets/css/components/mobile-menu.css` with exactly this content (from `90eacb7`):

```css
/* ==========================================
   Estilos do Menu Mobile Offcanvas
   ========================================== */

/*
* Overlay Fullscreen (Glassmorphism de fundo negro)
*/
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(10, 10, 10, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 9999;
    
    /* Configuração inicial oculta */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease;
    
    /* Facilitar alinhamento no lado direito */
    display: flex;
    justify-content: flex-end;
}

/* Quando aberto: o overlay exibe e desfaz os translateX do content */
.mobile-menu-overlay.open {
    opacity: 1;
    visibility: visible;
}

/*
* Prevenir rolagem no Body quando abrir
*/
body.no-scroll {
    overflow: hidden;
}

/*
* Conteúdo lateral do Offcanvas (Side-panel)
*/
.mobile-menu-content {
    background-color: var(--color-background, #0f0f12);
    width: 100%;
    max-width: 400px;
    height: 100%;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    
    /* Box Shadow para dimensão visual e borda fraca no lado esquerdo */
    box-shadow: -4px 0 25px rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.05);

    /* Animação slide in out no próprio painel */
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Estado de inserção suave cubic p/ slide */
.mobile-menu-overlay.open .mobile-menu-content {
    transform: translateX(0);
}

/*
* Cabeçalho Header
*/
.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
}

.mobile-menu-logo {
    height: 35px;
    width: auto;
}

/*
* Botão Close (Fechamento Mobile)
*/
.mobile-menu-close {
    display: none; /* Escondido para evitar sobreposição, pois o hambúrguer já vira 'X' */
}

/*
* Navegação em Cascata (Links)
*/
.mobile-menu-nav {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex-grow: 1; /* Preenche espaço vital do meio e empurra footer para o fundo */
}

.mobile-nav-link {
    color: var(--color-text-secondary, #A0A0A0);
    text-decoration: none;
    font-size: 1.5rem;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    
    /* Configuração animação staggered na entrada (deslizar p/ cima via transform) */
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease, padding-left 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
    color: var(--color-white, #ffffff);
    padding-left: 0.5rem;
}

/* Cascade Effect = Quando panel overlay tá open, joga transform pra zero de volta */
.mobile-menu-overlay.open .mobile-nav-link {
    opacity: 1;
    transform: translateY(0);
}

/* Delays das animações baseadas no N child */
.mobile-menu-overlay.open .mobile-nav-link:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu-overlay.open .mobile-nav-link:nth-child(2) { transition-delay: 0.2s; }
.mobile-menu-overlay.open .mobile-nav-link:nth-child(3) { transition-delay: 0.3s; }
.mobile-menu-overlay.open .mobile-nav-link:nth-child(4) { transition-delay: 0.4s; }

/*
* Footer com Contatos e CTA
*/
.mobile-menu-footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    /* Animação fade in slide up em CTA & Contato Info */
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s;
}

.mobile-menu-overlay.open .mobile-menu-footer {
    opacity: 1;
    transform: translateY(0);
}

.mobile-menu-cta {
    width: 100%;
    text-align: center;
    justify-content: center;
    padding: 1rem;
    font-size: 1.1rem;
    text-transform: uppercase;
}

.mobile-contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.mobile-contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-secondary, #A0A0A0);
    font-size: 0.9rem;
    margin: 0;
}

.mobile-contact-item svg {
    color: var(--color-primary, #1CC5A1);
    flex-shrink: 0; /* Impede o Icon SVG de espremer se text crescer */
}

/*
* Hambúrguer Icon Toggle (Para transformar em "X" quando clicado)
*/
.mobile-menu-toggle {
    transition: color 0.3s ease;
    z-index: 10000; /* Assegura que ele ficará acima caso cruze posições (depende da estrutura atual) */
}

/* Transições das linhas isoladas do toggle SVGs da button "mobile-menu-toggle" nas class line-1/2/3 */
.mobile-menu-toggle .line-1,
.mobile-menu-toggle .line-2,
.mobile-menu-toggle .line-3 {
    transition: transform 0.3s ease, transform-origin 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
}

/* .mobile-menu-toggle com a class ".active" */
.mobile-menu-toggle.active {
    color: var(--color-primary, #1CC5A1);
}

/* Cruzamento em X ("active" class) - Valores aproximados de SVG rotation */
.mobile-menu-toggle.active .line-1 {
    transform: translateY(6px) rotate(45deg);
}

.mobile-menu-toggle.active .line-2 {
    opacity: 0;
}

.mobile-menu-toggle.active .line-3 {
    transform: translateY(-6px) rotate(-45deg);
}
```

- [ ] **Step 1.3:** Commit

```bash
git add assets/css/components/mobile-menu.css
git commit -m "feat(css): add mobile-menu overlay styles from 3.0.0"
```

---

### Task 2: Wire import and strip drawer styles in `styles.css`

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 2.1:** Immediately after the opening comment block (after line 5 `=======` and blank line), insert:

```css
@import "./components/mobile-menu.css";

```

- [ ] **Step 2.2:** Delete `body.nav-open { overflow: hidden; }` (replace with nothing; scroll lock comes from `body.no-scroll` in imported file).

- [ ] **Step 2.3:** Replace the entire block from `/* Botão hambúrguer — visível só abaixo de 768px */` through the closing `}` of `@media (min-width: 768px) { .mobile-menu-toggle { display: none; } }` (the block that styles `.mobile-menu-toggle` with flex column and `.mobile-menu-toggle__bar`) with:

```css
/* Botão hambúrguer — SVG; estilos base do ícone em components/mobile-menu.css */
.mobile-menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    margin-left: auto;
    border: none;
    border-radius: 0;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
}

.mobile-menu-toggle svg {
    width: 24px;
    height: 24px;
}

@media (max-width: 767px) {
    .header-container {
        justify-content: flex-start;
    }

    .header-brand {
        flex: 1 1 0;
        min-width: 0;
        overflow: hidden;
    }

    .header-logo {
        max-width: 100%;
        width: auto;
        height: 3rem;
    }

    .mobile-menu-toggle {
        margin-left: 0;
        flex-shrink: 0;
        position: relative;
        z-index: 10000;
    }
}

@media (min-width: 768px) {
    .mobile-menu-toggle {
        display: none;
    }
}
```

- [ ] **Step 2.4:** Replace `.header-nav-wrapper` rules so mobile hides desktop nav until tablet. Find:

```css
/* Nav wrapper: em desktop, fluxo horizontal; em mobile, drawer (ver @media abaixo) */
.header-nav-wrapper {
    align-items: center;
    margin-left: auto;
}

@media (min-width: 768px) {
    .header-nav-wrapper {
        display: flex;
    }
}

@media (max-width: 767px) {
    .header-nav-wrapper {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        position: fixed;
        top: 5rem;
        right: 0;
        bottom: 0;
        width: min(18rem, 86vw);
        margin-left: 0;
        padding: 1.25rem 1.5rem;
        background: rgba(22, 27, 46, 0.98);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-left: 1px solid var(--color-border);
        z-index: 60;
        transform: translateX(100%);
        visibility: hidden;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        pointer-events: none;
    }

    body.nav-open .header-nav-wrapper {
        transform: translateX(0);
        visibility: visible;
        pointer-events: auto;
    }

    .header-nav {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.25rem;
    }

    .nav-divider {
        width: 100%;
        height: 1px;
        margin: 0.75rem 0;
    }

    .mobile-nav-backdrop {
        display: block;
        position: fixed;
        top: 5rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 55;
        background: rgba(0, 0, 0, 0.55);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s;
        pointer-events: none;
    }

    body.nav-open .mobile-nav-backdrop {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
}

@media (min-width: 768px) {
    .header-nav-wrapper {
        flex-direction: row;
        position: static;
        width: auto;
        padding: 0;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border: none;
        transform: none;
        visibility: visible;
        overflow: visible;
        z-index: auto;
    }

    .header-nav {
        flex-direction: row;
        align-items: center;
        gap: 2.5rem;
    }

    .nav-divider {
        width: 1px;
        height: 1.25rem;
        margin: 0 1.5rem;
    }

    .mobile-nav-backdrop {
        display: none !important;
    }
}
```

Replace that whole section with:

```css
/* Nav wrapper: oculto no mobile (links só no overlay); desktop em linha */
.header-nav-wrapper {
    display: none;
    align-items: center;
    margin-left: auto;
}

@media (min-width: 768px) {
    .header-nav-wrapper {
        display: flex;
        flex-direction: row;
        position: static;
        width: auto;
        padding: 0;
        background: transparent;
        visibility: visible;
        overflow: visible;
        z-index: auto;
    }

    .header-nav {
        flex-direction: row;
        align-items: center;
        gap: 2.5rem;
    }

    .nav-divider {
        width: 1px;
        height: 1.25rem;
        margin: 0 1.5rem;
    }
}
```

- [ ] **Step 2.5:** Commit

```bash
git add assets/css/styles.css
git commit -m "refactor(css): import mobile-menu.css and remove drawer/backdrop pattern"
```

---

### Task 3: Regenerate `styles.min.css`

**Files:**
- Modify: `assets/css/styles.min.css`

- [ ] **Step 3.1:** From the repository root, run (requires Node/npm; downloads CLI on first use):

```bash
npx --yes clean-css-cli --inline imports -o assets/css/styles.min.css assets/css/styles.css
```

- [ ] **Step 3.2:** Expected: command exits 0; `assets/css/styles.min.css` contains a single long line starting with `*` or `,` and includes substrings `mobile-menu-overlay` and `body.no-scroll`.

- [ ] **Step 3.3:** Commit

```bash
git add assets/css/styles.min.css
git commit -m "chore(css): minify styles after mobile menu 3.0.0 import"
```

---

### Task 4: Replace `assets/js/mobile-menu.js`

**Files:**
- Modify: `assets/js/mobile-menu.js`

- [ ] **Step 4.1:** Replace the entire file with:

```javascript
/**
 * Menu mobile: overlay off-canvas (comportamento alinhado ao 3.0.0).
 * Requer: .mobile-menu-toggle, #mobileMenu, .mobile-menu-close, .mobile-nav-link
 */
(function () {
    'use strict';

    function init() {
        var toggle = document.querySelector('.mobile-menu-toggle');
        var overlay = document.getElementById('mobileMenu');
        var closeBtn = document.querySelector('.mobile-menu-close');
        var navLinks = document.querySelectorAll('.mobile-nav-link');
        var body = document.body;

        if (!toggle || !overlay || !closeBtn) {
            return;
        }

        function openMenu() {
            toggle.classList.add('active');
            overlay.classList.add('open');
            body.classList.add('no-scroll');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fechar menu');
            overlay.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('open');
            body.classList.remove('no-scroll');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            overlay.setAttribute('aria-hidden', 'true');
        }

        function isOpen() {
            return overlay.classList.contains('open');
        }

        toggle.addEventListener('click', function () {
            if (isOpen()) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeBtn.addEventListener('click', closeMenu);

        var i;
        for (i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', closeMenu);
        }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                closeMenu();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

- [ ] **Step 4.2:** Commit

```bash
git add assets/js/mobile-menu.js
git commit -m "feat(js): restore 3.0.0 overlay mobile menu behaviour"
```

---

### Task 5: Update `index.html` header markup

**Files:**
- Modify: `index.html`

- [ ] **Step 5.1:** In the `<header class="site-header">` section, remove the line `<div class="mobile-nav-backdrop" id="mobile-nav-backdrop" aria-hidden="true"></div>`.

- [ ] **Step 5.2:** Replace the mobile menu button (from `<button type="button" class="mobile-menu-toggle"` through `</button>`) with:

```html
            <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobileMenu" aria-label="Abrir menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line class="line-1" x1="4" x2="20" y1="12" y2="12" />
                    <line class="line-2" x1="4" x2="20" y1="6" y2="6" />
                    <line class="line-3" x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </button>
```

- [ ] **Step 5.3:** Immediately after the closing `</div>` of `.header-inner` (the `</div>` that closes the flex row containing `header-container` and `header-nav-wrapper`), insert before `</header>`:

```html
        <div class="mobile-menu-overlay" id="mobileMenu" aria-hidden="true">
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <img src="/assets/logos/b2m-logo-dark-nobg-400w.png" alt="B2M Solutions" class="mobile-menu-logo" width="400" height="154" decoding="async" loading="lazy">
                    <button type="button" class="mobile-menu-close" aria-label="Fechar menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <nav class="mobile-menu-nav" aria-label="Principal">
                    <a href="/" class="mobile-nav-link">Início</a>
                    <a href="/#problemas" class="mobile-nav-link">Soluções</a>
                    <a href="/clientes/" class="mobile-nav-link">Clientes</a>
                    <a href="/sobre/" class="mobile-nav-link">Sobre nós</a>
                </nav>

                <div class="mobile-menu-footer">
                    <a href="/contato/" class="btn-primary mobile-menu-cta">Fale conosco</a>

                    <div class="mobile-contact-info">
                        <p class="mobile-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            comercial@b2msolutions.com.br
                        </p>
                        <p class="mobile-contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            Seg - Sex, 09h às 18h
                        </p>
                    </div>
                </div>
            </div>
        </div>
```

- [ ] **Step 5.4:** Commit

```bash
git add index.html
git commit -m "feat(html): restore 3.0.0 mobile overlay on home"
```

---

### Task 6: Update remaining pages (same overlay; match desktop link targets)

**Files:**
- Modify: `404.html`, `clientes/index.html`, `contato/index.html`, `sobre/index.html`, `politica-de-privacidade/index.html`, `termos-de-uso/index.html`, `solutions/gasplanos/index.html`, `solutions/chrismedical/index.html`

- [ ] **Step 6.1:** On each file, apply the same three edits as Task 5: remove `.mobile-nav-backdrop`; replace toggle with SVG button (`aria-controls="mobileMenu"`); insert the overlay block after `</div>` that closes `.header-inner`. Use the **same** overlay inner HTML as Task 5 **except** adjust `.mobile-nav-link` and optional `aria-current` to mirror that page’s desktop nav:

| File | Soluções link in overlay | Notas |
|------|-------------------------|--------|
| `404.html` | `href="/#problemas"` | Same as desktop |
| `clientes/index.html` | `href="/#problemas"` | Same as desktop |
| `contato/index.html` | `href="/#problemas"` | Desktop Contato has `aria-current="page"`; overlay CTA can stay `href="/contato/"` |
| `sobre/index.html` | `href="/#problemas"` | — |
| `politica-de-privacidade/index.html` | `href="/#problemas"` | — |
| `termos-de-uso/index.html` | `href="/#problemas"` | — |
| `solutions/gasplanos/index.html` | `href="/#problemas"` | Desktop uses `Sobre Nós` capitalisation; use `Sobre nós` in overlay to match Task 5 unless desktop says otherwise |
| `solutions/chrismedical/index.html` | `href="/#problemas"` | Same as gasplanos |

- [ ] **Step 6.2:** Commit

```bash
git add 404.html clientes/index.html contato/index.html sobre/index.html politica-de-privacidade/index.html termos-de-uso/index.html solutions/gasplanos/index.html solutions/chrismedical/index.html
git commit -m "feat(html): restore 3.0.0 mobile overlay on all standard pages"
```

---

### Task 7: Manual verification

**Files:** none (browser only)

- [ ] **Step 7.1:** Serve the site from repo root (e.g. Live Server) at `http://127.0.0.1:5500/`.

- [ ] **Step 7.2:** For `index.html` and one inner page (e.g. `contato/index.html`), with viewport width 375px: open menu — overlay visible, panel slides, body does not scroll, hamburger becomes X, click dimmed area closes, click link closes, Escape closes.

- [ ] **Step 7.3:** At width ≥768px: horizontal nav visible, no hamburger, overlay not usable.

- [ ] **Step 7.4:** Open DevTools Console on each page type: no JavaScript errors from `mobile-menu.js`.

---

## Self-review (spec coverage)

| Spec section | Task(s) |
|--------------|---------|
| §4 HTML overlay + SVG toggle + remove backdrop | Tasks 5–6 |
| §5.1 `mobile-menu.css` | Task 1 |
| §5.2 `styles.css` import + drawer removal + `header-nav-wrapper` hidden mobile | Task 2 |
| §5.3 minify | Task 3 |
| §6 JS behaviour | Task 4 |
| §7 page list | Task 6 |
| §9 manual verification | Task 7 |

Placeholder scan: none.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-09-menu-mobile-3.0.0-restore.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
