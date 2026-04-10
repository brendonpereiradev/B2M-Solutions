# Remoção de conteúdo de infraestrutura física (escopo A)

**Data:** 2026-04-10  
**Status:** aprovado para implementação após revisão deste documento  
**Escopo acordado:** Remover apenas o que descreve **infraestrutura no local** (redes no cliente, cabeamento, Wi‑Fi físico, visitas para isso). **Manter** hospedagem AWS, nuvem e menções genéricas a “infraestrutura” nesse sentido.

---

## 1. Objetivo

O site deixa de promover ou descrever o serviço de infraestrutura física; a oferta comunicada alinha-se a sites, marketing digital, IA, hospedagem/nuvem AWS e integração — sem promessas de projeto ou manutenção de rede cabeada/Wi‑Fi no cliente.

---

## 2. Arquivos a alterar

| Arquivo | Ação |
|---------|------|
| `index.html` | Remover card “Infraestrutura física”; ajustar label do terceiro micro-stat do hero (ver §4). |
| `sobre/index.html` | Atualizar foco e bio de Matheus Izaias; JSON-LD só se algum campo ainda contradizer o texto final (hoje não cita rede física). |
| `docs/readme.md` | Remover bullet “Infraestrutura Física” ou substituir por linha só de nuvem/AWS, conforme §5. |
| `assets/css/styles.css` | Opcional: remover regras `.service-card-accent--blue` e `.service-icon--blue` e o seletor `:has(.service-card-accent--blue)` se deixarem de ser usados. |
| `assets/css/styles.min.css` | Manter em sincronia com `styles.css` se a limpeza de CSS for feita. |

**Fora do escopo:** `politica-de-privacidade/`, `termos-de-uso/`, cases (`solutions/`), metadados que falam de “infraestrutura AWS” — sem mudança salvo texto que **prometa** instalação física (não identificado).

---

## 3. Remoções obrigatórias (HTML)

- Em `index.html`, excluir o bloco completo comentado como `Service 4: Infraestrutura Física` (card com título “Infraestrutura física”, parágrafo sobre redes locais, Cat6/fibra e Wi‑Fi corporativo, e `service-impact` associado).

---

## 4. Texto sugerido — `index.html` (hero, terceiro stat)

Manter `stat-value`: **Infraestrutura** (coerente com nuvem).

**Label (`stat-label`) — escolher uma:**

- **Opção A (recomendada):** `Hospedagem & escala na AWS`
- **Opção B:** `Cloud e continuidade na AWS`

---

## 5. Texto sugerido — `sobre/index.html` (Matheus Izaias)

**Linha de foco (`founder-focus`) — escolher uma:**

- **Opção A (recomendada):** `Co-fundador · Marketing digital e performance de campanhas`
- **Opção B:** `Co-fundador · Marketing digital e mensuração`

**Bio (`founder-bio`) — escolher uma:**

- **Opção A (recomendada):**  
  Matheus conduz as campanhas do início ao fim e acompanha de perto o que os números estão dizendo de verdade — ajustando criativo, público e orçamento com base em resultado, não só em impressões.

- **Opção B:**  
  Matheus conduz as campanhas do início ao fim e olha para conversão e custo por resultado: testa hipóteses, reduz desperdício e deixa claro o que está puxando performance e o que só ocupa relatório.

---

## 6. `docs/readme.md`

- **Remover** o bullet que lista “Infraestrutura Física” com rede local, Wi‑Fi e cabeamento **ou**
- **Substituir** por uma linha alinhada ao site atual, por exemplo: **Nuvem / AWS:** hospedagem, escala e continuidade (ajustar redação à lista real de serviços).

---

## 7. CSS opcional

Se nenhum outro elemento usar `service-card-accent--blue` ou `service-icon--blue`, remover estilos órfãos em `styles.css` e regenerar/atualizar `styles.min.css` pelo processo já usado no projeto.

---

## 8. Verificação

- Busca no repositório por: `infraestrutura física`, `cabeamento`, `Cat6`, `Redes Locais`, `Wi‑Fi corporativo` (e variantes) — deve retornar zero em conteúdo publicável (HTML principal e readme se aplicável).
- Revisão visual: home (grade de serviços com um card a menos) e página Sobre.

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| Grade de serviços com “buraco” visual | CSS já é grid flexível; validar mobile/desktop; animações `delay-*` podem ser ajustadas só se algo parecer desbalanceado. |
| Tom da bio do Matheus | Escolher opção A ou B (ou combinar frases) antes de publicar. |

---

## 10. Próximo passo

Após você validar este arquivo, criar o plano de implementação detalhado (skill `writing-plans`): edits arquivo a arquivo, opções de texto finais escolhidas, e passo de build/minify se aplicável.
