# Design: lightbox do carrossel (G.A.S Planos, mobile-first)

**Data:** 2026-04-09  
**Escopo:** página [`solutions/gasplanos/index.html`](../../../solutions/gasplanos/index.html), CSS global e JS inline ou modular conforme o padrão da página.

## 1. Contexto

- O carrossel (`.sol-carousel`) exibe cinco PNGs em proporção larga (~1912×956), com `object-fit: contain` dentro de `.sol-card-showcase`.
- No mobile, a imagem inteira cabe na largura da tela e o texto dentro do print fica ilegível (“microtexto”).
- A página já possui um modal de arquitetura (`.arch-modal-overlay`) com overlay, botão fechar, clique no fundo e Escape — padrão visual e comportamental a reutilizar na medida do possível.

## 2. Objetivos

- Permitir **leitura ampliada** dos screenshots no mobile (e melhorar a experiência no desktop quando fizer sentido).
- Usar **interação explícita**: toque ou clique na imagem do slide abre uma **vista ampliada** (lightbox) com a mesma `src` do slide ativo.
- Manter **acessibilidade** básica: diálogo modal, foco gerenciável, fechamento por múltiplos meios.
- **Sincronizar** o conteúdo do lightbox com o slide ativo quando o usuário trocar de slide enquanto o lightbox estiver aberto (atualizar `src` e `alt` da imagem ampliada).

## 3. Não objetivos (v1)

- Bibliotecas de carrossel ou lightbox de terceiros.
- **Pinch-zoom customizado** com transformações e gestos em JS (custo alto; o usuário pode usar zoom nativo do sistema no conteúdo ampliado onde o SO/navegador permitir).
- Novos assets ou recortes alternativos dos PNGs (fora do escopo desta especificação).
- Replicar automaticamente o lightbox em **outras** páginas de solutions além de G.A.S Planos, salvo decisão futura explícita.

## 4. Decisões de produto (validadas)

| Tema | Decisão |
|------|---------|
| Abordagem geral | **Opção C:** HTML + CSS + JS — toque/clique abre lightbox |
| Conteúdo ampliado | Mesma imagem do slide atual (`src` / `alt` espelhados) |
| Slide muda com lightbox aberto | **Atualizar** a imagem no lightbox para o slide ativo |
| Desktop | **Abrir lightbox ao clicar na imagem** do slide (comportamento alinhado ao mobile) |

## 5. Abordagem técnica

- **Overlay** dedicado ao lightbox (estrutura separada do modal de arquitetura para evitar conflito de IDs e responsabilidades).
- **Imagem** dentro de um wrapper com `overflow: auto` e limites `max-width` / `max-height` em viewport (ex.: altura útil ~90vh menos cabeçalho do modal), para permitir **rolagem** se a imagem exceder a área.
- **JavaScript:** reutilizar o padrão do modal existente na mesma página (abrir/fechar, `body` com `overflow: hidden` quando ativo, Escape, clique no backdrop). Ao inicializar ou ao trocar slide, se o lightbox estiver aberto, definir `img.src` e `img.alt` a partir do slide `.sol-carousel-slide--active img`.
- **CSS:** classes nomeadas de forma clara (ex. prefixo `showcase-lightbox-` ou similar) para não colidir com `.arch-modal-*`; z-index acima do conteúdo da página e coerente com o modal de arquitetura (definir ordem se ambos puderem existir na mesma sessão — na prática só um visível por vez).

## 6. Acessibilidade

- Container com `role="dialog"`, `aria-modal="true"` e `aria-labelledby` ou `aria-label` em português (ex.: “Imagem do projeto ampliada”).
- Botão fechar com `aria-label` explícito.
- Ao abrir: mover foco para o botão fechar ou para o diálogo; ao fechar: devolver foco ao elemento que abriu (a imagem ou o slide) quando viável.
- Tecla **Escape** fecha o lightbox.

## 7. Arquivos afetados (previstos)

- [`solutions/gasplanos/index.html`](../../../solutions/gasplanos/index.html): marcação do overlay, atributos em imagens se necessário (ex.: `tabindex` ou botão invisível só se a abordagem de foco exigir).
- [`assets/css/styles.css`](../../../assets/css/styles.css) e [`assets/css/styles.min.css`](../../../assets/css/styles.min.css): estilos do lightbox e, se necessário, cursor/estado hover na imagem do carrossel.

## 8. Testes manuais sugeridos

- Mobile: toque na imagem → abre; rolar dentro da área ampliada se a imagem for maior que o viewport; fechar por X, fundo e Escape; trocar slide com lightbox aberto → imagem atualiza.
- Desktop: clique na imagem → mesmo fluxo; carrossel (setas/dots) continua funcional com lightbox fechado.
- Com modal de arquitetura: abrir um modal, depois o outro — garantir que não há sobreposição confusa (tipicamente fechar um antes de abrir o outro ou z-index documentado).

## 9. Referência de implementação na mesma página

- Script e estilos do **modal de arquitetura** (`#arch-modal-overlay`, `#arch-modal-close`, listeners de teclado e clique) servem de referência para consistência de comportamento.
