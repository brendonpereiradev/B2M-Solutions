<h1 align="center">B2M Solutions</h1>

<p align="center">
  Site institucional da consultoria de tecnologia premium — criação de sites, marketing digital, chatbot com IA e hospedagem AWS.
</p>

<p align="center">
  <a href="https://b2msolutions.com.br" target="_blank"><strong>b2msolutions.com.br</strong></a>
</p>

---

## Sobre o projeto

**B2M Solutions** é o site institucional de uma consultoria de tecnologia premium focada em centralizar as quatro camadas vitais de operações digitais em um único parceiro técnico: criação de sites de alta performance, marketing digital com rastreamento fim a fim, chatbots inteligentes com IA e hospedagem escalável na nuvem AWS.

O projeto é um site multipágina desenvolvido com foco em **alta performance**, **design premium (Glassmorphism + Dark Mode)** e **acessibilidade**, incluindo cases de sucesso, página institucional, contato e páginas legais. A estrutura foi projetada para funcionar como vitrine técnica e funil de conversão, guiando o visitante desde a proposta de valor até o contato direto com a equipe.

---

## Funcionalidades

| Feature | Descrição |
|---|---|
| **Hero interativo com dashboard Glassmorphism** | 3 cards flutuantes animados com simulação visual de métricas para cada serviço (Sites, Marketing, AWS), glow spheres e gradiente animado no título |
| **Social proof em marquee infinito** | Carrossel contínuo com logos dos clientes (ChrisMedical, G.A.S Planos) e fading edges laterais |
| **Seção de diagnóstico com glow cards** | Grid de 4 problemas comuns com ícones SVG e iluminação temática (vermelho, laranja, amarelo, roxo) |
| **Terminal mockup interativo (AWS)** | Simulação de console de deploy com barra macOS e log de auto-scaling (2 a 4 instâncias, 0ms downtime) |
| **Case studies com carrossel e lightbox** | Screenshots navegáveis com autoplay (8s), dots, setas e visualização em tela cheia acessível com foco gerenciado |
| **Modal de arquitetura AWS** | Diagrama SVG interativo da topologia de serviços (S3, CloudFront, Route 53, ACM) |
| **Menu mobile offcanvas premium** | Drawer lateral com overlay Glassmorphism, stagger animations, bloqueio de scroll iOS e acessibilidade ARIA completa |
| **Página de contato Glassmorphism** | Painel centralizado com e-mail institucional clicável, horário de atendimento e botões de ação |
| **Páginas legais** | Política de Privacidade e Termos de Uso em páginas dedicadas com tipografia fluida |
| **Página 404 personalizada** | Erro customizado com design Glassmorphism e botão de retorno para a home |

---

## Stack

O projeto é construído com uma stack leve e de alta performance, sem dependência de frameworks:

- **HTML5 semântico**: Estrutura com landmarks (`header`, `nav`, `main`, `section`, `footer`), Schema.org JSON-LD (`Organization`, `ContactPage`), Open Graph e meta tags otimizadas
- **CSS3 vanilla**: Migrado de Tailwind para CSS puro de alta performance. Variáveis nativas (Custom Properties), Glassmorphism (`backdrop-filter`), tipografia fluida com `clamp()`, CSS Grid e Flexbox, responsivo do mobile ao ultrawide (4K+)
- **JavaScript ES6+**: Intersection Observer para animações de scroll, carrossel com autoplay, lightbox acessível com foco gerenciado, menu drawer offcanvas com bloqueio de scroll iOS — zero dependência de frameworks externos
- **Google Tag Manager + GA4**: Rastreamento de conversões e analytics
- **Microsoft Clarity**: Mapas de calor e gravação de sessões
- **AWS Cloud (S3 + CloudFront + Route 53 + ACM)**: Hospedagem serverless com CDN global, HTTPS forçado e compressão Gzip/Brotli
- **CloudFront Functions**: Redirecionamentos 301 e rewrites na borda para URLs canônicas sem `.html`
- **Assets otimizados**: Favicons automatizados via Node.js (Sharp + to-ico), imagens com `loading="lazy"`, `fetchpriority="high"` e dimensões explícitas para zero CLS
- **Web Fonts**: Space Grotesk (títulos) e Inter (corpo) via Google Fonts com `preconnect` e `preload` de `.woff2`

---

## Estrutura do projeto

```
B2M Solutions/
├── assets/
│   ├── css/
│   │   ├── styles.css                   # CSS principal (tokens, glassmorphism, layouts, animações)
│   │   ├── styles.min.css               # CSS minificado para produção
│   │   └── components/
│   │       └── mobile-menu.css          # Estilos isolados do menu drawer mobile
│   ├── js/
│   │   ├── animations.js               # Intersection Observer para animações de reveal no scroll
│   │   └── mobile-menu.js              # Lógica do menu drawer offcanvas com bloqueio de scroll
│   ├── logos/
│   │   ├── b2m-logo-dark-nobg-*.png    # Logo B2M em múltiplas resoluções (400w, 800w, full)
│   │   ├── chrismedical-logo-nobg-*.png # Logo cliente ChrisMedical
│   │   └── gas-logo.svg               # Logo cliente G.A.S Planos (vetor SVG)
│   └── img/
│       ├── favicons/                   # Suite completa de favicons (ICO, PNG, Apple Touch, Android)
│       ├── sobre/                      # Fotos dos fundadores (Brendon Souza, Matheus Izaias)
│       └── solutions/gasplanos/        # Screenshots do case e diagrama de arquitetura AWS (SVG)
├── clientes/
│   └── index.html                      # Vitrine de clientes e cases de sucesso
├── contato/
│   └── index.html                      # Canais de contato com painel Glassmorphism
├── sobre/
│   └── index.html                      # Empresa, metodologia e fundadores
├── solutions/
│   ├── chrismedical/
│   │   └── index.html                  # Case de estudo: Marketing Digital e Funil B2B
│   └── gasplanos/
│       └── index.html                  # Case de estudo: Site, AWS Cloud, Carrossel e Modal
├── politica-de-privacidade/
│   └── index.html                      # Página legal de Política de Privacidade
├── termos-de-uso/
│   └── index.html                      # Página legal de Termos de Uso
├── cloudfront/
│   ├── function-viewer-request.js      # CloudFront Function para 301, trailing slash e rewrites S3
│   └── README.md                       # Documentação da Edge Function
├── scripts/
│   └── generate-favicons.mjs           # Automação de favicons via Sharp + to-ico
├── docs/
│   └── readme.md                       # Este arquivo
├── index.html                          # Página principal (landing page institucional)
├── 404.html                            # Página de erro 404 personalizada
├── robots.txt                          # Diretivas de indexação e link do sitemap
├── sitemap.xml                         # Mapa do site com 8 URLs canônicas
└── .gitignore
```

---

## Páginas do site

1. **Início** (`index.html`): Hero com dashboard Glassmorphism interativo, social proof marquee, diagnóstico com glow cards, soluções com terminal mockup AWS e CTA final
2. **Sobre Nós** (`sobre/`): Manifesto institucional, metodologia em 4 etapas (Diagnóstico, Planejamento, Implementação, Evolução contínua) e apresentação dos fundadores
3. **Clientes** (`clientes/`): Vitrine em cards responsivos com logos, categorias e links para os cases
4. **Case G.A.S Planos** (`solutions/gasplanos/`): Carrossel de 5 screenshots com autoplay, lightbox acessível, modal de arquitetura AWS em SVG, timeline horizontal e barra de tecnologias
5. **Case ChrisMedical** (`solutions/chrismedical/`): Header split com logo do cliente, barra de stack técnica e timeline de impacto
6. **Contato** (`contato/`): Painel Glassmorphism com e-mail clicável (`comercial@b2msolutions.com.br`), horário de atendimento e botões de ação
7. **Política de Privacidade** (`politica-de-privacidade/`): Termos de coleta, uso, compartilhamento e segurança de dados
8. **Termos de Uso** (`termos-de-uso/`): Condições de aceitação, propriedade intelectual e limites de responsabilidade
9. **Erro 404** (`404.html`): Página de erro personalizada com design consistente e botão de retorno

---

## SEO e performance

- Schema.org JSON-LD (`Organization`, `ContactPage`) com dados estruturados dos fundadores e horários de atendimento
- Open Graph completo em todas as páginas para compartilhamento social (WhatsApp, LinkedIn, Twitter/X)
- Meta tags otimizadas com `title`, `description` e `canonical` únicos por página
- `robots.txt` e `sitemap.xml` com 8 rotas mapeadas, frequências e prioridades
- Preload de fontes críticas `.woff2` (Space Grotesk, Inter) para evitar FOUT/FOIT
- CSS minificado em produção (`styles.min.css`)
- Scripts com `defer` para carregamento não-bloqueante
- Imagens com `width`/`height` explícitos, `loading="lazy"`, `fetchpriority="high"` e `decoding="async"` para zero CLS
- `@media (prefers-reduced-motion: reduce)` para desativar animações contínuas
- CloudFront Functions na borda para URLs canônicas e redirecionamentos 301
- Content Security Policy (CSP) via meta tag
- Links legais no footer com `rel="nofollow"` e página 404 com `meta robots="noindex"`

---

## Licença e uso

Este repositório é público exclusivamente para fins de demonstração de portfólio. As marcas, logotipos e conteúdos pertencem aos seus respectivos proprietários, sendo vedada a utilização comercial deste projeto por terceiros sem autorização prévia.

---

<p align="center">
  Desenvolvido por <strong>B2M Solutions</strong>
</p>
