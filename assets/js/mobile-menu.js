/**
 * Menu mobile: overlay off-canvas (comportamento alinhado ao 3.0.0).
 * Requer: .mobile-menu-toggle, #mobileMenu, .mobile-menu-close, .mobile-nav-link
 */
(function () {
    'use strict';

    function init() {
        var toggle = document.querySelector('.mobile-menu-toggle');
        var overlay = document.getElementById('mobileMenu');
        var closeBtn = document.querySelector('.mobile-menu-close');
        var navLinks = document.querySelectorAll('.mobile-nav-link');
        var body = document.body;

        if (!toggle || !overlay || !closeBtn) {
            return;
        }

        function openMenu() {
            toggle.classList.add('active');
            overlay.classList.add('open');
            body.classList.add('no-scroll');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fechar menu');
            overlay.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            toggle.classList.remove('active');
            overlay.classList.remove('open');
            body.classList.remove('no-scroll');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            overlay.setAttribute('aria-hidden', 'true');
        }

        function isOpen() {
            return overlay.classList.contains('open');
        }

        toggle.addEventListener('click', function () {
            if (isOpen()) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeBtn.addEventListener('click', closeMenu);

        var i;
        for (i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', closeMenu);
        }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                closeMenu();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
