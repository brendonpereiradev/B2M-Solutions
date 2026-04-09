# Design: Padronização mobile — espaçamentos e títulos de hero (tokens CSS)

## 1. Objetivo

Reduzir a inconsistência entre páginas na **versão mobile** (viewports ≤767px): mesmo **respiro sob o header fixo** e **escala tipográfica** alinhada para manchetes de “página”, usando **variáveis CSS em `:root`** como fonte única de verdade. O trabalho inclui **espaçamento e tipografia em conjunto** (opção **C** acordada).

## 2. Contexto atual (resumo)

- `.main-content` usa `padding-top: 5rem` por defeito; `.about-page` e `.contact-page` usam `padding-top: 0` e os heros gerem o offset localmente.
- Tamanhos de primeira manchete variam: `.hero-title` (2.25rem mobile), `.about-hero-title` (2.6rem), `.section-title` (1.875rem), `.solutions-intro h1` (2.25rem), `.sol-card-title` (`clamp` próprio).
- Padding superior do primeiro bloco varia: `6.875rem` (Sobre/Contato após correção), `clamp` em legais, `8.75rem` no 404, `6rem` em `.problem-section` genérico, etc.

## 3. Princípios

1. **Tokens primeiro:** valores numéricos de “página hero” passam a `var(--…)` definidos em `:root` (secção de design tokens existente em `styles.css`).
2. **Dois níveis semânticos:** (A) páginas institucionais / conteúdo editorial; (B) páginas de case (soluções), sem obrigar o mesmo tamanho que (A).
3. **Sem refactor obrigatório de HTML** na primeira entrega: trocar valores nos seletores existentes; classes utilitárias partilhadas são opcionais se simplificarem manutenção.
4. **Breakpoint** alinhado ao site: **767px** (mobile) vs **768px** (tablet/desktop nos media queries atuais).

## 4. Tokens propostos

### 4.1 Espaçamento — nível “página”

| Token | Valor recomendado | Uso |
|-------|-------------------|-----|
| `--page-hero-padding-top-mobile` | `6.875rem` | Primeiro bloco hero sob header fixo quando `main` não aplica `padding-top` global (ex.: `.about-hero`, `.contact-intro`). |
| `--page-hero-padding-top-md` | `6.5rem` | Mesmo contexto em `@media (min-width: 768px)`. |
| `--page-hero-padding-bottom-mobile` | Herdar ou definir (ex. `4rem`) onde fizer sentido para alinhar “altura do bloco” entre páginas. |
| `--page-hero-padding-bottom-md` | Ex.: `5rem` onde já existe paridade (Sobre/Contato). |

Padding horizontal: continuar a usar **`--container-padding`** (já existente).

Opcional: `--page-hero-gap-title-to-body` (ex. `1rem`–`1.25rem`) para espaço **título → subtítulo / cartão**, aplicável onde hoje o gap é inconsistente.

### 4.2 Tipografia — nível A (páginas institucionais)

| Token | Mobile (≤767px) | ≥768px |
|-------|-------------------|--------|
| `--page-hero-title-size-mobile` | `2.25rem` | — |
| `--page-hero-title-size-md` | — | `3rem` |

**Âmbito nível A:** títulos de abertura em Contato, Sobre, Clientes (`.solutions-intro h1`), política/termos, 404, e equivalentes que hoje usam `.section-title` ou padrão semelhante.

**Ajuste explícito:**  
- `.section-title` em mobile **passa de 1.875rem para o token** (2.25rem) para alinhar a escala.  
- `.about-hero-title` em mobile **passa de 2.6rem para o token** (ligeira redução face ao estado actual, em troca de uniformidade com Home e restantes páginas).

### 4.3 Tipografia — nível B (case / solução)

| Token | Uso |
|-------|-----|
| `--case-hero-title-size-mobile` (e variantes se necessário) | Títulos principais em `solutions/*/index.html` (`.sol-card-title`), mantendo hierarquia forte; valores podem usar `clamp` desde que referenciem a base ou documentem o mínimo/máximo. |

Não é obrigatório que o tamanho de (B) seja igual a (A); deve apenas **derivar dos tokens** para evitar números mágicos dispersos.

## 5. Mapeamento por página / seletor

| Área | Seletores / blocos | Acção |
|------|---------------------|--------|
| Home | `.hero-title` | Onde valores coincidem com tokens nível A, referenciar `var(--page-hero-title-size-*)`; manter breakpoints específicos da home se necessário, documentando qualquer excepção. |
| Sobre | `.about-hero` | `padding-top` mobile/md → tokens §4.1; `.about-hero-title` → tokens §4.2. |
| Contato | `.contact-intro`, `.section-title` no hero | Idem padding; título → tokens §4.2. |
| Clientes | `.solutions-intro h1` | Tamanhos → tokens §4.2. |
| Política / Termos | `.legal-page-section` + `.section-title` | `padding-top` do primeiro bloco alinhado ao token mobile (substituir `clamp` isolado se o resultado ficar equivalente ou melhor; caso contrário documentar excepção). |
| 404 | `.problem-section--notfound` + `.section-title` | `padding-top` mobile: **usar primeiro** `var(--page-hero-padding-top-mobile)` (substituir `8.75rem`). Se, em QA, o bloco ficar visualmente desequilibrado, documentar excepção mínima (ex. token opcional ou `+0.5rem`) no plano de implementação — não antecipar sem evidência. |
| Soluções | `.sol-card-title` (e estrutura do header do case) | Tokens nível B §4.3. |

## 6. Responsividade e `min-height`

- `.about-hero` e `.contact-intro` usam `min-height: 100vh` / `100dvh`: manter; validar que, com tokens de padding, o título não fica colado ao header nem demasiado baixo em telemóveis com UI do browser.
- Não introduzir novos `min-height` agressivos sem teste em viewport real.

## 7. Ficheiros principais

- `assets/css/styles.css`: definir tokens em `:root`; substituir valores nos blocos listados.  
- `assets/css/styles.min.css`: regenerar após alterações (mesmo fluxo já usado no projeto, ex. `clean-css-cli --inline imports`).

## 8. Testes manuais (aceite)

1. Viewport **≤767px**: percorrer Home, Sobre, Contato, Clientes, uma página legal, 404, uma página de solução — verificar **respiro consistente** entre o fundo do header e o início do título.  
2. Mesma sequência: **tamanho de manchete** sem saltos estranhos ao mudar de página (Home ↔ Sobre ↔ Contato ↔ Clientes).  
3. Viewport **≥768px**: regressão visual rápida (títulos e paddings não devem “partir” face ao estado actual, salvo alinhamento intencional documentado).

## 9. Fora de âmbito

- Alterações ao menu mobile, footer, ou conteúdos de copy.  
- Refactor grande de HTML além do necessário para aplicar tokens.

## 10. Aprovação

- Desenho aprovado pelo responsável em 2026-04-10 (opção **C**: tokens + tipografia + espaçamentos no mesmo trabalho).
