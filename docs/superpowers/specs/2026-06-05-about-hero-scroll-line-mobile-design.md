# Design: Linha de scroll do hero Sobre — correção mobile

## 1. Objetivo

Eliminar a sobreposição da linha animada sobre o texto do manifesto na página `/sobre/` em viewports mobile (≤ 767px), mantendo uma versão compacta e legível (alternativa **B** acordada).

## 2. Contexto atual

- `.about-hero-scroll-wrap` usa `position: absolute` ancorado no rodapé do hero.
- `.about-hero-scroll-line` tem `height: min(46vh, 21rem)` em todos os breakpoints.
- No mobile, o manifesto quebra em mais linhas; a linha alta cresce para cima e o ponto roxo (`.about-hero-scroll-pulse`) colide com a última linha do parágrafo.

## 3. Abordagem escolhida

**Abordagem 2 — linha no fluxo do layout no mobile** (somente CSS, sem alterar HTML).

Rejeitadas:
- **Abordagem 1** — só reduzir altura mantendo `position: absolute` (risco residual em telas pequenas).
- **Abordagem 3** — hero com conteúdo no topo (`flex-start`) — mudança visual demais em relação ao desktop.

## 4. Alterações

### 4.1 `assets/css/styles.css` — `@media (max-width: 767px)`

| Seletor | Propriedade | Valor |
|---------|-------------|-------|
| `.about-hero` | `padding-bottom` | `max(3rem, env(safe-area-inset-bottom))` |
| `.about-hero` | `gap` | `0` |
| `.about-hero-scroll-wrap` | `position` | `static` |
| `.about-hero-scroll-wrap` | `margin-top` | `1.75rem` |
| `.about-hero-scroll-line` | `height` | `5rem` |
| `.about-hero-scroll-indicator` | `gap` | `0.5rem` |

Desktop (≥ 768px): inalterado — linha absoluta no rodapé com altura `min(46vh, 21rem)`.

### 4.2 `assets/css/styles.min.css`

Regenerar a partir de `styles.css` via `npx clean-css-cli`.

## 5. Comportamento esperado

| Viewport | Comportamento |
|----------|---------------|
| ≤ 767px | Linha logo abaixo do manifesto, com ≥ 1.75rem de respiro; altura ~80px; seta abaixo da linha |
| ≥ 768px | Layout editorial atual preservado |

## 6. Critérios de sucesso

- [ ] Em 320px–767px, o ponto roxo não sobrepõe o texto do manifesto.
- [ ] Animações (`aboutHeroScrollPulse`, `aboutHeroBounce`) funcionam na linha curta.
- [ ] `prefers-reduced-motion` continua respeitado.
- [ ] Desktop sem regressão visual.

## 7. Escopo fora

- Alterações no HTML de `sobre/index.html`.
- Mudanças em outras páginas com hero similar.
