# Design: Travessão → vírgula em textos descritivos

## 1. Objetivo

Padronizar a pontuação dos textos descritivos do site B2M Solutions: substituir travessão (—) por vírgula (`,`) em copy visível e meta descriptions, mantendo hífens usados como separadores (ex.: `Seg - Sex`) e demais hífens técnicos intactos.

## 2. Contexto

O site usa travessão (—) com frequência em parágrafos descritivos para marcar continuação ou contraste (“…depois — não só…”). A direção editorial acordada é trocar por vírgula, alinhando tom e pontuação em todas as páginas de conteúdo.

Alternativa **B** acordada: incluir texto visível e meta descriptions; excluir textos `alt`, comentários HTML/CSS e hífens separadores.

## 3. Abordagem escolhida

**Substituição manual arquivo a arquivo** com revisão frase a frase.

Rejeitadas:
- **Busca/substituição global** ` — ` → `, ` — arriscaria `alt`, comentários e trechos fora de escopo.
- **Centralização de copy em JSON/partials** — over-engineering para site estático HTML puro.

## 4. Regra de substituição

| Padrão | Substituição |
|--------|--------------|
| ` — ` (espaço + travessão + espaço) | `, ` (vírgula + espaço) |
| Travessão no início de linha após quebra HTML | Unir à frase anterior com vírgula (remover quebra desnecessária se couber) |

**Não alterar:**
- Hífens separadores: `Seg - Sex`, `Co-fundador - Infraestrutura` (JSON-LD)
- Palavras compostas: `Co-fundador`
- URLs, slugs, classes CSS, nomes de arquivo
- Textos `alt` de imagens
- Comentários HTML (`<!-- … — … -->`)
- Comentários CSS

## 5. Inventário completo (22 alterações)

### 5.1 `index.html` (7)

| # | Local | De | Para |
|---|-------|-----|------|
| 1 | Hero subtitle | `marketing e IA — tudo conectado` | `marketing e IA, tudo conectado` |
| 2 | Section subtitle (problemas) | `na queda — aparece no lead` | `na queda, aparece no lead` |
| 3 | Problem card (picos) | `site trava — e cada segundo` | `site trava, e cada segundo` |
| 4 | Service card (marketing) | `mesmo plano — para você saber` | `mesmo plano, para você saber` |
| 5 | Service card (chatbot) | `qualquer hora — sem depender` | `qualquer hora, sem depender` |
| 6 | Service card (AWS) | `monitoramento contínuo — para você passar` | `monitoramento contínuo, para você passar` |
| 7 | CTA final | `Sem compromisso — só um bate-papo` | `Sem compromisso, só um bate-papo` |

### 5.2 `clientes/index.html` (2)

| # | Local | De | Para |
|---|-------|-----|------|
| 8 | Hero `<p>` | `depois — não só o nome` | `depois, não só o nome` |
| 9 | Card ChrisMedical | `setor de saúde — do anúncio` | `setor de saúde, do anúncio` |

### 5.3 `sobre/index.html` (6)

| # | Local | De | Para |
|---|-------|-----|------|
| 10 | `og:description` | `feature nova — com critérios` | `feature nova, com critérios` |
| 11 | Metodologia (etapa 2) | `por quê — integrando marketing` | `por quê, integrando marketing` |
| 12 | Metodologia (etapa 4) | `iteramos — para os ganhos` | `iteramos, para os ganhos` |
| 13 | Bio Brendon | `o servidor — do site que` | `o servidor, do site que` |
| 14 | Bio Matheus | `de verdade — ajustando criativo` | `de verdade, ajustando criativo` |
| 15 | CTA | `negócio — sem enrolação` | `negócio, sem enrolação` |

Nota: `<meta name="description">` em Sobre **não** contém travessão — sem alteração.

### 5.4 `solutions/chrismedical/index.html` (4)

| # | Local | De | Para |
|---|-------|-----|------|
| 16 | `meta name="description"` | `hospitalares — Ads com` | `hospitalares, Ads com` |
| 17 | Card desc | `aquisição B2B — com` | `aquisição B2B, com` |
| 18 | Timeline 1 | `no digital — e os anúncios` | `no digital, e os anúncios` |
| 19 | Timeline 2 | `rastreamento — para nenhuma` | `rastreamento, para nenhuma` |

### 5.5 `solutions/gasplanos/index.html` (3)

| # | Local | De | Para |
|---|-------|-----|------|
| 20 | Card desc | `planos de saúde` + linha `— com página` | `planos de saúde, com página` (unificar em uma linha ou manter quebra com vírgula) |
| 21 | Timeline 1 | `no digital — e enquanto` | `no digital, e enquanto` |
| 22 | Timeline 2 | `juntos — para cada clique` | `juntos, para cada clique` |

## 6. Explicitamente fora de escopo (permanecem com —)

| Arquivo | Motivo |
|---------|--------|
| `solutions/gasplanos/index.html` — 6× `alt="G.A.S Planos — …"` | Escopo B exclui `alt` |
| `404.html` — comentário HTML | Comentário, não copy visível |
| `assets/css/styles.css` — comentários | Código, não conteúdo editorial |
| Menu mobile `Seg - Sex` | Hífen separador — manter |

## 7. Comportamento esperado

- Nenhuma alteração visual de layout (só pontuação).
- Leitura mais uniforme em hero, cards, timeline e CTAs.
- Meta/OG descriptions alinhadas ao tom editorial onde aplicável.
- Hífens separadores e palavras compostas permanecem inalterados.

## 8. Verificação

1. `rg "—" --glob "*.html"` — restam apenas `alt` em gasplanos e comentário em `404.html`.
2. `rg "Seg - Sex" --glob "*.html"` — 9 ocorrências intactas no menu mobile.
3. Revisão visual rápida: `/`, `/clientes/`, `/sobre/`, `/solutions/chrismedical/`, `/solutions/gasplanos/`.

## 9. Ficheiros

| Ficheiro | Acção |
|----------|-------|
| `index.html` | 7 substituições |
| `clientes/index.html` | 2 substituições |
| `sobre/index.html` | 6 substituições |
| `solutions/chrismedical/index.html` | 4 substituições |
| `solutions/gasplanos/index.html` | 3 substituições |

Nenhuma alteração em CSS, JS ou `styles.min.css`.
