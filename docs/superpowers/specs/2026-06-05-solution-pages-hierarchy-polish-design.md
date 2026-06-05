# Design: hierarquia editorial nas páginas de solução (ChrisMedical + G.A.S Planos)

**Data:** 2026-06-05  
**Escopo:** [`solutions/chrismedical/index.html`](../../../solutions/chrismedical/index.html), [`solutions/gasplanos/index.html`](../../../solutions/gasplanos/index.html), [`assets/css/styles.css`](../../../assets/css/styles.css) e [`assets/css/styles.min.css`](../../../assets/css/styles.min.css).

## 1. Contexto

As páginas de case study usam `.sol-card-header.sol-card-header--centered` com `min-height: calc(100vh - 5rem)`, alinhamento central e empilhamento de categorias, título, descrição, meta, tech bar e showcase com peso visual semelhante. O visitante que chega de `/clientes/` já conhece o cliente; a hierarquia atual não prioriza a narrativa do case.

**Direção aprovada:** narrativa primeiro (B) + split editorial no desktop (C).

## 2. Restrições (obrigatórias)

| Restrição | Significado |
|-----------|-------------|
| **Sem elementos novos** | Nenhuma tag HTML adicional, nenhum widget novo (carrossel, modal, lightbox, timeline etc. permanecem como estão). |
| **Sem alteração de texto** | Copy, labels, `alt`, metadados e CTAs permanecem byte-a-byte iguais. |
| **Só polish** | CSS, reparenting de nós existentes no DOM, remoção de estilos inline redundantes, correção estrutural mínima (fechamento de tags). |

## 3. Objetivos

- Estabelecer hierarquia clara: **narrativa → evidência visual → detalhes técnicos → história (timeline) → CTA**.
- Eliminar o hero fullscreen centralizado que empurra o showcase e a timeline para baixo da dobra.
- Unificar a apresentação entre ChrisMedical e G.A.S Planos (mesma ordem e pesos; diferença apenas no conteúdo do showcase).
- Manter comportamento existente do carrossel, modal AWS e lightbox na página G.A.S Planos.

## 4. Não objetivos

- Novos componentes ou seções.
- Mudança de copy ou SEO.
- Replicar padrões destas páginas em outras rotas do site.
- Refatoração ampla de `animations.js` ou `mobile-menu.js`.

## 5. Hierarquia de camadas

| Camada | Peso | Seletores existentes |
|--------|------|----------------------|
| Primária | Alto | `.sol-card-categories-text`, `.sol-card-title`, `.sol-card-desc` |
| Secundária | Médio | `.sol-card-showcase` |
| Terciária | Baixo | `.sol-card-meta`, `.sol-hero-actions` (G.A.S), `.sol-card-tech-bar` |
| Prova | Mantido | `.sol-card-timeline` |
| Conversão | Mantido | `.cta-section` |

## 6. Layout do hero

### 6.1 Remover comportamento fullscreen centralizado

Sobrescrever ou substituir regras de `.sol-card-header.sol-card-header--centered`:

- Remover `min-height: calc(100vh - 5rem)`.
- `text-align: left` no bloco de informação (não centralizar).
- `justify-content: flex-start` no header; padding vertical confortável (`~2.5rem` mobile, `~3rem` desktop).
- `.solution-back-link`: alinhado à esquerda, `margin-bottom` consistente.

### 6.2 Desktop (≥1024px)

- Grid `grid-template-columns: 1fr 1.25fr` em `.sol-card-header` (reutilizar proporção já usada pelo layout não-centralizado).
- Coluna esquerda: back link + bloco narrativo (categorias, título, descrição) + meta/ações/tech empilhados abaixo da descrição, alinhados à esquerda.
- Coluna direita: `.sol-card-showcase` alinhado ao centro vertical do grid.
- Em viewports largas, o showcase ocupa a coluna direita; meta/tech podem permanecer na coluna esquerda abaixo da descrição (não competem com o visual).

### 6.3 Mobile (&lt;1024px)

Ordem de leitura desejada:

1. Voltar para Clientes  
2. Categoria(s) + título + descrição  
3. Showcase  
4. Meta  
5. Ações do hero (G.A.S)  
6. Tech bar  

## 7. Reordenação do DOM (sem tags novas)

Hoje `.sol-card-meta`, `.sol-hero-actions` e `.sol-card-tech-bar` ficam dentro de `.sol-card-info`, entre a descrição e o showcase (irmão seguinte).

**Ação:** reparentar esses nós para filhos diretos de `.sol-card-header`, **após** `.sol-card-showcase`, nesta ordem:

```
.sol-card-header
  ├── .solution-back-link
  ├── .sol-card-info          (apenas: categories, title, desc)
  ├── .sol-card-showcase
  ├── .sol-card-meta
  ├── .sol-hero-actions       (somente G.A.S Planos)
  └── .sol-card-tech-bar
```

`.sol-card-info` retém somente os três primeiros blocos narrativos. Nenhum texto ou atributo de conteúdo é alterado.

### ChrisMedical

- Mover `.sol-card-meta` e `.sol-card-tech-bar` para fora de `.sol-card-info`, após `.sol-card-showcase`.
- Migrar estilos inline de `.sol-card-showcase` e da `img` interna para regras CSS em `.sol-card-showcase` / variante existente (sem mudar `src`, `alt`, `width`, `height`).

### G.A.S Planos

- Mesma reordenação, incluindo `.sol-hero-actions`.
- Corrigir fechamento extra de `</div>` após o header (~linha 259 no HTML atual) que quebra a árvore do `.sol-card`.

## 8. Tipografia e peso visual (CSS)

Aplicar em `.sol-card-header--centered` ou substituir o modificador por regras no contexto `.solution-reading-container .sol-card-header`:

| Seletor | Ajuste |
|---------|--------|
| `.sol-card-categories-text` | `font-size: ~0.75rem`, `letter-spacing` reduzido, opacidade ~0.7 |
| `.sol-card-title` | Manter destaque; em mobile evitar tamanho excessivo que compete com a descrição |
| `.sol-card-desc` | Protagonista: `font-size: 1.0625rem` mobile / `1.125rem` desktop, cor `rgba(255,255,255,0.85)`, `line-height: 1.75`, `max-width: 40rem` |
| `.sol-card-meta` | `font-size: ~0.875rem`, opacidade ~0.45, `margin-top` reduzido |
| `.sol-tech-bar-item` | `font-size: ~0.8rem`, cor `rgba(255,255,255,0.5)`, gaps menores |
| `.sol-hero-actions` | `justify-content: flex-start` no desktop; após showcase no mobile |

Remover regras que forçam `align-items: center` e `justify-content: center` em meta, tech bar e listas dentro do header centralizado.

## 9. Timeline e CTA

- Adicionar `margin-top` entre o bloco hero (header + meta/ações/tech reordenados) e `.sol-card-timeline` para separar “apresentação” de “história”.
- Timeline: sem mudança de estrutura, copy ou ícones.
- `.cta-section`: inalterada em HTML e texto.

## 10. Regressão e comportamento preservado

| Funcionalidade | Página | Expectativa |
|----------------|--------|-------------|
| Carrossel autoplay e navegação | G.A.S | Intacto |
| Lightbox nos slides | G.A.S | Intacto |
| Modal arquitetura AWS | G.A.S | Intacto; botões `#btn-open-arch-modal` inalterados |
| Reveal animations | Ambas | Classes `reveal` / `delay-*` preservadas |
| Link voltar | Ambas | `/clientes/` inalterado |

## 11. Arquivos afetados

| Arquivo | Mudanças |
|---------|----------|
| `assets/css/styles.css` | Overrides de `--centered`, tipografia, grid, espaçamentos, showcase ChrisMedical |
| `assets/css/styles.min.css` | Regenerar ou espelhar minificação |
| `solutions/chrismedical/index.html` | Reparenting; remoção de inline styles |
| `solutions/gasplanos/index.html` | Reparenting; correção de `</div>` extra |

## 12. Testes manuais

- [ ] Mobile: descrição lida antes de meta/tech; showcase visível com pouco scroll.
- [ ] Desktop: split texto (esquerda) / visual (direita).
- [ ] ChrisMedical e G.A.S com mesma ordem de camadas.
- [ ] Nenhum texto visível alterado (diff de HTML só em estrutura/atributos de layout).
- [ ] G.A.S: carrossel, lightbox, modal AWS e botões “Visite o site” / “Ver Arquitetura” funcionando.
- [ ] Viewports: 375px, 768px, 1024px, 1440px.

## 13. Decisões registradas

| Tema | Decisão |
|------|---------|
| Direção de hierarquia | B (narrativa primeiro) + C (split desktop) |
| Elementos novos | Proibidos |
| Texto | Proibido alterar |
| Ordem mobile | Reparenting de nós existentes após showcase |
| Modificador `--centered` | Comportamento neutralizado via CSS; classe pode permanecer no HTML para diff mínimo |
