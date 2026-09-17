<h1 align="center">B2M Solutions</h1>

<p align="center">
  Site institucional da B2M Solutions, cobrindo desenvolvimento web de alta performance, marketing digital com rastreamento e infraestrutura AWS.
</p>

<p align="center">
  <a href="https://b2msolutions.com.br" target="_blank"><strong>b2msolutions.com.br</strong></a>
</p>

---

## Sobre o projeto

O repositório contém o código do site institucional da B2M Solutions. A empresa oferece serviços de desenvolvimento web, marketing digital com rastreamento de conversão, chatbots com inteligência artificial e hospedagem na AWS.

O site é multipágina e reúne cases de clientes, apresentação da empresa, canais de contato e termos legais. A interface segue a estética **Swiss Editorial High-Craft** em tema escuro minimalista sofisticado, com divisórias estruturais de 1px de precisão, tipografia técnica e código semântico.

---

## Funcionalidades

| Recurso | Descrição |
|---|---|
| Hero principal | Texto centralizado e acesso ao contato e aos projetos entregues |
| Carrossel de clientes | Faixa contínua com logotipos dos clientes (ChrisMedical e G.A.S Planos) |
| Serviços e projetos | Problemas atendidos e links dos serviços para cases documentados |
| Galeria de projetos | Carrossel de capturas com rotação suave, navegação por setas e ampliação em lightbox |
| Diagrama de arquitetura | Modal com esquema visual em SVG da infraestrutura na AWS (S3, CloudFront, Route 53 e ACM) |
| Menu móvel lateral | Gaveta de navegação offcanvas com transição suave, bloqueio de rolagem e atributos ARIA |
| Página de contato | Canais diretos de atendimento, e-mail institucional e etapas do processo técnico |
| Páginas institucionais e legais | Seções sobre a empresa, política de privacidade e termos de uso em diagramação editorial |
| Página 404 | Página de erro personalizada com numerais tabulares em Geist Mono |

---

## Tecnologias utilizadas

O site foi desenvolvido sem frameworks pesados, utilizando recursos nativos modernos da web:

- HTML5: marcação semântica com tags estruturais (`header`, `nav`, `main`, `section`, `footer`), metadados Open Graph e marcação de acessibilidade.
- CSS3: tokens de Design System em `design-system.css`, layouts com Flexbox e CSS Grid Suíço, tipografia fluida com `clamp()` e transições cúbicas refinadas.
- Tipografia: fontes Geist (títulos/destaques), Geist Mono (dados/métricas/badges) e Inter (corpo) via Google Fonts.
- JavaScript ES6+: scripts nativos para animações com Intersection Observer, controle de carrossel, lightbox e menu móvel com trava de scroll.
- AWS (S3, CloudFront, Route 53, ACM): distribuição de conteúdo estático via CDN com HTTPS e compressão Gzip/Brotli.
- CloudFront Functions: reescrita de URLs e redirecionamentos 301 para remover a extensão `.html`.
- Google Tag Manager e GA4: coleta de métricas de acesso e conversão.
- Microsoft Clarity: gravação de sessões e mapas de calor.

---

## Estrutura do projeto

```
B2M Solutions/
├── assets/
│   ├── css/
│   │   ├── design-system.css            # Tokens de cores, tipografia, grid suíço e espaçamentos
│   │   ├── styles.css                   # CSS principal com componentes e layouts editoriais
│   │   ├── styles.min.css               # Folha de estilos sincronizada para produção
│   │   └── components/
│   │       └── mobile-menu.css          # Estilos do menu móvel offcanvas
│   ├── js/
│   │   ├── animations.js               # Animações de entrada no scroll via Intersection Observer
│   │   └── mobile-menu.js              # Controle do menu móvel com bloqueio de rolagem
│   ├── logos/
│   │   ├── b2m-logo-dark-nobg-*.png    # Logotipo da B2M em diferentes resoluções
│   │   ├── chrismedical-logo-nobg-*.png # Logotipo do cliente ChrisMedical
│   │   └── gas-logo.svg               # Logotipo do cliente G.A.S Planos
│   └── img/
│       ├── favicons/                   # Favicons em formatos ICO e PNG
│       ├── sobre/                      # Fotos dos fundadores
│       └── solutions/gasplanos/        # Capturas de tela e diagrama da arquitetura AWS
├── clientes/
│   └── index.html                      # Lista de clientes e cases
├── contato/
│   └── index.html                      # Informações e canais de contato direto
├── sobre/
│   └── index.html                      # Apresentação da empresa, metodologia e fundadores
├── solutions/
│   ├── chrismedical/
│   │   └── index.html                  # Estudo de caso: ChrisMedical
│   └── gasplanos/
│       └── index.html                  # Estudo de caso: G.A.S Planos
├── politica-de-privacidade/
│   └── index.html                      # Política de privacidade
├── termos-de-uso/
│   └── index.html                      # Termos de uso
├── cloudfront/
│   ├── function-viewer-request.js      # Função de borda para redirecionamentos e rotas no S3
│   └── README.md                       # Documentação da função CloudFront
├── scripts/
│   └── generate-favicons.mjs           # Script para geração de favicons com Sharp e to-ico
├── docs/
│   └── readme.md                       # Este arquivo
├── index.html                          # Página inicial
├── 404.html                            # Página de erro 404
├── robots.txt                          # Regras de indexação para motores de busca
├── sitemap.xml                         # Mapa do site com as rotas canônicas
└── .gitignore
```

---

<p align="center">
  Desenvolvido por <strong>B2M Solutions</strong>
</p>

## Organização visual atual

A home mantém o hero centralizado e o carrossel de logotipos. Os serviços de sites, campanhas e hospedagem apontam para projetos relacionados. A página Sobre apresenta os fundadores antes do processo de trabalho.

Os cases compartilham `assets/css/components/project-case.css`; a G.A.S inclui galeria e diagrama AWS. A página de contato destaca o e-mail e permite copiar o endereço. As folhas específicas ficam em `assets/css/components/`.

`styles.css` é a folha referenciada pelas páginas. `styles.min.css` é uma cópia de compatibilidade, atualmente sem minificação; manter ambas sincronizadas enquanto essa cópia existir. Não editar a cópia separadamente.

Os efeitos de entrada são progressivos: o conteúdo permanece visível sem JavaScript e com movimento reduzido. A prévia local usa `python -m http.server 8765 --bind 127.0.0.1`. A publicação em produção é uma etapa separada.
