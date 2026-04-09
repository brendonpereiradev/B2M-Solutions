# Clientes — reveal dos cards showcase (scroll sync)

**Data:** 2026-04-09  
**Estado:** aprovado para implementação (planeamento em seguida)

## Contexto

Na página `/clientes/`, os cards ChrisMedical e G.A.S Planos usam `sol-showcase-card` com classes `reveal` e `delay-100` / `delay-200`. O comportamento global de reveal vem de `assets/js/animations.js` (`IntersectionObserver` com `threshold: 0.15` e `rootMargin: 0px 0px -50px 0px`) e de regras CSS específicas em `.sol-showcase-card.reveal` (entrada com translate, scale e blur).

## Objetivo

Melhorar a **sincronia com o scroll**: o efeito deve disparar um pouco **mais cedo**, mantendo um **escalonamento claro** entre o primeiro e o segundo card, **sem** alterar o timing dos outros `.reveal` do site (home, sobre, soluções, CTA, etc.).

## Comportamento desejado

1. **Observer dedicado ou preset**  
   Elementos marcados com um identificador estável (por exemplo classe `reveal--showcase` ou atributo `data-reveal-preset="showcase"`) são observados com opções distintas do conjunto por defeito.

2. **Parâmetros de partida (afináveis)**  
   - `threshold`: entre `0.08` e `0.12` (disparo ligeiramente mais sensível que `0.15`).  
   - `rootMargin`: por exemplo `0px 0px -15% 0px` ou equivalente em `px` (ex. `-80px` em viewports médias) para ativar quando a secção entra “mais cedo” no viewport.  
   Valores finos podem ser ajustados após teste em desktop e mobile, mantendo a intenção (mais cedo que o default global).

3. **Delays entre cards**  
   Aumentar ligeiramente o espaçamento temporal após `.active`, por exemplo **120ms** e **280ms** no primeiro e segundo card (em vez de 100ms e 200ms), usando classes `delay-*` já existentes ou novas utilitárias se necessário, sem duplicar regras desnecessárias.

4. **Acessibilidade**  
   Respeitar `prefers-reduced-motion`: reutilizar os overrides existentes para `.sol-showcase-card.reveal` em `styles.css` / `styles.min.css`; o JS não deve forçar animações extra além de adicionar `.active`.

## Fora de âmbito

- Alterar o aspeto do hover dos cards (bordas, sombra, lift).  
- Mudar copy ou estrutura HTML além do necessário para o preset e delays.  
- Unificar todos os reveals do site num único critério global (explicitamente excluído).

## Ficheiros previstos

| Ficheiro | Alteração |
|----------|-----------|
| `clientes/index.html` | Marcar os dois links `sol-showcase-card` com o preset; ajustar classes de delay. |
| `assets/js/animations.js` | Registar observer(s): default inalterado para `.reveal` sem preset; opções alternativas para elementos com preset. |
| `assets/css/styles.css` | Se necessário, utilitários de delay ou ajuste fino às transições dos showcase cards. |
| `assets/css/styles.min.css` | Regenerar ou espelhar alterações CSS, conforme prática do repositório. |

## Critérios de aceitação

- [ ] Apenas os dois cards na página Clientes usam o novo critério de interseção; outros `.reveal` mantêm o comportamento atual.  
- [ ] A animação de entrada dos cards começa perceptivelmente mais cedo no scroll do que antes, em desktop e mobile.  
- [ ] O segundo card anima depois do primeiro, com intervalo legível (escalonamento).  
- [ ] Com `prefers-reduced-motion: reduce`, os cards aparecem sem animação problemática (consistente com o resto do site).  
- [ ] Sem regressões de JS (sem erros na consola; observer desliga após `unobserve` como hoje).

## Self-review (spec)

- Sem placeholders TBD.  
- Âmbito limitado a Clientes + infraestrutura de preset reutilizável.  
- Parâmetros numéricos são de partida, não contradição: ajuste fino documentado como aceitável após QA visual.
