# Design: Novo favicon B2M

## 1. Objetivo

Substituir o pacote de favicons do site pelo novo branding, usando `b2m-favicon.png` como logotipo completo em tamanhos grandes e o símbolo quadrado do “2” (`favicon-source.png`) em tamanhos de aba do navegador — garantindo legibilidade em 16–32 px e wordmark B2M em atalhos mobile.

## 2. Contexto atual

- Site estático em HTML, sem pipeline de build para ícones.
- Pacote em `assets/img/favicons/`: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180), `android-chrome-192x192.png`, `favicon-source.png`.
- Arte nova: `assets/img/favicons/b2m-favicon.png` — logotipo horizontal B2M em fundo preto.
- Referências duplicadas em **10 páginas HTML**, sempre com 5 `<link rel="icon">` e cache bust `?v=5`.
- Sem `site.webmanifest` nem `favicon.ico` na raiz do projeto.

## 3. Abordagem escolhida

**Estratégia C (híbrida)** + **regeneração do pacote** mantendo a estrutura HTML existente.

| Contexto | Arte-fonte | Saídas |
|----------|------------|--------|
| Aba do navegador (16, 32, `.ico`) | `favicon-source.png` — símbolo “2” quadrado | `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico` |
| Atalhos iOS/Android (180, 192) | `b2m-favicon.png` — wordmark completo | `apple-touch-icon.png`, `android-chrome-192x192.png` |

Rejeitadas:
- **A** — B2M completo em todos os tamanhos (ilegível na aba).
- **B** — Apenas símbolo simplificado (perde wordmark em mobile).
- **Apontar `b2m-favicon.png` direto em todos os `<link>`** — escala inconsistente, PNG não quadrado.
- **Simplificar markup** (menos `<link>`) — ganho marginal, pior cobertura de browsers.

## 4. Geração de assets

### 4.1 Tamanhos pequenos (a partir de `favicon-source.png`)

1. Redimensionar para **16×16** → `favicon-16x16.png`
2. Redimensionar para **32×32** → `favicon-32x32.png`
3. Gerar **`favicon.ico`** com camadas 16×16 e 32×32 embutidas

Fundo preto preservado (consistente com identidade atual).

### 4.2 Tamanhos grandes (a partir de `b2m-favicon.png`)

1. Encaixar o wordmark horizontal em canvas quadrado **180×180** com fundo preto (letterboxing, sem distorção) → `apple-touch-icon.png`
2. Mesmo tratamento em **192×192** → `android-chrome-192x192.png`

### 4.3 Arquivos mantidos como fonte (não substituir)

- `favicon-source.png`
- `b2m-favicon.png`

### 4.4 Arquivos substituídos

- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon.ico`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`

## 5. Alterações HTML

Sem mudança estrutural nos `<link>`. Apenas incrementar cache bust **`?v=5` → `?v=6`** nos 10 arquivos:

- `index.html`
- `404.html`
- `contato/index.html`
- `sobre/index.html`
- `clientes/index.html`
- `termos-de-uso/index.html`
- `politica-de-privacidade/index.html`
- `solutions/chrismedical/index.html`
- `solutions/gasplanos/index.html`

Bloco de referência:

```html
<link rel="icon" type="image/x-icon" href="/assets/img/favicons/favicon.ico?v=6">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png?v=6">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png?v=6">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png?v=6">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/img/favicons/android-chrome-192x192.png?v=6">
```

## 6. Fora de escopo

- `site.webmanifest`
- `favicon.ico` na raiz do site
- Refatoração para centralizar `<link>` em partial compartilhado
- Versão SVG do favicon
- Fundo transparente nos ícones

## 7. Verificação manual

1. Abrir `http://127.0.0.1:5500/` e `/contato/` em aba anônima.
2. Confirmar na aba: símbolo “2” legível em ~16–32 px.
3. DevTools → Network: os 5 assets retornam **200** com `?v=6`.
4. Inspecionar `apple-touch-icon.png` (180×180): wordmark B2M completo centralizado em quadrado preto.

## 8. Ficheiros

| Ficheiro | Acção |
|----------|--------|
| `assets/img/favicons/favicon-16x16.png` | Regenerar |
| `assets/img/favicons/favicon-32x32.png` | Regenerar |
| `assets/img/favicons/favicon.ico` | Regenerar |
| `assets/img/favicons/apple-touch-icon.png` | Regenerar |
| `assets/img/favicons/android-chrome-192x192.png` | Regenerar |
| 10 ficheiros HTML listados em §5 | Atualizar `?v=6` |
