// Animações de reveal (Intersection Observer) e menu mobile off-canvas.
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});

// ==========================================
// Toggle e Controle do Menu Mobile (Offcanvas)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobileMenu');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    // Toggle + overlay são obrigatórios; botão fechar pode estar oculto (CSS) mas ainda no DOM
    if (!mobileMenuToggle || !mobileMenuOverlay) {
        return;
    }

    // Função para abrir o menu
    const openMobileMenu = () => {
        mobileMenuToggle.classList.add('active'); // Transforma hamburguer em X
        mobileMenuOverlay.classList.add('open'); // Mostra o offcanvas
        body.classList.add('no-scroll'); // Previne rolagem do fundo
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    };

    // Função para fechar o menu
    const closeMobileMenu = () => {
        mobileMenuToggle.classList.remove('active'); // Volta para hamburguer
        mobileMenuOverlay.classList.remove('open'); // Esconde o offcanvas
        body.classList.remove('no-scroll'); // Restaura rolagem do fundo
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    };

    // Obter toggle no botão (humburguer / X)
    mobileMenuToggle.addEventListener('click', () => {
        if (mobileMenuOverlay.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Fechar ao clicar no botão "X" (quando visível)
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    }

    // Fechar ao clicar em um link nav
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Fechar ao clicar fora do conteúdo (overlay handler)
    mobileMenuOverlay.addEventListener('click', (e) => {
        // Se o trigger foi exatamente no overlay (e não num filho)
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Fechar ao pressionar 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
            closeMobileMenu();
        }
    });
});

