# CloudFront redirects (Viewer Request Function)

Arquivo: `cloudfront/function-viewer-request.js`

## O que ele faz

- **301**: `/index.html` → `/`
- **301**: `/<slug>.html` → `/<slug>/`
- **301**: força **trailing slash** em páginas (`/clientes` → `/clientes/`)
- **Rewrite** (sem redirect) para compatibilizar com S3:
  - `/` → `/index.html`
  - `/<path>/` → `/<path>/index.html`

## Como aplicar

1. No CloudFront, crie uma **CloudFront Function** (Runtime: JavaScript).
2. Cole o conteúdo de `cloudfront/function-viewer-request.js`.
3. Associe a função ao evento **Viewer request** do behavior principal.

## Observações

- O script **não** mexe em URLs de arquivos (quando há extensão), ex: `/assets/css/styles.css`, `/robots.txt`, `/sitemap.xml`.
- Se você usar **www vs apex**, faça a normalização no CloudFront (ou no Route 53/ALB) com redirect separado; este arquivo assume que a política de domínio já está definida.

