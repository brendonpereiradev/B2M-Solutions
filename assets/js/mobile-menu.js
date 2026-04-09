/**
 * Menu mobile: drawer + backdrop. Requer markup do plano (botão, #site-navigation, .mobile-nav-backdrop).
 */
(function () {
    'use strict';

    function init() {
        var toggle = document.querySelector('.mobile-menu-toggle');
        var backdrop = document.querySelector('.mobile-nav-backdrop');
        var panel = document.getElementById('site-navigation');
        if (!toggle || !backdrop || !panel) {
            return;
        }

        function setOpen(open) {
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
            if (open) {
                var firstLink = panel.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                }
            } else {
                toggle.focus();
            }
        }

        function isOpen() {
            return document.body.classList.contains('nav-open');
        }

        toggle.addEventListener('click', function () {
            setOpen(!isOpen());
        });

        backdrop.addEventListener('click', function () {
            if (isOpen()) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                setOpen(false);
            }
        });

        panel.addEventListener('click', function (e) {
            if (e.target && e.target.closest && e.target.closest('a')) {
                setOpen(false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
