/* ==========================================================================
   B2M SOLUTIONS — SCRIPT DE ANIMAÇÕES & REVEAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Observer para animações de entrada (reveal)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('is-pending');
                entry.target.classList.add('is-revealed');
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top >= window.innerHeight) el.classList.add('is-pending');
        revealObserver.observe(el);
    });
});
