# Menu hambúrguer mobile — Plano de implementação

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: usar `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa a tarefa. Passos usam checkbox (`- [ ]`) para acompanhamento.

**Objetivo:** Entregar navegação mobile com drawer à direita e backdrop, mesmo conteúdo do desktop, em todas as páginas com header padrão (incluindo `clientes/index.html`), sem dependências externas.

**Arquitetura:** Um único `.header-nav-wrapper` no DOM vira painel fixo no mobile; `body.nav-open` controla visibilidade. Backdrop é um irmão de `.header-container` dentro de `.site-header`. Lógica isolada em `assets/js/mobile-menu.js`, carregada com `defer` após `animations.js`. CSS concentrado em `assets/css/styles.css` na secção do header, com overrides em `@media (max-width: 767px)` e reset explícito em `@media (min-width: 768px)`.

**Stack:** HTML estático, CSS vanilla, ES5+ compatível com navegadores modernos (mesmo perfil do `animations.js` atual).

---

## Mapa de ficheiros

| Ficheiro | Responsabilidade |
|----------|------------------|
| `assets/js/mobile-menu.js` | **Criar.** Toggle `body.nav-open`, `aria-expanded` / `aria-label` no botão, fechar por backdrop, Escape, clique em links; foco no primeiro link ao abrir e no botão ao fechar. |
| `assets/css/styles.css` | **Alterar.** Remover `display: none` do wrapper em mobile; adicionar estilos do botão, backdrop, drawer e resets desktop; `body.nav-open { overflow: hidden; }`. |
| `assets/css/styles.min.css` | **Alterar.** Minificar a partir de `styles.css` (sem pipeline npm no repo). |
| 9× `*.html` (lista na Task 5) | **Alterar.** Inserir botão `.mobile-menu-toggle` no `header-container` (entre logo e wrapper), `id="site-navigation"` no wrapper, `aria-label` no `<nav>` onde faltar; backdrop após `</div>` do `header-container`; segundo `<script src="/assets/js/mobile-menu.js" defer></script>`. |

---

### Task 1: Criar `assets/js/mobile-menu.js`

**Ficheiros:**
- Criar: `assets/js/mobile-menu.js`
- Teste: abrir `index.html` via servidor local em `127.0.0.1:5500`, viewport &lt; 768px, DevTools Console sem erros.

- [ ] **Passo 1.1:** Criar o ficheiro com o conteúdo abaixo (completo).

```javascript
/**
 * Menu mobile: drawer + backdrop. Requer markup do plano (botão, #site-navigation, .mobile-nav-backdrop).
 */
(function () {
    'use strict';

    function init() {
        var toggle = document.querySelector('.mobile-menu-toggle');
        var backdrop = document.querySelector('.mobile-nav-backdrop');
        var panel = document.getElementById('site-navigation');
        if (!toggle || !backdrop || !panel) {
            return;
        }

        function setOpen(open) {
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
            if (open) {
                var firstLink = panel.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            } else {
                toggle.focus();
            }
        }

        function isOpen() {
            return document.body.classList.contains('nav-open');
        }

        toggle.addEventListener('click', function () {
            setOpen(!isOpen());
        });

        backdrop.addEventListener('click', function () {
            if (isOpen()) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                setOpen(false);
            }
        });

        panel.addEventListener('click', function (e) {
            if (e.target && e.target.closest && e.target.closest('a')) {
                setOpen(false);
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

- [ ] **Passo 1.2:** Guardar e fazer commit.

```bash
git add assets/js/mobile-menu.js
git commit -m "feat: script do menu mobile (drawer, backdrop, a11y)"
```

**Resultado esperado:** Ficheiro criado; páginas ainda sem markup não quebram (init retorna cedo).

---

### Task 2: Atualizar `assets/css/styles.css` (secção header)

**Ficheiros:**
- Modificar: `assets/css/styles.css` (bloco aproximado das linhas 251–395: `.header-container` … fim de `.btn-contato:hover`)

- [ ] **Passo 2.1:** Substituir o bloco atual de `.header-nav-wrapper` (`.header-nav-wrapper { display: none; }` + media `min-width: 768px`) e inserir **antes** de `.header-nav-wrapper` as regras do botão hambúrguer. Manter `.header-nav`, `.nav-link`, `.nav-divider`, `.btn-contato` como estão, exceto onde o novo media query mobile abaixo redefinir layout em coluna para o drawer.

Inserir **imediatamente após** o bloco `@media (min-width: 768px)` que ajusta `.header-logo` (após linha ~287), o seguinte bloco do **botão**:

```css
/* Botão hambúrguer — visível só abaixo de 768px */
.mobile-menu-toggle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    margin-left: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full, 9999px);
    background: rgba(22, 27, 46, 0.9);
    color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.mobile-menu-toggle:hover {
    border-color: rgba(139, 92, 246, 0.45);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
}

.mobile-menu-toggle__bar {
    display: block;
    width: 1.25rem;
    height: 2px;
    border-radius: 1px;
    background: currentColor;
}

@media (min-width: 768px) {
    .mobile-menu-toggle {
        display: none;
    }
}
```

- [ ] **Passo 2.2:** Remover estas linhas antigas:

```css
.header-nav-wrapper {
    display: none;
    align-items: center;
    margin-left: auto;
}

@media (min-width: 768px) {
    .header-nav-wrapper {
        display: flex;
    }
}
```

Substituir por:

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
    }

    body.nav-open .header-nav-wrapper {
        transform: translateX(0);
        visibility: visible;
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

- [ ] **Passo 2.3:** Imediatamente após a regra `.site-header {` (secção 6), ou no final do ficheiro numa secção clara, adicionar:

```css
body.nav-open {
    overflow: hidden;
}
```

(Se já existir conflito com outra regra em `body`, aumentar especificidade para `body.nav-open` apenas.)

- [ ] **Passo 2.4:** Verificar que em `max-width: 767px` o `.header-container` continua com `justify-content: space-between` e que o botão com `margin-left: auto` empurra o toggle para a direita quando o drawer está fechado (logo à esquerda, toggle à direita).

- [ ] **Passo 2.5:** Commit.

```bash
git add assets/css/styles.css
git commit -m "feat: estilos do drawer mobile, backdrop e botão hambúrguer"
```

---

### Task 3: Regenerar `assets/css/styles.min.css`

**Ficheiros:**
- Modificar: `assets/css/styles.min.css`

- [ ] **Passo 3.1:** Na raiz do repositório, minificar (requer Node/npx e rede na primeira vez):

```bash
npx --yes clean-css-cli -o "assets/css/styles.min.css" "assets/css/styles.css"
```

**Resultado esperado:** Comando termina com exit code 0; `styles.min.css` atualizado.

- [ ] **Passo 3.2:** Se `npx` não estiver disponível, usar qualquer minificador CSS já usado pela equipa para produzir o mesmo destino; o ficheiro minificado deve refletir **exatamente** as alterações de `styles.css`.

- [ ] **Passo 3.3:** Commit.

```bash
git add assets/css/styles.min.css
git commit -m "chore: minificar styles.css após menu mobile"
```

---

### Task 4: Marcação de referência em `index.html`

**Ficheiros:**
- Modificar: `index.html` (navbar no topo)

- [ ] **Passo 4.1:** Dentro de `<div class="header-container">`, **depois** de `</a>` do `.header-brand` e **antes** de `<div class="header-nav-wrapper">`, inserir:

```html
            <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="site-navigation" aria-label="Abrir menu">
                <span class="mobile-menu-toggle__bar" aria-hidden="true"></span>
                <span class="mobile-menu-toggle__bar" aria-hidden="true"></span>
                <span class="mobile-menu-toggle__bar" aria-hidden="true"></span>
            </button>
```

- [ ] **Passo 4.2:** No `<div class="header-nav-wrapper">`, adicionar `id="site-navigation"` e garantir `<nav class="header-nav" aria-label="Principal">` (adicionar `aria-label="Principal"` ao `<nav>` se ainda não existir).

- [ ] **Passo 4.3:** Imediatamente **após** o fecho `</div>` de `.header-container` (e ainda dentro de `<header class="site-header">`), inserir:

```html
        <div class="mobile-nav-backdrop" id="mobile-nav-backdrop" aria-hidden="true"></div>
```

- [ ] **Passo 4.4:** Após `<script src="/assets/js/animations.js" defer></script>`, adicionar:

```html
    <script src="/assets/js/mobile-menu.js" defer></script>
```

- [ ] **Passo 4.5:** Servir o site em `http://127.0.0.1:5500/`, largura 375px: ícone aparece; clicar abre drawer; backdrop escurece; scroll do body bloqueado; Escape e clique fora fecham; link navega e fecha.

- [ ] **Passo 4.6:** Commit.

```bash
git add index.html
git commit -m "feat: markup do menu mobile na home"
```

---

### Task 5: Replicar a mesma marcação nas outras 8 páginas

**Ficheiros (cada um: mesmo trio de alterações da Task 4 — botão, `id` + `aria-label` no nav, backdrop, script):**

- `404.html`
- `contato/index.html`
- `sobre/index.html`
- `clientes/index.html`
- `politica-de-privacidade/index.html`
- `termos-de-uso/index.html`
- `solutions/chrismedical/index.html`
- `solutions/gasplanos/index.html`

- [ ] **Passo 5.1:** Para cada ficheiro, repetir a estrutura da Task 4. **Nota:** `contato/index.html` já tem `<nav class="header-nav" aria-label="Principal">` — não duplicar atributos; apenas garantir `id="site-navigation"` no **wrapper** e o restante igual.

- [ ] **Passo 5.2:** Em `solutions/gasplanos/index.html`, manter quaisquer blocos `<script>` inline existentes **depois** dos dois scripts externos; apenas acrescentar `mobile-menu.js` logo após `animations.js`.

- [ ] **Passo 5.3:** Teste rápido em `http://127.0.0.1:5500/clientes/` e `http://127.0.0.1:5500/contato/` — comportamento idêntico à home em mobile.

- [ ] **Passo 5.4:** Commit.

```bash
git add 404.html contato/index.html sobre/index.html clientes/index.html politica-de-privacidade/index.html termos-de-uso/index.html solutions/chrismedical/index.html solutions/gasplanos/index.html
git commit -m "feat: menu mobile nas demais páginas com header padrão"
```

---

### Task 6: Verificação final (checklist da spec)

- [ ] **Passo 6.1:** Desktop (≥768px): sem botão hambúrguer; links em linha; sem regressão visual óbvia.

- [ ] **Passo 6.2:** Mobile: drawer pela direita, backdrop abaixo do header fixo (`top: 5rem`), `body` sem scroll quando aberto.

- [ ] **Passo 6.3:** `clientes/index.html` com mesmo comportamento que `index.html`.

- [ ] **Passo 6.4:** Revisão de cobertura da spec: §7.1–7.4 e §9 satisfeitos (um wrapper, ARIA, JS dedicado, min.css alinhado).

---

## Cobertura da spec (self-review)

| Requisito na spec | Onde no plano |
|-------------------|---------------|
| Drawer direita + backdrop | Task 2 CSS `transform` / `.mobile-nav-backdrop` |
| Mesmo conteúdo desktop | Um único `.header-nav-wrapper` sem duplicar links |
| Todas as páginas incl. clientes | Task 4–5 lista explícita |
| `aria-expanded`, `aria-controls`, rótulos PT | Task 1 JS + Task 4–5 markup |
| Fechar: botão, backdrop, Escape | Task 1 |
| `body` scroll lock | Task 2 `body.nav-open` |
| `styles.min.css` sincronizado | Task 3 |
| Sem frameworks | Apenas CSS/JS vanilla |

Nenhum marcador TBD: comandos e código são fechados.

---

## Opções de execução

**Plano guardado em:** `docs/superpowers/plans/2026-04-09-mobile-hamburger-menu.md`

**Duas formas de executar:**

1. **Subagent-Driven (recomendado)** — um subagente por tarefa, revisão entre tarefas, iteração rápida. **SUB-SKILL OBRIGATÓRIA:** `superpowers:subagent-driven-development`.

2. **Execução inline** — executar na mesma sessão com `superpowers:executing-plans`, lotes com checkpoints.

**Qual abordagem prefere?**
