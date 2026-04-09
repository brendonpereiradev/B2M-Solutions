# Design: menu hambúrguer (mobile)

**Data:** 2026-04-09  
**Escopo:** site estático HTML/CSS/JS (B2M Solutions)

## 1. Contexto

- O header fixo (`.site-header`) contém logo e `.header-nav-wrapper` com os links principais e o botão Contato.
- Em viewports abaixo de `768px`, `.header-nav-wrapper` está com `display: none`, portanto **não há navegação no topo no mobile** — apenas o logo.
- O repositório já removeu `assets/css/components/mobile-menu.css` (histórico de tentativa anterior).
- As páginas carregam `styles.min.css` e, quando aplicável, scripts em `assets/js/`.

## 2. Objetivos

- Expor no mobile os **mesmos** itens do desktop: Início, Soluções, Clientes, Sobre nós, divisor visual coerente e **Contato** (botão).
- Apresentação: **drawer deslizando da direita**, com **backdrop** semitransparente sobre o conteúdo.
- **Comportamento unificado:** todas as páginas que usam o header padrão incluem o menu mobile, **incluindo** [`clientes/index.html`](../../../clientes/index.html). Não há exceção por rota.

## 3. Não objetivos (v1)

- Frameworks ou bibliotecas de UI.
- Alterar o layout desktop do header além do necessário para coexistir com o botão hambúrguer no mobile.
- Focus trap completo no drawer (opcional em fase posterior; v1: foco no primeiro link ao abrir e retorno ao botão ao fechar, se viável sem aumentar complexidade demais).

## 4. Decisões de produto (validadas)

| Tema | Decisão |
|------|---------|
| Conteúdo do menu | Igual ao desktop (links + Contato) |
| Padrão visual | Drawer pela direita + backdrop |
| Página Clientes | **Mesmo** menu hambúrguer que nas demais páginas (sem exceção) |

## 5. Adendo histórico (resolvido)

Em implementações anteriores, o hambúrguer costumava aparecer em todas as páginas **exceto** `clientes/index.html`. **Esta versão do design revoga essa exceção:** `clientes/index.html` deve se comportar como as outras páginas com header padrão.

## 6. Abordagem técnica (escolhida)

**Implementação nativa:** HTML semântico + CSS (transições no drawer e no backdrop) + JavaScript enxuto.

**Alternativas descartadas:** `<details>`/`<summary>` (acessibilidade e animação menos previsíveis); dependências de componentes (desnecessárias para HTML estático).

## 7. Comportamento e implementação

### 7.1 Marcação

- Botão de abrir/fechar visível **apenas** abaixo do breakpoint do header (alinhado ao atual `768px`, salvo ajuste mínimo se o CSS já centralizar o breakpoint).
- Atributos: `aria-expanded`, `aria-controls` (id do painel), `aria-label` em português (ex.: “Abrir menu” / “Fechar menu” conforme estado).
- Manter **um único** bloco `.header-nav-wrapper` no DOM com os links e o Contato — evitar duplicar a lista de links.

### 7.2 CSS

- Em mobile: o wrapper deixa de ser apenas `display: none` e passa a ser o **painel drawer** (posição fixa, ancorado à direita, fora da tela quando fechado).
- Backdrop cobrindo a área útil (tipicamente abaixo do header ou full viewport conforme desenho visual), com z-index abaixo do drawer e acima do `main`.
- Estado global (ex.: classe `nav-open` em `document.body` ou no `header`): abre drawer e backdrop; aplicar `overflow: hidden` no `body` para bloquear scroll de fundo.
- Desktop (`min-width: 768px`): sem botão hambúrguer; nav em linha como hoje.

### 7.3 JavaScript

- Alternar classe de estado; atualizar `aria-expanded` e rótulo acessível se necessário.
- Fechar: segundo clique no botão, clique no backdrop, tecla Escape.
- Arquivo dedicado (ex.: `assets/js/mobile-menu.js`) **ou** seção clara em `animations.js` — critério: um único ponto de manutenção; carregar em todas as páginas com o header padrão.

### 7.4 Páginas afetadas

Todas as que replicam o mesmo padrão de header, **incluindo** `clientes/index.html`:

- `index.html`
- `404.html`
- `contato/index.html`
- `sobre/index.html`
- `clientes/index.html`
- `politica-de-privacidade/index.html`
- `termos-de-uso/index.html`
- `solutions/chrismedical/index.html`
- `solutions/gasplanos/index.html`

## 8. Testes manuais sugeridos

- &lt; 768px: abrir, fechar (botão, backdrop, Escape), scroll bloqueado com menu aberto, navegação entre páginas com menu fechado após clique em link.
- ≥ 768px: ausência de hambúrguer; nav horizontal inalterada.
- `clientes/index.html`: mesmo comportamento que `index.html` no mobile.

## 9. Sincronização de assets

- Alterações em `assets/css/styles.css` devem ser refletidas em `assets/css/styles.min.css` (processo de minificação do projeto ou build existente).
