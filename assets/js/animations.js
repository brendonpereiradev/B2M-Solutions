/* ==========================================================================
   B2M SOLUTIONS — SCRIPT DE ANIMAÇÕES & REVEAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Conecta o observer garantindo que o estado inicial foi renderizado
    requestAnimationFrame(() => {
        revealElements.forEach(el => revealObserver.observe(el));
    });
});
