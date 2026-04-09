# Clientes showcase reveal (scroll sync) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar um `IntersectionObserver` com critérios mais cedo (threshold + rootMargin) só aos cards de vitrine em `/clientes/`, manter o observer global para todos os outros `.reveal`, e escalonar os dois cards com delays 120ms / 280ms.

**Architecture:** Duas instâncias de `IntersectionObserver` com a mesma callback (unobserve após `active`). Elementos com `class="reveal reveal--showcase"` usam opções de showcase; todos os outros `.reveal` usam as opções atuais. Sem dupla observação: cada elemento é observado por exatamente um observer. Novas utilitárias CSS `.delay-120` e `.delay-280` + inclusão em `prefers-reduced-motion`.

**Tech Stack:** HTML estático, CSS em `assets/css/styles.css` (espelhar em `styles.min.css`), JS vanilla em `assets/js/animations.js`, sem bundler.

**Spec:** `docs/superpowers/specs/2026-04-09-clientes-showcase-reveal-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `assets/js/animations.js` | Dois observers; query por `.reveal.reveal--showcase` vs `.reveal:not(.reveal--showcase)` |
| `clientes/index.html` | Adicionar `reveal--showcase`; trocar `delay-100`/`delay-200` por `delay-120`/`delay-280` |
| `assets/css/styles.css` | Novas classes `.delay-120`, `.delay-280`; lista `prefers-reduced-motion` para zerar delays |
| `assets/css/styles.min.css` | Mesmas alterações minificadas (uma linha) |

---

### Task 1: Utilitários de delay e reduced motion (CSS)

**Files:**
- Modify: `assets/css/styles.css` (após `.delay-200`, ~linhas 210–212)
- Modify: `assets/css/styles.css` (bloco `@media (prefers-reduced-motion: reduce)`: seletores `.delay-*`, ~3837–3842)

- [ ] **Step 1: Adicionar `.delay-120` e `.delay-280`**

Inserir imediatamente após o bloco `.delay-200 { ... }`:

```css
.delay-120 {
    transition-delay: 120ms;
}

.delay-280 {
    transition-delay: 280ms;
}
```

- [ ] **Step 2: Incluir `delay-120` e `delay-280` no reset de reduced motion**

No ficheiro, localizar o bloco:

```css
    .delay-100,
    .delay-150,
    .delay-200,
    .delay-300,
    .delay-350,
    .delay-400 {
        transition-delay: 0ms;
    }
```

Substituir por uma lista que inclua as novas classes:

```css
    .delay-100,
    .delay-120,
    .delay-150,
    .delay-200,
    .delay-280,
    .delay-300,
    .delay-350,
    .delay-400 {
        transition-delay: 0ms;
    }
```

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): delay-120 and delay-280 for showcase reveal stagger"
```

---

### Task 2: Espelhar delays em `styles.min.css`

**Files:**
- Modify: `assets/css/styles.min.css` (ficheiro de uma linha)

- [ ] **Step 1: Inserir `.delay-120` e `.delay-280`**

Localizar o segmento (após `.delay-100`):

`.delay-100{transition-delay:0.1s}.delay-200{transition-delay:0.2s}`

Substituir por:

`.delay-100{transition-delay:0.1s}.delay-120{transition-delay:0.12s}.delay-200{transition-delay:0.2s}.delay-280{transition-delay:0.28s}`

(Usa `s` como `.delay-200`, para consistência.)

- [ ] **Step 2: Atualizar `prefers-reduced-motion` no min (bloco final)**

No **último** `@media (prefers-reduced-motion:reduce)` do ficheiro (o que contém `html{scroll-behavior:auto}` e `.reveal,.reveal.active`), localizar:

`.delay-100,.delay-200,.delay-300,.delay-400{transition-delay:0s}}`

Substituir por:

`.delay-100,.delay-120,.delay-200,.delay-280,.delay-300,.delay-400{transition-delay:0s}}`

Nota: o `styles.min.css` atual **não** inclui `.delay-150`/`.delay-350` nesse bloco; não adicionar agora (fora de âmbito).

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.min.css
git commit -m "feat(css): mirror delay-120 and delay-280 in styles.min.css"
```

---

### Task 3: `animations.js` — dois observers

**Files:**
- Modify: `assets/js/animations.js` (substituir o ficheiro inteiro pela versão abaixo)

- [ ] **Step 1: Substituir conteúdo de `assets/js/animations.js`**

O critério **showcase** usa `threshold: 0.1` e `rootMargin` com margem inferior **menos negativa** que `-50px` (`-25px`), para disparar o intersect mais cedo do que o default global. Ajustar só após QA se necessário.

```javascript
// Animações de reveal (Intersection Observer).
document.addEventListener('DOMContentLoaded', () => {
    const revealOptionsDefault = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOptionsShowcase = {
        threshold: 0.1,
        rootMargin: '0px 0px -25px 0px'
    };

    function createRevealObserver(options) {
        return new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, options);
    }

    const revealOnScrollDefault = createRevealObserver(revealOptionsDefault);
    const revealOnScrollShowcase = createRevealObserver(revealOptionsShowcase);

    document.querySelectorAll('.reveal.reveal--showcase').forEach(el => {
        revealOnScrollShowcase.observe(el);
    });

    document.querySelectorAll('.reveal:not(.reveal--showcase)').forEach(el => {
        revealOnScrollDefault.observe(el);
    });
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/animations.js
git commit -m "feat(js): separate IntersectionObserver options for reveal--showcase"
```

---

### Task 4: Marcar cards em `clientes/index.html`

**Files:**
- Modify: `clientes/index.html` (dois `<a class="sol-showcase-card ...">`)

- [ ] **Step 1: Atualizar o primeiro card (ChrisMedical)**

Substituir:

```html
<a href="/solutions/chrismedical/" class="sol-showcase-card reveal delay-100">
```

por:

```html
<a href="/solutions/chrismedical/" class="sol-showcase-card reveal reveal--showcase delay-120">
```

- [ ] **Step 2: Atualizar o segundo card (G.A.S Planos)**

Substituir:

```html
<a href="/solutions/gasplanos/" class="sol-showcase-card reveal delay-200">
```

por:

```html
<a href="/solutions/gasplanos/" class="sol-showcase-card reveal reveal--showcase delay-280">
```

- [ ] **Step 3: Commit**

```bash
git add clientes/index.html
git commit -m "feat(clientes): showcase reveal preset and stagger delays"
```

---

### Task 5: Verificação manual (aceitação)

**Files:** nenhum (apenas browser)

- [ ] **Step 1: Servir o site e abrir Clientes**

Servir a raiz do repositório (ex.: Live Server ou `npx serve`) e abrir `http://127.0.0.1:5500/clientes/` (ou a porta usada).

- [ ] **Step 2: Scroll — disparo mais cedo**

Com scroll de cima para baixo, confirmar que os dois cards começam a animar **antes** do comportamento anterior (referência: comparar antes/depois com git ou branch se necessário). O card deve ganhar `.active` quando ainda mais baixo no viewport que com o critério antigo.

- [ ] **Step 3: Escalonamento**

Confirmar que o segundo card anima claramente **depois** do primeiro (intervalo 120ms vs 280ms).

- [ ] **Step 4: Outras páginas inalteradas**

Abrir `/` e `/sobre/`: reveals (hero, secções, cards) devem comportar-se como antes (sem `reveal--showcase`).

- [ ] **Step 5: Consola**

Abrir DevTools → Console: sem erros de JS.

- [ ] **Step 6: Reduced motion (opcional mas recomendado)**

No Chrome: DevTools → Rendering → `Emulate CSS media feature prefers-reduced-motion` = `reduce`. Recarregar `/clientes/`: cards devem aparecer sem animação de delay (transitions zeradas como já definido para `.reveal`).

---

## Self-review (plan vs spec)

| Spec | Task |
|------|------|
| Preset estável (`reveal--showcase`) | Task 4 + Task 3 |
| Threshold + rootMargin distintos (0.08–0.12; disparo mais cedo) | Task 3 (`0.1`, `-25px` vs `-50px`) |
| Delays 120ms / 280ms | Tasks 1–2 + Task 4 |
| Outros `.reveal` inalterados | Task 3 (`:not(.reveal--showcase)`) |
| `prefers-reduced-motion` | Task 1 (lista de delays) |
| `styles.min.css` | Task 2 |

**Placeholder scan:** nenhum TBD; valores numéricos são os de partida do spec.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-09-clientes-showcase-reveal.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
