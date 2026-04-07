# Auditoria de responsividade mobile (site completo)

Data de referência: 2026-04-03. Servidor local: `npx serve -l 3456` na raiz do repositório.

## Breakpoints relevantes (`assets/css/styles.css`)

| Valor | Uso |
|-------|-----|
| Base (sem media) | Mobile-first |
| 576px, 640px | Grids, stats, utilitários |
| 768px | Nav desktop, header, muitas seções |
| 992px | Casos pontuais |
| 1024px | Hero dashboard visível, layouts em colunas |
| 1200px | Larguras máximas de painéis |
| 1280px, 1440px | Escala / ultra-wide |

Há também `(max-width: 1023px)` em trechos específicos.

## Meta viewport e navegação

Todas as páginas HTML possuem `width=device-width, initial-scale=1.0`.

| Página | Observação |
|--------|------------|
| `index.html`, `clientes/`, `contato/`, `sobre/`, `chrismedical/`, `gasplanos/`, `termos-de-uso/`, `politica-de-privacidade/` | Header + offcanvas `#mobileMenu` + `animations.js` |
| `404.html` | Passou a incluir o mesmo header/offcanvas (antes só havia CTA; menu mobile inexistente). |
| `solutions/gasplanos/` | **Corrigido:** overlay do menu e handler `alert('Menu mobile em desenvolvimento')` removido; alinhado ao restante do site. |

## Matriz de verificação (320 / 375 / 768)

Verificação feita com MCP browser em **320×640** e **768×900** em URLs amostrais; demais páginas conferidas por inspeção de markup/CSS e correções estruturais onde aplicável.

| URL | 320px | 375px (inferido) | 768px | Notas |
|-----|-------|------------------|-------|--------|
| `/` | OK | OK | OK | Hero sem mockup &lt;1024px (esperado). |
| `/contato/` | OK | OK | OK | Formulário em `contact-intro`; padding top alinhado ao header fixo. |
| `/clientes/` | OK | OK | OK | Inline mínimo; grades cobertas por CSS. |
| `/sobre/` | OK | OK | OK | |
| `/solutions/chrismedical/` | OK | OK | OK | |
| `/solutions/gasplanos/` | OK | OK | OK | Menu mobile funcional após correção. |
| `/termos-de-uso/`, `/politica-de-privacidade/` | OK | OK | OK | Tokens `--color-white` / `--color-gray-300` mapeados; seção legal com `clamp()` para padding. |
| `/404.html` | OK | OK | OK | Com header fixo + `main-content` existente. |

**Overflow horizontal:** o `body` usa `overflow-x: hidden`, o que pode ocultar barras de rolagem; em revisão não foram encontrados trechos óbvios de largura fixa larga no fluxo principal abaixo de 1024px (hero dashboard permanece `display: none` até `min-width: 1024px`).

## Lighthouse (mobile)

Execução CLI (`npx lighthouse`) **não foi possível** neste ambiente: *No Chrome installations found* no caminho padrão detectável.

**Recomendação:** no Chrome ou Edge instalado localmente, abrir cada URL com DevTools → modo dispositivo → *Lighthouse* → *Mobile*, categorias Performance / Accessibility / Best practices.

## Alterações implementadas (prioridade)

| ID | Área | Mudança |
|----|------|---------|
| P0 | `solutions/gasplanos/index.html` | Menu offcanvas completo; remoção do `alert` no toggle. |
| P0 | `404.html` | Header + menu mobile consistente com o site. |
| P1 | `assets/css/styles.css` | Aliases `--color-white` e `--color-gray-300`; classes `.legal-page-section` e `.legal-text-container`. |
| P1 | `termos-de-uso/`, `politica-de-privacidade/` | Remoção de estilos inline repetidos; uso do bloco legal em CSS. |
| P2 | `.mobile-menu-toggle` | Área mínima ~44×44px para toque (flex + `min-width` / `min-height`). |

## Itens para acompanhamento manual (recomendado)

- Paisagem em 320×568 e 812×375 nas páginas longas (termos, política, sobre).
- Tab/foco visível no menu offcanvas em todos os navegadores alvo.
- Rodar Lighthouse mobile localmente e registrar scores em CI ou na wiki do projeto, se desejado.
