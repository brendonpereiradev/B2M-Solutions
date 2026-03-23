# Documentacao Tecnica de Design do Site

## 1. Escopo

Este documento descreve o design atual do site institucional da B2M Solutions, cobrindo:

- Sistema visual (tokens, tipografia, cores e linguagem estetica)
- Componentes de interface e seus comportamentos
- Estrutura de layout por pagina
- Responsividade e acessibilidade implementadas
- Animacoes e interacoes em JavaScript
- Convencoes e limitacoes observadas no estado atual

Baseado nos arquivos em `site/`, com foco em:

- `site/assets/css/styles.css`
- `site/assets/css/components/mobile-menu.css`
- `site/assets/js/animations.js`
- Paginas HTML em `site/` e subpastas

---

## 2. Visao Geral do Stack de Front-end

- **Arquitetura:** site estatico multipagina (MPA)
- **Tecnologias:** HTML5 semantico, CSS puro (sem framework runtime), JavaScript vanilla
- **Fonte externa:** Google Fonts (`Inter` e `Space Grotesk`)
- **Organizacao CSS:** arquivo principal `styles.css` + import de componente `mobile-menu.css`
- **JS global:** `animations.js` (reveal on scroll + menu mobile offcanvas)

---

## 3. Design System Atual

### 3.1 Tokens globais (`:root`)

Tokens definidos em `styles.css`:

- **Cores base**
  - `--color-background: #0A0D14`
  - `--color-surface: #10141F`
  - `--color-surface-elevated: #161B2E`
  - `--color-border: #1E2540`
- **Cores de acento**
  - `--color-primary: #4F6EF7`
  - `--color-secondary: #8B5CF6`
  - `--color-success: #22D3A5`
  - `--color-red`, `--color-orange`, `--color-yellow`, `--color-blue`, `--color-green`
- **Tipografia**
  - `--font-display: "Space Grotesk", sans-serif`
  - `--font-body: "Inter", sans-serif`
- **Layout**
  - `--container-max: 80rem`
  - `--container-narrow: 56rem`
  - `--container-padding: 1.5rem`
- **Raios**
  - `--radius-sm` ate `--radius-2xl` e `--radius-full`

### 3.2 Tipografia

- **Titulos e destaques:** `Space Grotesk` com peso alto e tracking negativo leve
- **Texto corrido e UI:** `Inter`
- Hierarquia visual baseada em:
  - contraste claro sobre fundo escuro
  - tamanhos grandes em hero/sections
  - textos secundarios em `--color-text-muted`

### 3.3 Linguagem visual

- Tema **dark premium** com influencia **glassmorphism**
- Uso frequente de:
  - blur de fundo (`backdrop-filter`)
  - gradientes (linear e radial)
  - glow suave em acentos roxo/azul/verde
  - bordas translúcidas para separacao de planos
- Estilo geral orientado a tecnologia/performance:
  - cards tecnicos
  - mockups de dashboard/terminal
  - iconografia SVG inline

---

## 4. Fundamentos de Layout e Base Global

### 4.1 Reset e base

- Reset completo de `box-sizing`, margens e paddings
- `scroll-behavior: smooth`
- Normalizacao de elementos de midia (`img`, `svg`, `video`) com `max-width: 100%`
- `body` com `overflow-x: hidden`
- Scrollbar customizada para navegadores WebKit

### 4.2 Estrutura de containers

- Paginas seguem eixo central com `max-width` e paddings laterais uniformes
- Header fixo no topo (`position: fixed`) com altura de `5rem`
- Conteudo principal compensa header com `padding-top: 5rem`

### 4.3 Gradientes e utilitarios

- Utilitario `.text-gradient` com animacao de deslocamento horizontal (`flowGradient`)
- Suporte a `prefers-reduced-motion: reduce` para desativar animacao de gradiente

---

## 5. Componentes de Interface

### 5.1 Header / Navbar

- Header fixo com fundo semitransparente e blur
- Logo com efeito de glow e hover
- Navegacao desktop:
  - links uppercase com underline animado no hover
  - divisoria vertical antes do CTA
- CTA de contato (`.btn-contato`) com preenchimento em gradiente no hover

### 5.2 Menu mobile offcanvas

Implementado por:

- CSS: `mobile-menu.css`
- JS: `animations.js`

Comportamento:

- Overlay fullscreen com blur de fundo
- Painel lateral entra da direita (`translateX`)
- Link list com animacao em cascata (stagger por `nth-child`)
- `body.no-scroll` enquanto menu aberto
- Toggle hamburguer -> X via classes em linhas SVG
- Fecha por:
  - clique no toggle
  - clique no overlay
  - clique em item de menu
  - tecla `Escape`

### 5.3 Botoes

Variantes principais:

- `.btn-primary`: gradiente primary->secondary com glow
- `.btn-secondary`: superficie escura com borda
- `.btn-primary--large` e `.btn-secondary--large`: versoes para CTA section
- Feedback visual por hover/active (brightness/scale)

### 5.4 Section heading reutilizavel

- `.section-heading`, `.section-title`, `.section-subtitle`
- suporte a alinhamento esquerdo e largura estreita via modificadores

### 5.5 Cards

Padrao recorrente:

- fundo `--color-surface`
- borda `--color-border`
- radius altos (`xl/2xl`)
- hover com elevacao (`translateY`) + borda/acento

Tipos importantes:

- `problem-card`
- `service-card` (incluindo variante wide)
- cards de solução (`solution-card`, `solution-panel`, `sol-card`)
- cards custom da pagina de clientes (`sol-showcase-card`, inline CSS)

### 5.6 Footer

- Layout centralizado
- navegacao inline com separadores `|`
- efeito hover/underline nos links
- marca central + copyright

---

## 6. Motion e Interacoes

### 6.1 Reveal on scroll

- Elementos com classe `.reveal` iniciam ocultos com `opacity: 0` + `translateY(20px)`
- Ativacao via `IntersectionObserver` no `animations.js`
- classe `.active` remove deslocamento e revela
- delays utilitarios (`.delay-100`, `.delay-200`, etc.)

### 6.2 Animacoes CSS nativas

Principais keyframes:

- `flowGradient` (texto gradiente)
- `float` (elementos do dashboard hero)
- `pulse` (status dots)
- `marquee` (logos em social proof)
- animacoes de bolhas/typing para elementos de chat em sections de soluções

### 6.3 Interacoes especificas de paginas

- Carrossel da solução G.A.S Planos:
  - autoplay (8s)
  - pausa no hover
  - controle por setas e dots
  - encerra autoplay apos interacao manual
- Modal de arquitetura AWS na solução G.A.S Planos:
  - abertura/fechamento por classe `.active`
  - fecha por backdrop e `Escape`
  - lock de scroll via `body.style.overflow`

---

## 7. Estrutura de Design por Pagina

## 7.1 Home (`site/index.html`)

Seções:

1. **Hero**
   - coluna esquerda: headline, subtitulo, CTAs, microstats
   - coluna direita (desktop): dashboard glassmorphism com 3 cards flutuantes
2. **Social Proof**
   - faixa com logos em marquee infinito com fades laterais
3. **Problem Section**
   - grid de 4 dores com icones e codificacao por cor
4. **Services Section**
   - grid de solucoes com acentos visuais por categoria
   - card wide para AWS com mockup de terminal
5. **CTA Section**
   - bloco central com fundo gradiente e glows
6. **Footer**

## 7.2 Clientes (`site/clientes/index.html`)

- Header de introducao (titulo e texto)
- Grid de vitrines de solução:
  - Chris Medical
  - G.A.S Planos
- Cards com estilos inline locais (na propria pagina) para:
  - hover premium
  - logo grayscale -> color
  - CTA interno revelado no hover
- CTA final padrao do site

## 7.3 Sobre (`site/sobre/index.html`)

- Hero editorial com glow de fundo e manifesto em paragrafos
- CTA final padrao
- Inclui JSON-LD de `Organization` com fundadores (impacta SEO, nao layout visual)

## 7.4 Contato (`site/contato/index.html`)

- Estrutura baseada na `problem-section`
- Bloco central com card de canais de contato
- Uso de estilos inline em elementos especificos para espacamento e grid local

## 7.5 Solução: G.A.S Planos (`site/solutions/gasplanos/index.html`)

- Layout avançado de solução (`sol-card`):
  - coluna textual + metadados + tech bar
  - coluna visual com carrossel de screenshots
- Timeline horizontal de problema -> solucao -> resultado
- Botao para modal de arquitetura AWS
- CTA final padrao

## 7.6 Solução: Chris Medical (`site/solutions/chrismedical/index.html`)

- Estrutura semelhante ao GAS, mas showcase estatico (logo)
- Timeline horizontal com narrativa da solução
- CTA final padrao

## 7.7 Paginas legais

- `site/termos-de-uso/index.html`
- `site/politica-de-privacidade/index.html`

Padrao visual:

- header/footer iguais ao restante
- corpo com section principal e blocos de texto legal
- forte uso de estilos inline para tipografia e espacamento dos blocos legais

## 7.8 Pagina 404 (`site/404.html`)

- Minimalista
- reaproveita `problem-section` com variante `problem-section--notfound`
- CTA unico para voltar ao inicio

---

## 8. Responsividade Atual

Breakpoints predominantes:

- `640px` (ajustes de texto e botoes)
- `768px` (transicao mobile -> tablet/desktop)
- `1024px` (layouts de grid mais complexos)
- `1280px` e `1440px` (ajustes de escala e densidade em soluções)

Pontos-chave:

- Navbar desktop so aparece >= `768px`; mobile menu abaixo disso
- Hero dashboard da home aparece apenas >= `1024px`
- Grids de cards escalam de 1 coluna para 2/3 conforme largura
- CTA buttons empilham em mobile e alinham em linha a partir de `640px`

### 8.1 Comportamento Desktop x Mobile (global)

- **Header/nav**
  - **Mobile (<768px):** mostra botao hamburguer, menu offcanvas lateral e CTA no painel mobile
  - **Desktop (>=768px):** mostra navegacao horizontal completa + botao `Contato`; toggle mobile oculto
- **Containers e espacamento**
  - **Mobile:** maior empilhamento vertical, cards em 1 coluna, CTAs em largura total em alguns pontos
  - **Desktop:** densidade maior por linha, grids multi-coluna, maior uso de area horizontal
- **Tipografia**
  - **Mobile:** titulos escalados para leitura sem overflow
  - **Desktop:** titulos ampliados com maior impacto visual (hero e section titles)
- **Interacoes**
  - **Mobile:** foco em toque (tap), fechamento de menu por toque no overlay/link
  - **Desktop:** foco em hover (subscritos, glows, elevacao de cards, reveals mais perceptiveis)

### 8.2 Comportamento Desktop x Mobile por pagina

#### Home (`site/index.html`)

- **Hero**
  - **Mobile:** coluna unica focada em texto + CTAs + stats
  - **Desktop (>=1024px):** layout em grade 12 colunas; dashboard visual na direita (`hero-dashboard`)
- **Social proof**
  - **Mobile/Desktop:** marquee continua ativo nos dois, com logos centrados e fades laterais
- **Problems e Services**
  - **Mobile:** cards em coluna unica
  - **Tablet/Desktop:** evolui para 2 colunas e depois 3 colunas (services)
- **CTA final**
  - **Mobile:** botoes empilhados
  - **Desktop:** botoes em linha

#### Clientes (`site/clientes/index.html`)

- **Grid de vitrine**
  - **Mobile:** cards em coluna unica (min width das colunas do `auto-fit`)
  - **Desktop:** cards distribuidos lado a lado conforme largura disponivel
- **Cards custom (`sol-showcase-card`)**
  - **Mobile:** hover nao e principal; conteudo continua legivel sem depender de efeito
  - **Desktop:** ganho de elevacao, fade e acao ("Veja a solução completa") mais perceptivel no hover

#### Sobre (`site/sobre/index.html`)

- **About hero**
  - **Mobile:** bloco editorial centralizado com paragrafos empilhados
  - **Desktop:** aumento de escala tipografica e maior area de respiro vertical
- **CTA**
  - comportamento igual ao padrao global (stack mobile, linha desktop)

#### Contato (`site/contato/index.html`)

- **Bloco de contato**
  - **Mobile:** bloco central com botoes em grade de 1 coluna
  - **Desktop:** mantem layout centralizado e maior conforto de leitura por largura util

#### Solução G.A.S Planos (`site/solutions/gasplanos/index.html`)

- **Header split (`sol-card-header`)**
  - **Mobile:** info e showcase empilhados verticalmente
  - **Desktop (>=1024px):** grid de duas colunas (texto + carrossel)
- **Carrossel**
  - **Mobile:** controles por toque/dots, foco em visualizacao de 1 slide por vez
  - **Desktop:** suporte forte a hover (pausa autoplay) e navegacao por setas
- **Timeline**
  - **Mobile:** steps empilhados
  - **Desktop:** steps alinhados horizontalmente com conectores visuais
- **Modal AWS**
  - **Mobile:** ocupa grande area da viewport com scroll interno quando necessario
  - **Desktop:** modal mais amplo com destaque no diagrama

#### Solução Chris Medical (`site/solutions/chrismedical/index.html`)

- **Estrutura**
  - **Mobile:** bloco de info + showcase estatico empilhado
  - **Desktop:** split visual semelhante à solução G.A.S Planos
- **Timeline**
  - segue o mesmo padrao responsivo da solução G.A.S Planos (vertical no mobile, horizontal no desktop)

#### Paginas legais e 404

- **Legais (`termos-de-uso`, `politica-de-privacidade`)**
  - **Mobile:** texto corrido com boa legibilidade em coluna unica
  - **Desktop:** mesma estrutura com maior respiro lateral e hierarquia de titulos mais evidente
- **404**
  - **Mobile/Desktop:** layout simples e centrado, com uma acao principal de retorno

### 8.3 Tabela rapida de mudancas por breakpoint

- **>=640px**
  - botoes grandes de CTA podem deixar de ocupar 100% de largura
- **>=768px**
  - troca de nav mobile para nav desktop
  - varios grids mudam para 2 colunas
- **>=1024px**
  - hero da home ativa coluna de dashboard
  - services podem atingir 3 colunas
  - layout de solução passa a split em colunas
- **>=1280px e >=1440px**
  - ajustes de escala/espacamento em areas de página de solução para telas amplas

---

## 9. Acessibilidade e Semantica (Estado Atual)

Pontos positivos:

- `lang="pt-BR"` em todas as paginas
- uso de landmarks semanticos (`header`, `main`, `section`, `footer`)
- `alt` presente em logos/imagens principais
- `aria-expanded` e `aria-hidden` no menu mobile
- suporte parcial a reducao de movimento no gradiente textual

Pontos a evoluir:

- alguns elementos com estilos inline dificultam consistencia/auditoria
- botao mobile na solução G.A.S Planos sem rotulo ARIA explicito
- existe `alert('Menu mobile em desenvolvimento.')` na solução G.A.S Planos ao clicar no toggle (comportamento destoante do padrao global)

---

## 10. Consistencia Visual e Excecoes

### 10.1 Padrões consistentes

- Header e footer praticamente uniformes no site inteiro
- Tokens de cor e tipografia respeitados na maioria dos componentes
- linguagem visual dark + glow + bordas translucidas aplicada de forma coerente

### 10.2 Excecoes locais relevantes

- `clientes/index.html` contem bloco `<style>` especifico para cards de vitrine
- `solutions/*/index.html` contem blocos `<style>` e scripts inline para comportamento proprio
- paginas legais e contato usam diversos estilos inline para texto/espacamento

Essas excecoes nao quebram o visual, mas fragmentam o design system em multiplos pontos de manutencao.

---

## 11. Inventario de Componentes (resumo rapido)

- Estruturais: `site-header`, `main-content`, `site-footer`
- Navegacao: `header-nav`, `nav-link`, `mobile-menu-*`
- Hero: `hero-*`, `dashboard-*`, `glass-panel`
- Conteudo: `section-heading`, `problem-*`, `service-*`, `cta-*`
- Soluções (classes): `solutions-*`, `solution-*`, `sol-*`, `arch-modal-*`
- Utilitarios: `reveal`, `delay-*`, `text-gradient`, `premium-shadow`

---

## 12. Consideracoes Tecnicas para Evolucao do Design

- Centralizar estilos inline em arquivos CSS para reduzir divergencias
- Consolidar componentes de solução para evitar duplicacao entre `gasplanos` e `chrismedical`
- Expandir suporte a `prefers-reduced-motion` para outras animacoes (reveal, float, marquee)
- Definir guia de estado ativo de navegacao por pagina (nav atual)
- Manter tokens no `:root` como unica fonte de verdade para escala visual

---

## 13. Conclusao

O design atual do site combina uma identidade dark premium, forte orientacao a tecnologia e foco comercial (conversão/soluções), com boa coerencia de linguagem visual entre paginas principais. O sistema funciona bem como base institucional e ja possui componentes reutilizaveis robustos, especialmente para header/footer, hero, cards e CTAs. O principal ponto tecnico de melhoria para manutencao futura e reduzir estilos/script inline, aproximando todas as paginas do design system centralizado em `styles.css` e `animations.js`.

