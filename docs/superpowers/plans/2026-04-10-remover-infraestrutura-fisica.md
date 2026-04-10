# Remover infraestrutura física do site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar do site institucional todo conteúdo que promove infraestrutura física (rede no cliente, cabeamento, Wi‑Fi local), mantendo nuvem/AWS e copy genérica de infraestrutura nesse sentido, conforme [2026-04-10-remover-infraestrutura-fisica-design.md](../specs/2026-04-10-remover-infraestrutura-fisica-design.md).

**Architecture:** Edits pontuais em HTML estático (`index.html`, `sobre/index.html`), um bullet em `docs/readme.md`, remoção de regras CSS só usadas pelo card removido em `assets/css/styles.css`, regeneração de `assets/css/styles.min.css` a partir do CSS fonte. Sem alteração de rotas, build pipeline ou JavaScript.

**Tech Stack:** HTML5, CSS3 (vanilla), site estático sem `package.json`; minificação via CLI opcional (Node/npx).

**Nota:** Commits ao repositório só quando o cliente solicitar explicitamente; as etapas de commit abaixo são opcionais.

---

## File map

| File | Responsibility |
|------|------------------|
| `index.html` | Home: micro-stat do hero + grade de serviços (remover card físico). |
| `sobre/index.html` | Perfil do co-fundador Matheus Izaias (foco + bio). |
| `docs/readme.md` | Lista interna de soluções (remover bullet de infra física). |
| `assets/css/styles.css` | Fonte de estilos; remover variantes `--blue` órfãs após remoção do card. |
| `assets/css/styles.min.css` | Artefato minificado; deve refletir `styles.css`. |

**Texto fechado (opções A do spec):** label do hero `Hospedagem & escala na AWS`; Matheus `Co-fundador · Marketing digital e performance de campanhas` + bio opção A. Para usar opção B em qualquer trecho, substituir apenas as strings indicadas no spec.

---

### Task 1: `index.html` — hero stat + remoção do card de infraestrutura física

**Files:**
- Modify: `index.html` (aprox. linhas 125–141 e 443–462)

- [ ] **Step 1: Atualizar o terceiro micro-stat do hero**

Localizar o bloco:

```html
                        <div>
                            <p class="stat-value">Infraestrutura</p>
                            <p class="stat-label">Redes Locais & Cloud AWS</p>
                        </div>
```

Substituir por:

```html
                        <div>
                            <p class="stat-value">Infraestrutura</p>
                            <p class="stat-label">Hospedagem & escala na AWS</p>
                        </div>
```

- [ ] **Step 2: Remover o card inteiro “Service 4: Infraestrutura Física”**

Apagar do comentário `<!-- Service 4: Infraestrutura Física -->` até o `</div>` de fechamento desse card (imediatamente antes de `<!-- Service 5: Hospedagem AWS`), ou seja, remover exatamente este bloco:

```html
                    <!-- Service 4: Infraestrutura Física -->
                    <div class="reveal delay-100 service-card">
                        <div class="service-card-accent service-card-accent--blue"></div>
                        <div class="service-icon service-icon--blue">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                                <line x1="6" y1="18" x2="6.01" y2="18"></line>
                            </svg>
                        </div>
                        <h3>Infraestrutura física</h3>
                        <p>Redes locais, cabeamento Cat6/fibra e Wi‑Fi corporativo com cobertura planejada. Menos queda
                            e pontos cegos na sua rede.</p>
                        <div class="service-impact">
                            Menos chamado de “a internet caiu” no meio do <span class="highlight--blue">dia</span>.
                        </div>
                    </div>

```

O comentário seguinte `<!-- Service 5: Hospedagem AWS` deve permanecer; não é necessário renumerar comentários de serviço.

- [ ] **Step 3: Verificação rápida neste arquivo**

Executar no diretório raiz do repositório (PowerShell):

```powershell
Select-String -Path "index.html" -Pattern "Infraestrutura física|cabeamento|Cat6|Redes [Ll]ocais|highlight--blue|service-card-accent--blue" -SimpleMatch
```

**Esperado:** nenhuma linha retornada (lista vazia). Se `Select-String` acusar falso positivo por `-SimpleMatch` com padrões fracos, usar em vez disso busca manual ou `rg` com regex:

```powershell
rg -n "Infraestrutura física|cabeamento|Cat6|Redes locais|service-card-accent--blue|highlight--blue" index.html
```

**Esperado:** sem saída.

---

### Task 2: `sobre/index.html` — Matheus Izaias (foco + bio)

**Files:**
- Modify: `sobre/index.html` (aprox. linhas 210–216)

- [ ] **Step 1: Substituir foco e bio**

Localizar:

```html
                        <p class="founder-focus">Co-fundador • Marketing digital e infraestrutura física</p>
                        <p class="founder-bio">
                            Matheus conduz as campanhas do início ao fim e acompanha de perto o que os números estão dizendo
                            de verdade. Quando o problema é físico — rede, cabeamento, equipamento — é ele quem vai até o
                            cliente resolver.
                        </p>
```

Substituir por:

```html
                        <p class="founder-focus">Co-fundador · Marketing digital e performance de campanhas</p>
                        <p class="founder-bio">
                            Matheus conduz as campanhas do início ao fim e acompanha de perto o que os números estão dizendo
                            de verdade — ajustando criativo, público e orçamento com base em resultado, não só em impressões.
                        </p>
```

- [ ] **Step 2: Confirmar JSON-LD**

No final de `sobre/index.html`, o bloco `application/ld+json` já lista Matheus com `"jobTitle": "Co-fundador - Sites, Conversão e Tracking"`. **Não alterar** salvo decisão explícita de alinhar `jobTitle` ao novo foco (fora do escopo mínimo deste plano).

- [ ] **Step 3: Verificação neste arquivo**

```powershell
rg -n "infraestrutura física|cabeamento|equipamento —|rede" sobre/index.html
```

**Esperado:** nenhuma correspondência para `infraestrutura física`, `cabeamento`, ou a frase antiga sobre problema físico. Se `rede` aparecer em outro contexto (improvável), confirmar manualmente que não é rede local no cliente.

---

### Task 3: `docs/readme.md` — remover bullet de infraestrutura física

**Files:**
- Modify: `docs/readme.md` (seção “Soluções Oferecidas”)

- [ ] **Step 1: Apagar a linha do bullet físico**

Remover inteiramente a linha:

```markdown
- **Infraestrutura Física:** Estruturação avançada de rede local, WiFi corporativo de alta performance e cabeamento estruturado.
```

Manter a linha seguinte de **Hospedagem AWS (Cloud)** sem alteração.

- [ ] **Step 2: Verificação**

```powershell
rg -n "Infraestrutura Física|rede local|WiFi corporativo|cabeamento" docs/readme.md
```

**Esperado:** sem saída.

---

### Task 4: `assets/css/styles.css` — remover estilos azuis só usados pelo card removido

**Files:**
- Modify: `assets/css/styles.css` (aprox. linhas 2172–2174, 2246–2252, 2283–2285, 2317–2320)

- [ ] **Step 1: Remover o mapeamento de accent azul no `:has`**

Apagar este bloco:

```css
.service-card:has(.service-card-accent--blue) {
    --service-accent-rgb: 59, 130, 246;
}

```

- [ ] **Step 2: Remover `.service-card-accent--blue` e hover**

Apagar:

```css
.service-card-accent--blue {
    background-color: rgba(59, 130, 246, 0.05);
}

.service-card:hover .service-card-accent--blue {
    background-color: rgba(59, 130, 246, 0.1);
}

```

- [ ] **Step 3: Remover `.service-icon--blue`**

Apagar:

```css
.service-icon--blue {
    color: var(--color-blue);
}

```

- [ ] **Step 4: Remover `.service-impact .highlight--blue`**

Apagar:

```css
.service-impact .highlight--blue {
    color: var(--color-blue);
    font-weight: 700;
}

```

- [ ] **Step 5: Confirmar que não há referências HTML restantes**

```powershell
rg -n "service-card-accent--blue|service-icon--blue|highlight--blue" --glob "*.html" .
```

**Esperado:** sem saída em ficheiros HTML (o design spec em `docs/superpowers/specs/` pode ignorar-se).

---

### Task 5: `assets/css/styles.min.css` — sincronizar com `styles.css`

**Files:**
- Modify: `assets/css/styles.min.css`

- [ ] **Step 1: Regenerar minificado a partir da fonte**

No diretório raiz do repositório, com Node.js instalado:

```powershell
npx --yes clean-css-cli -o "assets/css/styles.min.css" "assets/css/styles.css"
```

**Esperado:** comando termina sem erro; `assets/css/styles.min.css` é reescrito.

- [ ] **Step 2 (Sem Node):** Se `npx` não estiver disponível, aplicar as mesmas remoções de texto do Task 4 manualmente em `styles.min.css` (procurar por `service-card-accent--blue`, `service-icon--blue`, `highlight--blue` dentro de regras equivalentes) **ou** copiar o conteúdo de `styles.css` para uma ferramenta minificadora online e substituir o ficheiro — garantir que o resultado é uma única linha/minificação consistente.

- [ ] **Step 3: Sanity check**

```powershell
rg -c "service-card-accent--blue" assets/css/styles.min.css
```

**Esperado:** contagem 0 (ou comando sem linhas).

---

### Task 6: Verificação global e revisão visual

**Files:** nenhum (validação)

- [ ] **Step 1: Grep nos artefatos publicáveis**

```powershell
rg -n "infraestrutura física|cabeamento|Cat6|Redes [Ll]ocais|Wi[-\u2011]?Fi corporativo" index.html sobre/index.html docs/readme.md
```

**Esperado:** sem saída.

- [ ] **Step 2: Revisão visual**

Abrir `http://127.0.0.1:5500/` (home) e `http://127.0.0.1:5500/sobre/` (se o servidor já estiver rodando; caso contrário, iniciar conforme convenção do projeto). Confirmar: três cards de serviço antes do card wide AWS; hero com terceiro stat “Hospedagem & escala na AWS”; página Sobre com Matheus sem menção a rede/cabeamento no local.

---

## Spec coverage (self-review)

| Secção do spec | Task |
|----------------|------|
| §3 Remoção do card em `index.html` | Task 1 |
| §4 Hero `stat-label` opção A | Task 1 |
| §5 Matheus opção A | Task 2 |
| §6 `docs/readme.md` (remover bullet) | Task 3 |
| §7 CSS opcional | Tasks 4–5 |
| §8 Verificação | Tasks 1–3 (parcial), `6` |

**Gap:** Nenhum requisito obrigatório sem task. JSON-LD explicitamente “só se contradizer” — sem task; condição não satisfeita após leitura do arquivo.

**Placeholder scan:** Nenhum TBD/TODO no plano.

---

## Commit (opcional)

Quando o cliente autorizar:

```bash
git add index.html sobre/index.html docs/readme.md assets/css/styles.css assets/css/styles.min.css
git commit -m "feat: remove infraestrutura física do site institucional"
```

---

## Execution handoff

**Plano gravado em `docs/superpowers/plans/2026-04-10-remover-infraestrutura-fisica.md`. Duas formas de execução:**

1. **Subagent-Driven (recomendado)** — um subagente por task, revisão entre tasks; usar a sub-skill **subagent-driven-development**.

2. **Inline Execution** — executar as tasks nesta sessão com checkpoints; usar **executing-plans**.

**Qual abordagem prefere?**
