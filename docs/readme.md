<h1 align="center">B2M Solutions</h1>

<p align="center">
  Site institucional da B2M Solutions, cobrindo desenvolvimento web, marketing digital, chatbots e infraestrutura AWS.
</p>

<p align="center">
  <a href="https://b2msolutions.com.br" target="_blank"><strong>b2msolutions.com.br</strong></a>
</p>

---

## Sobre o projeto

O repositório contém o código do site institucional da B2M Solutions. A empresa oferece serviços de desenvolvimento web, marketing digital com rastreamento de conversão, chatbots com inteligência artificial e hospedagem na AWS.

O site é multipágina e reúne cases de clientes, apresentação da empresa, canais de contato e termos legais. A interface utiliza tema escuro com elementos translúcidos (glassmorphism), código semântico e padrões de acessibilidade.

---

## Funcionalidades

| Recurso | Descrição |
|---|---|
| Hero interativo | Três cartões animados com métricas simuladas para os serviços principais e efeitos visuais no título |
| Carrossel de clientes | Faixa contínua com logotipos dos clientes (ChrisMedical e G.A.S Planos) |
| Diagnóstico visual | Grade com quatro desafios comuns de clientes e ícones temáticos em SVG |
| Mockup de terminal AWS | Simulação de console de deploy com registro de escalabilidade automática |
| Galeria de projetos | Carrossel de capturas com rotação automática, navegação por setas e ampliação em tela cheia com controle de foco |
| Diagrama de arquitetura | Modal com esquema visual em SVG da infraestrutura na AWS (S3, CloudFront, Route 53 e ACM) |
| Menu móvel lateral | Gaveta de navegação com transição suave, bloqueio de rolagem no iOS e atributos ARIA |
| Página de contato | Informações de atendimento, e-mail institucional clicável e botões de redirecionamento |
| Páginas institucionais e legais | Seções sobre a empresa, política de privacidade e termos de uso |
| Página 404 | Página de erro personalizada com link para retornar à página inicial |

---

## Stack

O site foi desenvolvido sem frameworks front-end, utilizando recursos nativos da web:

- HTML5: marcação semântica com tags estruturais (`header`, `nav`, `main`, `section`, `footer`), metadados Open Graph e marcação JSON-LD via Schema.org (`Organization`, `ContactPage`).
- CSS3: variáveis CSS, layouts com Flexbox e Grid, efeitos com `backdrop-filter`, tipografia fluida com `clamp()` e regras para diferentes resoluções de tela.
- JavaScript ES6+: scripts nativos para animações com Intersection Observer, carrossel, lightbox com controle de foco e menu móvel com trava de rolagem no iOS.
- AWS (S3, CloudFront, Route 53, ACM): distribuição de conteúdo estático via CDN com HTTPS e compressão Gzip/Brotli.
- CloudFront Functions: reescrita de URLs e redirecionamentos 301 para remover a extensão `.html`.
- Google Tag Manager e GA4: coleta de métricas de acesso e conversão.
- Microsoft Clarity: gravação de sessões e mapas de calor.
- Otimização de recursos: fontes Space Grotesk e Inter carregadas via Google Fonts com `preload` em `.woff2`, favicons gerados via Node.js (Sharp e to-ico) e imagens com carregamento sob demanda (`loading="lazy"`).

---

## Estrutura do projeto

```
B2M Solutions/
├── assets/
│   ├── css/
│   │   ├── styles.css                   # CSS principal (variáveis, layout e animações)
│   │   ├── styles.min.css               # CSS minificado para produção
│   │   └── components/
│   │       └── mobile-menu.css          # Estilos do menu móvel
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
│   └── index.html                      # Informações e canais de contato
├── sobre/
│   └── index.html                      # Apresentação da empresa e fundadores
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

## Páginas do site

- Início (`index.html`): apresentação dos serviços, logotipos de clientes, visão geral de soluções e chamada para contato.
- Sobre (`sobre/`): história da empresa, etapas de trabalho e apresentação dos fundadores.
- Clientes (`clientes/`): listagem de projetos realizados com atalhos para os estudos de caso.
- Estudo de caso G.A.S Planos (`solutions/gasplanos/`): galeria com capturas de tela do projeto, modal com diagrama de arquitetura AWS e lista de tecnologias usadas.
- Estudo de caso ChrisMedical (`solutions/chrismedical/`): visão geral do projeto de marketing digital e etapas de implementação.
- Contato (`contato/`): canais de atendimento direto (`comercial@b2msolutions.com.br`).
- Política de Privacidade (`politica-de-privacidade/`): diretrizes de tratamento e proteção de dados.
- Termos de Uso (`termos-de-uso/`): termos de navegação e direitos autorais.
- Página 404 (`404.html`): aviso de página não encontrada com link de retorno à página inicial.

---

## SEO e desempenho

- Marcação Schema.org em formato JSON-LD (`Organization` e `ContactPage`) com dados institucionais e canais de contato.
- Metadados Open Graph em todas as páginas para pré-visualização em redes sociais e mensageiros.
- Tags `title`, `description` e `canonical` configuradas individualmente por rota.
- Arquivos `robots.txt` e `sitemap.xml` com as rotas públicas mapeadas.
- Pré-carregamento (`preload`) dos arquivos de fonte `.woff2` para reduzir atrasos na renderização do texto.
- Folha de estilo minificada para ambiente de produção (`styles.min.css`).
- Scripts com atributo `defer` para não bloquear o parsing do HTML.
- Imagens com atributos de dimensão (`width` e `height`), carregamento preguiçoso (`loading="lazy"`) e decodificação assíncrona.
- Suporte a `@media (prefers-reduced-motion: reduce)` para respeitar as preferências de acessibilidade do usuário.
- Redirecionamentos 301 e padronização de URLs executados em borda via CloudFront Functions.
- Cabeçalhos de segurança configurados via Content Security Policy (CSP).

---

## Licença e uso

Este repositório é disponibilizado para visualização de código e portfólio. As marcas, logotipos e conteúdos pertencem aos respectivos proprietários, não sendo autorizada a reprodução comercial sem permissão prévia.

---

<p align="center">
  Desenvolvido por <strong>B2M Solutions</strong>
</p>
