# Travessão → Vírgula Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir travessão (—) por vírgula em 22 trechos de copy visível e meta descriptions, conforme spec `2026-06-03-travessao-para-virgula-design.md`.

**Architecture:** Edição manual em 5 ficheiros HTML estáticos. Sem CSS/JS. Regra: ` — ` → `, `; manter `alt`, comentários e hífens separadores (`Seg - Sex`).

**Tech Stack:** HTML estático, verificação via `rg` (ripgrep).

**Spec:** `docs/superpowers/specs/2026-06-03-travessao-para-virgula-design.md`

---

### Task 1: `index.html` (7 alterações)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Hero subtitle (linha ~115)**

Substituir:
```html
                        marketing e IA — tudo conectado e funcionando no momento que mais importa: quando você está
```
Por:
```html
                        marketing e IA, tudo conectado e funcionando no momento que mais importa: quando você está
```

- [ ] **Step 2: Section subtitle problemas (linha ~285)**

Substituir:
```html
                    Quando site, servidor ou rede não acompanham, o prejuízo não aparece só na queda — aparece no lead
```
Por:
```html
                    Quando site, servidor ou rede não acompanham, o prejuízo não aparece só na queda, aparece no lead
```

- [ ] **Step 3: Problem card picos (linha ~322)**

Substituir:
```html
                    <p>Justamente quando a campanha está rodando e o tráfego sobe, o site trava — e cada segundo fora do
```
Por:
```html
                    <p>Justamente quando a campanha está rodando e o tráfego sobe, o site trava, e cada segundo fora do
```

- [ ] **Step 4: Service card marketing (linha ~412)**

Substituir:
```html
                        <p>Cuidamos de mídia paga, rastreamento e conversão no mesmo plano — para você saber exatamente
```
Por:
```html
                        <p>Cuidamos de mídia paga, rastreamento e conversão no mesmo plano, para você saber exatamente
```

- [ ] **Step 5: Service card chatbot (linha ~434)**

Substituir:
```html
                        <p>Atende, qualifica e responde a qualquer hora — sem depender de formulário estático ou de alguém
```
Por:
```html
                        <p>Atende, qualifica e responde a qualquer hora, sem depender de formulário estático ou de alguém
```

- [ ] **Step 6: Service card AWS (linha ~456)**

Substituir:
```html
                                <p>Infraestrutura que escala quando o tráfego sobe, com backup e monitoramento contínuo —
                                    para você passar menos tempo apagando incêndio e mais tempo evoluindo o negócio.</p>
```
Por:
```html
                                <p>Infraestrutura que escala quando o tráfego sobe, com backup e monitoramento contínuo,
                                    para você passar menos tempo apagando incêndio e mais tempo evoluindo o negócio.</p>
```

- [ ] **Step 7: CTA final (linha ~498)**

Substituir:
```html
                    A primeira conversa é nossa. Sem compromisso — só um bate-papo honesto sobre onde sua operação está
```
Por:
```html
                    A primeira conversa é nossa. Sem compromisso, só um bate-papo honesto sobre onde sua operação está
```

---

### Task 2: `clientes/index.html` (2 alterações)

**Files:**
- Modify: `clientes/index.html`

- [ ] **Step 1: Hero (linha ~106)**

Substituir:
```html
                    Aqui você vê o que foi feito, por que foi feito assim e o que mudou depois — não só o nome do cliente
```
Por:
```html
                    Aqui você vê o que foi feito, por que foi feito assim e o que mudou depois, não só o nome do cliente
```

- [ ] **Step 2: Card ChrisMedical (linha ~122)**

Substituir:
```html
                    <p class="sol-card-description">Como estruturamos o funil de aquisição de uma empresa do setor de saúde — do anúncio até a conversão rastreada.</p>
```
Por:
```html
                    <p class="sol-card-description">Como estruturamos o funil de aquisição de uma empresa do setor de saúde, do anúncio até a conversão rastreada.</p>
```

---

### Task 3: `sobre/index.html` (6 alterações)

**Files:**
- Modify: `sobre/index.html`

- [ ] **Step 1: og:description (linha ~14)**

Substituir:
```html
        content="Site, AWS e GA4/GTM no mesmo time. Priorizamos produção estável antes de feature nova — com critérios claros de deploy e medição.">
```
Por:
```html
        content="Site, AWS e GA4/GTM no mesmo time. Priorizamos produção estável antes de feature nova, com critérios claros de deploy e medição.">
```

- [ ] **Step 2: Metodologia etapa 2 (linha ~157)**

Substituir:
```html
                        Com o cenário claro, definimos o que vai ser feito, em que ordem e por quê — integrando marketing,
```
Por:
```html
                        Com o cenário claro, definimos o que vai ser feito, em que ordem e por quê, integrando marketing,
```

- [ ] **Step 3: Metodologia etapa 4 (linha ~175)**

Substituir:
```html
                        Acompanhamos o que acontece depois do deploy. Monitoramos, ajustamos e iteramos — para os ganhos
```
Por:
```html
                        Acompanhamos o que acontece depois do deploy. Monitoramos, ajustamos e iteramos, para os ganhos
```

- [ ] **Step 4: Bio Brendon (linha ~198)**

Substituir:
```html
                            Brendon cuida de tudo que envolve o navegador e o servidor — do site que o cliente vê até a
```
Por:
```html
                            Brendon cuida de tudo que envolve o navegador e o servidor, do site que o cliente vê até a
```

- [ ] **Step 5: Bio Matheus (linha ~215)**

Substituir:
```html
                            de verdade — ajustando criativo, público e orçamento com base em resultado, não só em impressões.
```
Por:
```html
                            de verdade, ajustando criativo, público e orçamento com base em resultado, não só em impressões.
```

- [ ] **Step 6: CTA (linha ~233)**

Substituir:
```html
                    negócio — sem enrolação.
```
Por:
```html
                    negócio, sem enrolação.
```

---

### Task 4: `solutions/chrismedical/index.html` (4 alterações)

**Files:**
- Modify: `solutions/chrismedical/index.html`

- [ ] **Step 1: meta description (linha ~8)**

Substituir:
```html
    <meta name="description" content="ChrisMedical: funil B2B em produtos hospitalares — Ads com público certo, GA4/GTM e medição alinhada à campanha.">
```
Por:
```html
    <meta name="description" content="ChrisMedical: funil B2B em produtos hospitalares, Ads com público certo, GA4/GTM e medição alinhada à campanha.">
```

- [ ] **Step 2: Card desc (linha ~135)**

Substituir:
```html
                            <p class="sol-card-desc">Como ajudamos a ChrisMedical a estruturar a aquisição B2B — com
```
Por:
```html
                            <p class="sol-card-desc">Como ajudamos a ChrisMedical a estruturar a aquisição B2B, com
```

- [ ] **Step 3: Timeline 1 (linha ~196)**

Substituir:
```html
                                digital — e os anúncios atraíam público errado, longe do perfil B2B do setor de saúde.</p>
```
Por:
```html
                                digital, e os anúncios atraíam público errado, longe do perfil B2B do setor de saúde.</p>
```

- [ ] **Step 4: Timeline 2 (linha ~212)**

Substituir:
```html
                                rastreamento — para nenhuma conversão se perder no caminho.</p>
```
Por:
```html
                                rastreamento, para nenhuma conversão se perder no caminho.</p>
```

---

### Task 5: `solutions/gasplanos/index.html` (3 alterações)

**Files:**
- Modify: `solutions/gasplanos/index.html`

- [ ] **Step 1: Card desc (linhas ~139–140)**

Substituir:
```html
                            <p class="sol-card-desc">Como estruturamos a captação online de uma operadora de planos de saúde
                                — com página rápida, anúncios e rastreamento funcionando como uma coisa só.</p>
```
Por:
```html
                            <p class="sol-card-desc">Como estruturamos a captação online de uma operadora de planos de saúde,
                                com página rápida, anúncios e rastreamento funcionando como uma coisa só.</p>
```

- [ ] **Step 2: Timeline 1 (linha ~275)**

Substituir:
```html
                            <p class="sol-timeline-text">A empresa não existia no digital — e enquanto isso, concorrentes
```
Por:
```html
                            <p class="sol-timeline-text">A empresa não existia no digital, e enquanto isso, concorrentes
```

- [ ] **Step 3: Timeline 2 (linha ~292)**

Substituir:
```html
                                dispositivo, com mídia paga e rastreamento configurados juntos — para cada clique virar dado
```
Por:
```html
                                dispositivo, com mídia paga e rastreamento configurados juntos, para cada clique virar dado
```

---

### Task 6: Verificação final

**Files:**
- Test: todos os `*.html` na raiz e subpastas

- [ ] **Step 1: Confirmar que copy visível/meta não tem travessão**

Run (PowerShell, na raiz do repo):
```powershell
rg "—" --glob "*.html"
```
Expected: apenas ocorrências em `alt=` em `solutions/gasplanos/index.html` (6 linhas) e comentário em `404.html` (1 linha).

- [ ] **Step 2: Confirmar hífens separadores intactos**

Run:
```powershell
rg "Seg - Sex" --glob "*.html"
```
Expected: 9 ocorrências (menu mobile em todas as páginas principais).

- [ ] **Step 3: Revisão visual opcional**

Abrir no browser local (`http://127.0.0.1:5500/`):
- `/`
- `/clientes/`
- `/sobre/`
- `/solutions/chrismedical/`
- `/solutions/gasplanos/`

Confirmar pontuação com vírgula nos parágrafos alterados; layout inalterado.
