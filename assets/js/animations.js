// Animações de reveal (Intersection Observer).
document.addEventListener('DOMContentLoaded', () => {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealOnScroll.observe(el);
    });
});
