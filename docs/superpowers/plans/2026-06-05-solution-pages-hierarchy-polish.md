# Solution Pages Hierarchy Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar a hierarquia visual das páginas ChrisMedical e G.A.S Planos (narrativa → showcase → detalhes → timeline) sem adicionar elementos HTML nem alterar texto.

**Architecture:** Reparentar nós DOM existentes em `.sol-card-header` para corrigir ordem de leitura no mobile; sobrescrever CSS de `.sol-card-header--centered` para eliminar hero fullscreen e restaurar split editorial no desktop; repesagem tipográfica só via CSS. ChrisMedical migra estilos inline do showcase para `styles.css`.

**Tech Stack:** HTML estático, CSS puro (`assets/css/styles.css` + `styles.min.css`), JS inline existente em G.A.S Planos (sem mudanças funcionais).

**Spec de referência:** [`docs/superpowers/specs/2026-06-05-solution-pages-hierarchy-polish-design.md`](../specs/2026-06-05-solution-pages-hierarchy-polish-design.md)

---

## File map

| Arquivo | Responsabilidade |
|---------|------------------|
| `solutions/chrismedical/index.html` | Reparentar meta + tech-bar; remover inline styles do showcase |
| `solutions/gasplanos/index.html` | Reparentar meta + hero-actions + tech-bar; corrigir árvore DOM (`</div>` extra) |
| `assets/css/styles.css` | Overrides de hierarquia, grid, tipografia, showcase estático |
| `assets/css/styles.min.css` | Espelho minificado de `styles.css` |

**Fora do escopo:** `animations.js`, `mobile-menu.js`, `/clientes/`, demais páginas.

---

### Task 1: Baseline — capturar estado atual

**Files:**
- Read: `solutions/chrismedical/index.html`
- Read: `solutions/gasplanos/index.html`
- Read: `assets/css/styles.css` (bloco `.sol-card` ~L3138–3600)

- [ ] **Step 1: Verificar servidor local**

```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 5500 -WarningAction SilentlyContinue | Select-Object TcpTestSucceeded
```

Se `TcpTestSucceeded` for `False`, iniciar Live Server em `127.0.0.1:5500` na raiz do projeto.

- [ ] **Step 2: Abrir páginas de baseline**

Navegar e anotar (ou screenshot mental):
- `http://127.0.0.1:5500/solutions/chrismedical/`
- `http://127.0.0.1:5500/solutions/gasplanos/`

Viewports: 375px, 1024px, 1440px.

- [ ] **Step 3: Confirmar restrições antes de editar**

Diff futuro deve **não** alterar nenhum nó de texto (`innerHTML` de spans, `h1`–`h4`, `p`, `alt`, `aria-label` com copy). Só estrutura e CSS.

---

### Task 2: ChrisMedical — reordenar DOM do hero

**Files:**
- Modify: `solutions/chrismedical/index.html` (hero block ~L118–179)

- [ ] **Step 1: Deixar `.sol-card-info` só com narrativa**

Mover `.sol-card-meta` (L140–159) e `.sol-card-tech-bar` (L162–169) para **fora** de `.sol-card-info`, como filhos diretos de `.sol-card-header`, **após** `.sol-card-showcase`.

Estrutura alvo:

```html
<div class="sol-card-header sol-card-header--centered reveal delay-100">
    <a href="/clientes/" class="solution-back-link reveal">…</a>

    <div class="sol-card-info">
        <div class="sol-card-categories-text">…</div>
        <h1 class="sol-card-title">ChrisMedical</h1>
        <p class="sol-card-desc">…</p>
    </div>

    <div class="sol-card-showcase sol-card-showcase--logo">…</div>

    <div class="sol-card-meta">…</div>

    <div class="sol-card-tech-bar">…</div>
</div>
```

- [ ] **Step 2: Remover estilos inline do showcase**

Substituir o `div.sol-card-showcase` com atributos inline por classe. Adicionar `sol-card-showcase--logo` no HTML:

```html
<div class="sol-card-showcase sol-card-showcase--logo">
    <img src="/assets/logos/chrismedical-logo-nobg-400w.png" alt="ChrisMedical Logo"
        width="400" height="256" decoding="async" fetchpriority="high"
        class="sol-card-showcase-logo">
</div>
```

Não alterar `src`, `alt`, `width`, `height` nem textos.

- [ ] **Step 3: Verificação rápida**

Abrir ChrisMedical no browser. Ordem visual esperada (mobile): back → categoria → título → descrição → logo → meta → tech. Layout pode ainda estar centralizado (CSS vem na Task 4).

---

### Task 3: G.A.S Planos — reordenar DOM e corrigir árvore

**Files:**
- Modify: `solutions/gasplanos/index.html` (hero ~L118–259, fechamento ~L312–316)

- [ ] **Step 1: Reordenar hero (mesmo padrão ChrisMedical + ações)**

Mover para fora de `.sol-card-info`, após `.sol-card-showcase`, nesta ordem:
1. `.sol-card-meta`
2. `.sol-hero-actions`
3. `.sol-card-tech-bar`

`.sol-card-info` retém apenas categorias, título e descrição.

- [ ] **Step 2: Corrigir `</div>` extra**

Hoje há um `</div>` em ~L259 que fecha `.sol-card` antes da timeline.

**Remover** o `</div>` órfão após o fechamento de `.sol-card-header`.

**Adicionar** `</div>` para fechar `.sol-card` **depois** de `.sol-card-timeline` e **antes** de `</article>`:

```html
                    </div> <!-- fim .sol-card-timeline -->

                    </div> <!-- fim .sol-card -->

                </article>
```

Árvore alvo (igual ChrisMedical):

```
article.solution-panel
  └── div.sol-card
        ├── div.sol-card-header
        └── div.sol-card-timeline
```

- [ ] **Step 3: Verificação estrutural**

No DevTools, confirmar que `.sol-card-timeline` é filho de `.sol-card`, não de `article` direto.

- [ ] **Step 4: Smoke test G.A.S interativo**

- Carrossel: setas, dots, autoplay
- Clique na imagem → lightbox abre/fecha
- “Ver Arquitetura” → modal abre; diagrama amplia no lightbox
- Escape fecha overlays

---

### Task 4: CSS — hierarquia editorial e split desktop

**Files:**
- Modify: `assets/css/styles.css` (seção `.sol-card`, ~L3199–3315 e adjacentes)

- [ ] **Step 1: Neutralizar fullscreen centralizado**

Substituir o bloco `.sol-card-header.sol-card-header--centered` e regras filhas de centralização por:

```css
/* Hero editorial — narrativa primeiro (case pages) */
.sol-card-header.sol-card-header--centered {
    min-height: unset;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1.75rem;
    text-align: left;
    padding-top: 0.5rem;
    padding-bottom: 2rem;
}

.sol-card-header--centered .solution-back-link {
    margin: 0 0 0.5rem;
    align-self: flex-start;
    opacity: 0.85;
}

@media (min-width: 1024px) {
    .sol-card-header.sol-card-header--centered {
        display: grid;
        grid-template-columns: 1fr 1.25fr;
        grid-template-rows: auto auto 1fr;
        gap: 1.25rem 3rem;
        align-items: start;
        padding-bottom: 2.5rem;
    }

    .sol-card-header--centered .solution-back-link {
        grid-column: 1 / -1;
    }

    .sol-card-header--centered .sol-card-info {
        grid-column: 1;
        grid-row: 2;
    }

    .sol-card-header--centered .sol-card-showcase {
        grid-column: 2;
        grid-row: 2 / span 4;
        align-self: center;
    }

    .sol-card-header--centered .sol-card-meta,
    .sol-card-header--centered .sol-hero-actions,
    .sol-card-header--centered .sol-card-tech-bar {
        grid-column: 1;
    }
}

@media (min-width: 1440px) {
    .sol-card-header.sol-card-header--centered {
        gap: 1.5rem 5rem;
    }
}
```

- [ ] **Step 2: Alinhamento à esquerda do bloco narrativo**

Substituir regras que centralizam `.sol-card-info` e filhos:

```css
.sol-card-header--centered .sol-card-info {
    width: 100%;
    max-width: 40rem;
    align-items: flex-start;
    text-align: left;
}

.sol-card-header--centered .sol-card-categories-text,
.sol-card-header--centered .sol-card-meta,
.sol-card-header--centered .sol-card-tech-bar,
.sol-card-header--centered .sol-tech-bar-list,
.sol-card-header--centered .sol-hero-actions {
    justify-content: flex-start;
}

.sol-card-header--centered .sol-card-desc {
    margin: 0;
    max-width: 40rem;
}
```

- [ ] **Step 3: Repesagem tipográfica**

Ajustar dentro do mesmo arquivo (valores podem ser finados na Task 6):

```css
.sol-card-header--centered .sol-card-categories-text {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    margin-bottom: 0.5rem;
    opacity: 0.7;
}

.sol-card-header--centered .sol-card-title {
    text-transform: none;
    font-size: clamp(1.75rem, 3vw, 3rem);
    margin: 0.25rem 0 0.75rem;
}

.sol-card-header--centered .sol-card-desc {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.75;
}

@media (min-width: 1440px) {
    .sol-card-header--centered .sol-card-desc {
        font-size: 1.125rem;
    }
}

.sol-card-header--centered .sol-card-meta {
    margin-top: 0.5rem;
}

.sol-card-header--centered .sol-card-meta-item {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.45);
}

.sol-card-header--centered .sol-tech-bar-item {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
}

.sol-card-header--centered .sol-card-tech-bar {
    margin-top: 0.75rem;
}

.sol-card-header--centered .sol-tech-bar-list {
    gap: 0.5rem 1rem;
}
```

- [ ] **Step 4: Showcase ChrisMedical (ex-inline)**

Adicionar após regras de `.sol-card-showcase`:

```css
.sol-card-showcase--logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 3rem;
}

.sol-card-showcase-logo {
    max-width: 250px;
    opacity: 0.8;
    filter: drop-shadow(0 0 20px rgba(79, 70, 229, 0.2));
}
```

- [ ] **Step 5: Separar hero da timeline**

```css
.sol-card-header.sol-card-header--centered + .sol-card-timeline {
    margin-top: 1rem;
}
```

- [ ] **Step 6: Verificar que `/clientes/` não regrediu**

Seletores usam `.sol-card-header--centered` — não afetam `.sol-showcase-card` em `/clientes/`. Abrir `/clientes/` e confirmar grid intacto.

---

### Task 5: Minificar CSS

**Files:**
- Modify: `assets/css/styles.min.css`

- [ ] **Step 1: Gerar minificado**

Na raiz do projeto:

```powershell
npx --yes clean-css-cli -o "assets/css/styles.min.css" "assets/css/styles.css"
```

Se `npx` falhar, copiar manualmente as regras novas para `styles.min.css` (padrão do repositório).

- [ ] **Step 2: Confirmar que páginas de solução referenciam `styles.min.css`**

Ambas já usam `/assets/css/styles.min.css` — sem mudança necessária.

---

### Task 6: Verificação final (manual)

**Files:** nenhuma alteração — checklist de aceite da spec.

- [ ] **Step 1: Hierarquia mobile (375px)**

Em ChrisMedical e G.A.S:
- [ ] Descrição aparece antes de meta/tech/ações
- [ ] Showcase visível sem scroll excessivo até a timeline
- [ ] Nenhum texto diferente do original

- [ ] **Step 2: Desktop split (1024px+)**

- [ ] Texto narrativo à esquerda, showcase à direita
- [ ] Meta, ações e tech abaixo da descrição (coluna esquerda)
- [ ] Timeline com respiro abaixo do hero

- [ ] **Step 3: G.A.S regressão funcional**

- [ ] Carrossel, lightbox, modal AWS, botões neon
- [ ] Sem erros no console

- [ ] **Step 4: Diff guard**

```powershell
git diff solutions/chrismedical/index.html solutions/gasplanos/index.html
```

Confirmar: mudanças são só reordenação de blocos, classes novas em containers existentes (`sol-card-showcase--logo`, `sol-card-showcase-logo`), remoção de `style=""`. Nenhuma string de copy alterada.

---

### Task 7: Commit (somente se o usuário solicitar)

O repositório só recebe commit quando o usuário pedir explicitamente.

- [ ] **Step 1: Mensagem sugerida**

```
refactor(solutions): hierarquia editorial nos cases ChrisMedical e G.A.S

Narrativa lidera o hero; showcase e detalhes técnicos descem na ordem de leitura, sem novos elementos nem mudança de copy.
```

---

## Spec coverage checklist

| Requisito da spec | Task |
|-------------------|------|
| Sem elementos novos | Tasks 2–3 (só reparenting) |
| Sem alteração de texto | Tasks 2–3, 6 Step 4 |
| Remover hero fullscreen | Task 4 Step 1 |
| Split desktop 1fr / 1.25fr | Task 4 Step 1 |
| Ordem mobile narrativa → showcase → detalhes | Tasks 2–3 |
| Tipografia repesada | Task 4 Step 3 |
| Showcase ChrisMedical sem inline | Tasks 2 + 4 Step 4 |
| Corrigir DOM G.A.S | Task 3 Step 2 |
| Timeline + CTA intactos | Tasks 3, 4 Step 5 |
| Regressão carrossel/modal/lightbox | Tasks 3, 6 |
| styles.min.css | Task 5 |

## Self-review

- Placeholders: nenhum.
- Tipos/classes consistentes: `sol-card-showcase--logo` definida em Task 2 e estilizada em Task 4.
- Spec gaps: nenhum requisito sem task.
