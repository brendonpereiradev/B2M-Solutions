# Design: Centralização vertical do hero — página Contato

## 1. Objetivo

Corrigir o desequilíbrio visual da página `/contato/`: o bloco hero (título, subtítulo e card de canais) está colado à navbar e há excesso de espaço vazio antes do footer. Centralizar verticalmente o conteúdo principal na viewport, alinhado ao padrão da página Sobre nós (alternativa **A** acordada).

## 2. Contexto atual

- `.contact-intro` usa `min-height: auto` e `justify-content: flex-start`, com comentário explícito para caber na primeira dobra sem scroll.
- Isso diverge do spec `2026-04-10-mobile-page-standardization-design.md` (§6), que prevê `min-height: 100vh` / `100dvh` para `.contact-intro`.
- `.about-hero` já implementa o padrão desejado: `min-height: 100dvh` + `justify-content: center` + `padding-top` para header fixo.

## 3. Abordagem escolhida

**Espelhar `.about-hero`** — alteração somente em CSS, sem mudanças no HTML.

Rejeitadas:
- Layout flex em `body`/`main` com footer sticky (complexidade extra, padrão diferente do Sobre).
- `min-height: calc(100dvh - footer)` (frágil, altura do footer variável).

## 4. Alterações

### 4.1 `assets/css/styles.css` — bloco `.contact-intro`

| Propriedade | De | Para |
|-------------|-----|------|
| `min-height` | `auto` | `100vh` + fallback `100dvh` |
| `justify-content` | `flex-start` | `center` |

Manter inalterados:
- `padding-top: max(5.75rem / 6rem, env(safe-area-inset-top))` — respiro sob header fixo
- `padding-bottom`, glow, `.contact-intro-inner`, card, animações `reveal`

Remover/atualizar o comentário que referencia “conteúdo alinhado ao topo para caber na 1ª dobra sem scroll”.

### 4.2 `assets/css/styles.min.css`

Regenerar a partir de `styles.css` via `npx clean-css-cli --inline imports`.

## 5. Comportamento esperado

| Viewport | Resultado |
|----------|-----------|
| Desktop ≥1024px | Título + card centralizados na viewport; footer abaixo da dobra (scroll curto). |
| Mobile ≤767px | Mesmo princípio; scroll natural se a altura for insuficiente para o card. |
| Header fixo | Título não fica oculto atrás da navbar graças ao `padding-top` existente. |

## 6. Fora de escopo

- Gradiente inferior estilo `.about-hero::after`
- Tokens `--page-hero-padding-top-*` (refactor separado)
- Outras páginas

## 7. Verificação manual

1. Abrir `http://127.0.0.1:5500/contato/` em desktop — bloco centrado, respiro equilibrado sob navbar.
2. Repetir em viewport 375px — conteúdo legível, sem colar no header.
3. Comparar visualmente com `/sobre/` para consistência de sensação “landing editorial”.

## 8. Ficheiros

| Ficheiro | Acção |
|----------|--------|
| `assets/css/styles.css` | Modificar `.contact-intro` |
| `assets/css/styles.min.css` | Regenerar |
