# Performance — baseline, checklist e regressão

## Baseline de ativos (lab local, sem Lighthouse)

| Recurso | Tamanho (bytes) | Notas |
|---------|-----------------|-------|
| `assets/css/styles.css` (fonte) | ~106 780 | Editar este arquivo; gere o minificado após mudanças. |
| `assets/css/styles.min.css` (build) | ~75 527 | Inclui `mobile-menu.css` (import resolvido pelo clean-css). |
| `assets/js/animations.js` | ~3 561 | Carregado com `defer`. |

## Lighthouse (mobile e desktop)

Neste ambiente o CLI do Lighthouse pode falhar se não houver Chrome instalado. No seu PC:

1. Sirva o site estático: `python -m http.server 8765` na raiz do repositório.
2. Abra Chrome DevTools → Lighthouse → modo **Mobile** e **Desktop** nas URLs: `/`, `/clientes/`, `/contato/`, `/sobre/`, `/solutions/gasplanos/`.
3. Registre **LCP**, **INP** (ou TBT), **CLS**, peso transferido e número de requisições.

Com Chrome instalado, após `python -m http.server 8765` na raiz:

- `npm run lighthouse:mobile`
- `npm run lighthouse:desktop`

Os relatórios HTML são gravados na raiz (entradas correspondentes no `.gitignore`). O CLI falha se não houver instalação do Chrome detectada pelo `chrome-launcher`.

## Após editar `styles.css`

```bash
npm run minify:css
```

Isso atualiza `assets/css/styles.min.css`. As páginas HTML referenciam o arquivo **minificado**.

## Checklist para novas páginas

- Usar o mesmo `<head>` padrão: preconnect + preload das fontes, `styles.min.css`, script ao final com `defer`.
- Imagens abaixo da dobra: `loading="lazy"` e `decoding="async"`; logo do header (LCP possível): `fetchpriority="high"` e dimensões `width`/`height` corretas.
- Evitar novos `blur`/`backdrop-filter` pesados sem variantes em `@media (max-width: 767.98px)` em `styles.css`.
- Respeitar `prefers-reduced-motion` para animações longas ou infinitas.

## O que já foi otimizado

- Entrega: CSS minificado, preloads WOFF2 (Inter latin + Space Grotesk latin), `defer` no JS.
- Mobile: redução de blur/backdrop e marquee mais lenta; `prefers-reduced-motion` ampliado.
- Imagens: dimensões explícitas e lazy onde aplicável.

## Produção

Confirme no servidor **gzip** ou **Brotli**, **Cache-Control** para `/assets/*` e HTTP/2 — isso afeta o peso “na rede” além do tamanho em disco.
