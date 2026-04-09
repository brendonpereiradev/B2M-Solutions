# G.A.S Planos carousel showcase lightbox — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um lightbox ao carrossel de screenshots em `solutions/gasplanos/index.html`: toque ou clique na imagem do slide abre overlay com a mesma imagem ampliada e rolável; ao trocar de slide com o lightbox aberto, a imagem ampliada atualiza; fechamento por X, fundo e Escape; acessibilidade básica (`role="dialog"`, foco, `aria-label`).

**Architecture:** Overlay dedicado (`#showcase-lightbox-overlay`, classes `showcase-lightbox-*`), separado do modal de arquitetura (`#arch-modal-overlay`). JavaScript na mesma página reutiliza o padrão do modal AWS (classe `active`, `body` scroll lock). O handler do carrossel chama `syncShowcaseLightboxFromActiveSlide()` após cada `updateCarousel`. Abrir um modal fecha o outro para evitar dois overlays e conflito de Escape/`overflow`. `z-index` do lightbox **10000**, acima do modal de arquitetura (**9999**).

**Tech Stack:** HTML estático, CSS em `assets/css/styles.css` (espelhar em `assets/css/styles.min.css`), JavaScript vanilla inline no final de `solutions/gasplanos/index.html` (mesmo padrão atual).

**Spec:** [`docs/superpowers/specs/2026-04-09-gasplanos-carousel-lightbox-design.md`](../specs/2026-04-09-gasplanos-carousel-lightbox-design.md)

**Política de commit:** O mantenedor pediu para **não executar `git commit`** até autorização explícita. Conclua os passos de implementação e verificação; trate os passos “Commit” como **opcionais** até ser solicitado.

---

## File map

| File | Responsibility |
|------|----------------|
| [`solutions/gasplanos/index.html`](../../solutions/gasplanos/index.html) | Marcação do overlay lightbox após o modal de arquitetura; `tabindex="0"` nas imagens do carrossel; script unificado (carrossel + lightbox + exclusão mútua com modal AWS). |
| [`assets/css/styles.css`](../../assets/css/styles.css) | Bloco de estilos `.showcase-lightbox-*` após a secção do modal de arquitetura; cursor `zoom-in` nas imagens do carrossel (`.sol-carousel-slide img`). |
| [`assets/css/styles.min.css`](../../assets/css/styles.min.css) | Espelhar o mesmo bloco (ficheiro monolinha; inserir bloco minificado na posição lógica após regras `.arch-modal-*`). |

---

### Task 1: Marcação HTML do lightbox e foco nas imagens do carrossel

**Files:**
- Modify: [`solutions/gasplanos/index.html`](../../solutions/gasplanos/index.html)

- [ ] **Step 1: Inserir o overlay do lightbox imediatamente após o fechamento de `#arch-modal-overlay` (antes do `<!-- Footer -->`)**

Inserir exatamente:

```html
    <!-- ═══════════ LIGHTBOX: SCREENSHOTS DO CARROSSEL ═══════════ -->
    <div class="showcase-lightbox-overlay" id="showcase-lightbox-overlay" role="dialog" aria-modal="true"
        aria-label="Imagem do projeto ampliada" aria-hidden="true" hidden>
        <div class="showcase-lightbox-inner">
            <button type="button" class="showcase-lightbox-close" id="showcase-lightbox-close"
                aria-label="Fechar imagem ampliada">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="showcase-lightbox-scroll">
                <img id="showcase-lightbox-img" src="/assets/img/solutions/gasplanos/gas-showcase-1.png"
                    alt="G.A.S Planos — Hero Section Principal" width="1912" height="956" decoding="async">
            </div>
        </div>
    </div>
```

**Nota:** `src`/`alt` iniciais espelham o primeiro slide para evitar `src` vazio; o JS sobrepõe ao abrir.

- [ ] **Step 2: Adicionar `tabindex="0"` em cada `<img>` dentro de `.sol-carousel-slide` (cinco imagens)**

Exemplo para a primeira (repetir o atributo nas outras quatro):

```html
<img src="/assets/img/solutions/gasplanos/gas-showcase-1.png"
    alt="G.A.S Planos — Hero Section Principal" width="1912" height="956"
    tabindex="0"
    decoding="async" fetchpriority="high" loading="lazy">
```

- [ ] **Step 3: (Opcional) Commit**

```bash
git add solutions/gasplanos/index.html
git commit -m "feat(gasplanos): markup for showcase screenshot lightbox"
```

---

### Task 2: Estilos CSS do lightbox e cursor no carrossel

**Files:**
- Modify: [`assets/css/styles.css`](../../assets/css/styles.css) — inserir **após** o bloco `.arch-modal-diagram:hover .sol-arch-image` (aprox. linha 3732), **antes** do comentário `/* =========================================== PERFORMANCE`

- [ ] **Step 1: Colar o bloco completo abaixo**

```css
/* ===========================================
   LIGHTBOX: SCREENSHOTS DO CARROSSEL (G.A.S Planos)
   z-index acima do modal de arquitetura (9999)
   =========================================== */
.showcase-lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    padding-top: max(1rem, env(safe-area-inset-top));
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
}

.showcase-lightbox-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.showcase-lightbox-inner {
    position: relative;
    width: 100%;
    max-width: min(96vw, 1920px);
    max-height: 92vh;
    display: flex;
    flex-direction: column;
}

.showcase-lightbox-scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 92vh;
    border-radius: var(--radius-lg);
    text-align: center;
    background-color: rgba(5, 8, 18, 0.5);
}

.showcase-lightbox-scroll img {
    display: block;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    border-radius: var(--radius-md);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.showcase-lightbox-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    background-color: rgba(15, 23, 42, 0.85);
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    z-index: 3;
}

.showcase-lightbox-close:hover {
    background-color: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.45);
    color: #ef4444;
    transform: rotate(90deg);
}

.sol-carousel-slide img {
    cursor: zoom-in;
}
```

- [ ] **Step 2: No media query `@media (max-width: 767.98px)` existente que já ajusta `.arch-modal-overlay`**, adicionar regras paralelas para reduzir blur no lightbox (consistência com o modal AWS):

Dentro desse mesmo `@media (max-width: 767.98px) { ... }`, após `.arch-modal-content { ... }`, acrescentar:

```css
    .showcase-lightbox-overlay {
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
    }
```

- [ ] **Step 3: (Opcional) Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): showcase screenshot lightbox for G.A.S Planos carousel"
```

---

### Task 3: Espelhar CSS em `styles.min.css`

**Files:**
- Modify: [`assets/css/styles.min.css`](../../assets/css/styles.min.css)

- [ ] **Step 1: Minificar o bloco CSS novo do Task 2** (sem comentários) e inserir na mesma ordem lógica relativa a `.arch-modal-*` — tipicamente após a regra que contém `.arch-modal-diagram:hover .sol-arch-image`.

Texto minificado de referência (uma linha; confira com o bloco expandido do Task 2 antes de colar):

```text
.showcase-lightbox-overlay{position:fixed;inset:0;z-index:10000;background-color:rgba(0,0,0,.88);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:1rem;padding-top:max(1rem,env(safe-area-inset-top));padding-bottom:max(1rem,env(safe-area-inset-bottom));opacity:0;pointer-events:none;transition:opacity .35s ease}.showcase-lightbox-overlay.active{opacity:1;pointer-events:auto}.showcase-lightbox-inner{position:relative;width:100%;max-width:min(96vw,1920px);max-height:92vh;display:flex;flex-direction:column}.showcase-lightbox-scroll{overflow:auto;-webkit-overflow-scrolling:touch;max-height:92vh;border-radius:var(--radius-lg);text-align:center;background-color:rgba(5,8,18,.5)}.showcase-lightbox-scroll img{display:block;max-width:100%;width:auto;height:auto;margin:0 auto;border-radius:var(--radius-md);box-shadow:0 8px 32px rgba(0,0,0,.5)}.showcase-lightbox-close{position:absolute;top:.5rem;right:.5rem;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.1);border-radius:50%;background-color:rgba(15,23,42,.85);color:rgba(255,255,255,.85);cursor:pointer;transition:background-color .3s ease,border-color .3s ease,color .3s ease,transform .3s ease;z-index:3}.showcase-lightbox-close:hover{background-color:rgba(239,68,68,.25);border-color:rgba(239,68,68,.45);color:#ef4444;transform:rotate(90deg)}.sol-carousel-slide img{cursor:zoom-in}
```

E no `@media (max-width:767.98px)` já existente no `.min`, acrescentar `.showcase-lightbox-overlay{backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}` junto ao bloco mobile do `arch-modal` se ainda não existir.

- [ ] **Step 2: (Opcional) Commit**

```bash
git add assets/css/styles.min.css
git commit -m "feat(css): minified rules for showcase lightbox"
```

---

### Task 4: JavaScript — carrossel, lightbox, exclusão mútua com modal AWS

**Files:**
- Modify: [`solutions/gasplanos/index.html`](../../solutions/gasplanos/index.html) — substituir o bloco `<script>` inline que começa em `// ── Modal de Arquitetura AWS ──` até o final antes de `</body>` (manter as tags `<script src=... defer>` acima intactas).

- [ ] **Step 1: Substituir o script inline inteiro pelo código abaixo**

```html
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const archOverlay = document.getElementById('arch-modal-overlay');
            const btnOpenArch = document.getElementById('btn-open-arch-modal');
            const btnCloseArch = document.getElementById('arch-modal-close');

            const lbOverlay = document.getElementById('showcase-lightbox-overlay');
            const lbImg = document.getElementById('showcase-lightbox-img');
            const btnCloseLb = document.getElementById('showcase-lightbox-close');

            let lastFocusBeforeLightbox = null;

            const closeArchModal = () => {
                if (!archOverlay || !archOverlay.classList.contains('active')) return;
                archOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            const openArchModal = () => {
                if (lbOverlay && lbOverlay.classList.contains('active')) {
                    lbOverlay.classList.remove('active');
                    lbOverlay.setAttribute('aria-hidden', 'true');
                    lbOverlay.setAttribute('hidden', '');
                    lastFocusBeforeLightbox = null;
                }
                if (!archOverlay) return;
                archOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const syncShowcaseLightboxFromActiveSlide = () => {
                if (!lbOverlay || !lbImg || !lbOverlay.classList.contains('active')) return;
                const activeSlideImg = document.querySelector('.sol-carousel-slide--active img');
                if (!activeSlideImg) return;
                lbImg.src = activeSlideImg.currentSrc || activeSlideImg.src;
                lbImg.alt = activeSlideImg.alt || '';
            };

            const openShowcaseLightbox = (triggerElement) => {
                lastFocusBeforeLightbox = triggerElement && typeof triggerElement.focus === 'function'
                    ? triggerElement
                    : document.activeElement;
                closeArchModal();
                if (!lbOverlay) return;
                lbOverlay.removeAttribute('hidden');
                lbOverlay.setAttribute('aria-hidden', 'false');
                lbOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                syncShowcaseLightboxFromActiveSlide();
                if (btnCloseLb) btnCloseLb.focus();
            };

            const closeShowcaseLightbox = () => {
                if (!lbOverlay || !lbOverlay.classList.contains('active')) return;
                lbOverlay.classList.remove('active');
                lbOverlay.setAttribute('aria-hidden', 'true');
                lbOverlay.setAttribute('hidden', '');
                document.body.style.overflow = '';
                const el = lastFocusBeforeLightbox;
                if (el && typeof el.focus === 'function') {
                    el.focus();
                }
                lastFocusBeforeLightbox = null;
            };

            if (btnOpenArch && archOverlay && btnCloseArch) {
                btnOpenArch.addEventListener('click', openArchModal);
                btnCloseArch.addEventListener('click', closeArchModal);
                archOverlay.addEventListener('click', (e) => {
                    if (e.target === archOverlay) closeArchModal();
                });
            }

            if (lbOverlay && btnCloseLb) {
                btnCloseLb.addEventListener('click', closeShowcaseLightbox);
                lbOverlay.addEventListener('click', (e) => {
                    if (e.target === lbOverlay) closeShowcaseLightbox();
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape') return;
                if (lbOverlay && lbOverlay.classList.contains('active')) {
                    e.preventDefault();
                    closeShowcaseLightbox();
                    return;
                }
                if (archOverlay && archOverlay.classList.contains('active')) {
                    closeArchModal();
                }
            });

            const track = document.querySelector('#gas-carousel .sol-carousel-track');
            const slides = track ? Array.from(track.children) : [];
            const dots = document.querySelectorAll('#gas-carousel .sol-carousel-dot');

            if (!track || slides.length === 0) return;

            let currentIndex = 0;
            const slideCount = slides.length;
            let autoPlayInterval;
            let userInteracted = false;

            const updateCarousel = (index) => {
                slides.forEach((slide) => slide.classList.remove('sol-carousel-slide--active'));
                dots.forEach((dot) => dot.classList.remove('sol-carousel-dot--active'));

                track.style.transform = `translateX(-${index * 100}%)`;

                slides[index].classList.add('sol-carousel-slide--active');
                if (dots[index]) dots[index].classList.add('sol-carousel-dot--active');
                syncShowcaseLightboxFromActiveSlide();
            };

            const nextSlide = () => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel(currentIndex);
            };

            const startAutoPlay = () => {
                if (userInteracted) return;
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(nextSlide, 8000);
            };

            const stopAutoPlay = () => {
                clearInterval(autoPlayInterval);
            };

            slides.forEach((slide) => {
                const img = slide.querySelector('img');
                if (!img) return;
                img.addEventListener('click', () => {
                    openShowcaseLightbox(img);
                });
                img.addEventListener('keydown', (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        openShowcaseLightbox(img);
                    }
                });
            });

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    userInteracted = true;
                    currentIndex = index;
                    updateCarousel(currentIndex);
                    stopAutoPlay();
                });
            });

            const btnPrev = document.querySelector('#gas-carousel .sol-carousel-nav--prev');
            const btnNext = document.querySelector('#gas-carousel .sol-carousel-nav--next');

            if (btnPrev && btnNext) {
                btnPrev.addEventListener('click', () => {
                    userInteracted = true;
                    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                    updateCarousel(currentIndex);
                    stopAutoPlay();
                });

                btnNext.addEventListener('click', () => {
                    userInteracted = true;
                    nextSlide();
                    stopAutoPlay();
                });
            }

            const carouselContainer = document.getElementById('gas-carousel');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', stopAutoPlay);
                carouselContainer.addEventListener('mouseleave', startAutoPlay);
            }

            startAutoPlay();
        });
    </script>
```

**Comportamento coberto pela spec:**

| Requisito | Onde |
|-----------|------|
| Mesma `src`/`alt` do slide ativo | `syncShowcaseLightboxFromActiveSlide` |
| Atualizar ao mudar slide com lightbox aberto | `updateCarousel` → `syncShowcaseLightboxFromActiveSlide` |
| Escape fecha lightbox primeiro, depois modal AWS | `keydown` unificado |
| Clique fora (backdrop) | `click` em `lbOverlay` / `archOverlay` |
| `body` scroll lock | `openShowcaseLightbox` / `closeShowcaseLightbox` / `openArchModal` / `closeArchModal` |
| Abrir um modal fecha o outro | `openArchModal` fecha lightbox; `openShowcaseLightbox` chama `closeArchModal` |

- [ ] **Step 2: Verificação manual rápida (sem commit)**

1. Servir o site localmente (ex.: `127.0.0.1:5500`) e abrir `/solutions/gasplanos/`.
2. Clicar numa imagem do carrossel: overlay aparece, imagem corresponde ao slide; rolar dentro da área se necessário.
3. Com lightbox aberto, usar setas/dots: imagem ampliada muda.
4. Fechar com X, clique no fundo e Escape.
5. Abrir “Ver Arquitetura” e o lightbox dos screenshots em sequência: só um overlay ativo; Escape fecha o visível.

- [ ] **Step 3: (Opcional) Commit**

```bash
git add solutions/gasplanos/index.html
git commit -m "feat(gasplanos): wire showcase lightbox to carousel and arch modal"
```

---

## Spec coverage (self-review)

| Secção da spec | Tarefa(s) |
|----------------|-----------|
| Overlay dedicado + wrapper rolável | Task 1 HTML, Task 2 CSS |
| JS: padrão modal + sync ao slide ativo | Task 4 |
| A11y: dialog, aria-label, Escape, foco | Task 1 (`role`, `aria-*`, `tabindex`), Task 4 (foco no fechar, retorno) |
| Desktop: clique na imagem | Task 4 `click` em `img` |
| z-index coerente / um modal de cada vez | Task 2 (`z-index: 10000`), Task 4 exclusão mútua |
| Arquivos afetados (HTML + CSS + min) | Tasks 1–3 |
| Testes manuais sugeridos | Task 4 Step 2 |

**Gaps:** Nenhum requisito obrigatório da spec v1 fica sem tarefa. Pinch-zoom custom e novos assets permanecem fora do escopo (secção 3 da spec).

---

## Execution handoff

**Plano guardado em:** [`docs/superpowers/plans/2026-04-09-gasplanos-carousel-lightbox.md`](2026-04-09-gasplanos-carousel-lightbox.md)

**Duas opções de execução:**

1. **Subagent-Driven (recomendado)** — Subagente por tarefa, revisão entre tarefas, iteração rápida (skill `superpowers:subagent-driven-development`).

2. **Execução inline** — Executar tarefas nesta sessão com checkpoints (skill `superpowers:executing-plans`).

**Qual prefere?**
