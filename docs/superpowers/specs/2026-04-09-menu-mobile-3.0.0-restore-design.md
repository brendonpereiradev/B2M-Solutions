# Design: Restaurar menu mobile do commit 3.0.0 (`90eacb7`)

## 1. Objetivo

Substituir o menu mobile atual (drawer à direita em `.header-nav-wrapper` + backdrop + botão com três barras) pelo menu do **commit `90eacb7`** (mensagem de commit `3.0.0`): overlay fullscreen com blur, painel lateral direito, animação dos links, footer com CTA e contactos, e ícone SVG hambúrguer que anima para X.

## 2. Referência canónica

| Item | Valor |
|------|--------|
| Commit | `90eacb73d6c67a10a4843735c169a6c1cfa64695` |
| Mensagem | `3.0.0` |
| CSS do overlay | `assets/css/components/mobile-menu.css` (existente nesse commit; recriar no projeto atual) |
| Markup | Bloco `.mobile-menu-overlay#mobileMenu` com `.mobile-menu-content`, `.mobile-menu-header`, `.mobile-menu-nav`, `.mobile-menu-footer` |
| Toggle | `<button class="mobile-menu-toggle">` com SVG (linhas `line-1`, `line-2`, `line-3`) |

## 3. Abordagem de implementação

**Escolhida:** port manual guiada pelo `90eacb7` (não checkout cego de ficheiros inteiros).

- Recriar markup e estilos a partir do histórico, integrando com o layout atual (incl. `.header-inner` onde já existe).
- Lógica JS com comportamento idêntico ao bloco de menu do `animations.js` daquela versão; preferência por manter o código em **`assets/js/mobile-menu.js`** e **`animations.js`** apenas com Intersection Observer (reveal).

## 4. HTML

### 4.1 Alterações em todas as páginas com header padrão

- Remover **`.mobile-nav-backdrop`**.
- Substituir o botão atual (três `<span class="mobile-menu-toggle__bar">`) pelo botão com **SVG** (três `<line>` com classes `line-1`, `line-2`, `line-3`) como no `90eacb7`.
- Inserir o bloco **overlay** após o fecho de `.header-inner` (ou estrutura equivalente), como filho direto de `<header>`:
  - `.mobile-menu-overlay#mobileMenu` com `aria-hidden="true"` inicial.
  - Dentro: `.mobile-menu-content` → `.mobile-menu-header` (logo + `.mobile-menu-close` com SVG), `.mobile-menu-nav` com links `.mobile-nav-link`, `.mobile-menu-footer` com `.btn-primary.mobile-menu-cta` e `.mobile-contact-info` (email e horário como no referencial, atualizando só se o conteúdo de contacto do site tiver mudado).
- Atributos: `aria-expanded` e `aria-controls="mobileMenu"` no toggle; manter `aria-label` adequados em botões.

### 4.2 Identificadores

- Overlay: **`id="mobileMenu"`** (o JS legado usa `getElementById('mobileMenu')`).
- Não usar `#site-navigation` no wrapper desktop se isso conflitar com o padrão anterior; o desktop continua a ser `.header-nav-wrapper` visível só a partir de 768px (ver CSS).

### 4.3 Links por tipo de página

- **Home:** links desktop com `#problemas` onde aplicável; no overlay usar **`/#problemas`** para “Soluções” (como no `90eacb7`).
- **Demais páginas:** alinhar `.mobile-nav-link` aos mesmos destinos que `.nav-link` no desktop e ao `90eacb7` da respetiva página (ex.: páginas de solução com `/#problemas`).

## 5. CSS

### 5.1 Novo ficheiro

- Criar **`assets/css/components/mobile-menu.css`** com o conteúdo equivalente ao do commit `90eacb7` (overlay, `.mobile-menu-content`, animações, `.mobile-nav-link`, footer, `.mobile-menu-toggle` com linhas SVG, estados `.open` / `.active`, `body.no-scroll`).

### 5.2 `styles.css`

- No topo: **`@import "./components/mobile-menu.css";`** (caminho relativo ao `styles.css`).
- **Remover** o padrão drawer atual:
  - Regras que em `<768px` fixam `.header-nav-wrapper` como painel deslizante, `transform`, backdrop em `.header-nav-wrapper`.
  - **`.mobile-nav-backdrop`** e estados associados.
  - **`body.nav-open`** (substituir por **`body.no-scroll`** do `mobile-menu.css` para bloquear scroll).
  - Estilos do toggle com **`.mobile-menu-toggle__bar`** (deixam de existir).
- **Repor** o comportamento `3.0.0` para navegação desktop vs mobile:
  - `.header-nav-wrapper { display: none; }` por defeito (mobile).
  - `@media (min-width: 768px) { .header-nav-wrapper { display: flex; … } }` e restauro de layout horizontal do header.
- Ajustar **`.mobile-menu-toggle`** para não manter o estilo “pill + três barras” se conflitar com o visual do `3.0.0` (prioridade: fidelidade ao referencial).
- Garantir compatibilidade com **`.header-inner`** (flex, `min-width`, stacking) sem regressão no desktop.

### 5.3 Minificação

- Regenerar **`assets/css/styles.min.css`** após alterações ao CSS fonte.

## 6. JavaScript

- Implementar em **`mobile-menu.js`** (ou reintegrar em `animations.js` se se preferir ficheiro único — a preferência documentada é **`mobile-menu.js`**):
  - Seletores: `.mobile-menu-toggle`, `#mobileMenu`, `.mobile-menu-close`, `.mobile-nav-link`.
  - Abrir: `.active` no toggle, `.open` no overlay, `no-scroll` no `body`, `aria-expanded` / `aria-hidden` atualizados.
  - Fechar: inverso; clique no overlay (target estrito), links, botão close, tecla **Escape**.
  - Early return se faltar toggle, overlay ou close (comportamento do script original).
- **`animations.js`:** apenas lógica de reveal (sem duplicar menu).

## 7. Páginas em âmbito

Todas as páginas que hoje incluem o header padrão com menu mobile, incluindo pelo menos:

- `index.html`, `404.html`
- `clientes/index.html`, `contato/index.html`, `sobre/index.html`
- `politica-de-privacidade/index.html`, `termos-de-uso/index.html`
- `solutions/chrismedical/index.html`, `solutions/gasplanos/index.html`

Onde o header difere (ex.: só `header-container` sem `header-inner`), manter consistência estrutural com a mesma árvore de overlay e toggle, adaptando apenas o wrapper externo necessário.

## 8. Acessibilidade e z-index

- Manter estados ARIA coerentes com aberto/fechado.
- `z-index` do overlay e do toggle conforme `mobile-menu.css` (overlay alto; toggle acima quando necessário). Validar contra `.site-header` (z-index 50 no layout atual).

## 9. Verificação manual

- Viewport &lt; 768px: abrir/fechar; morph hambúrguer → X; scroll bloqueado; fechar por overlay, link, close, Escape.
- Viewport ≥ 768px: nav horizontal visível; toggle oculto; sem overlay.

## 10. Fora de âmbito

- Novas animações ou alterações de copy fora dos blocos do menu.
- Refactors não relacionados ao header ou ao CSS global.

## 11. Aprovação

- Desenho aprovado pelo responsável em 2026-04-09 (opção **A**: restauração completa do menu do `90eacb7`).
