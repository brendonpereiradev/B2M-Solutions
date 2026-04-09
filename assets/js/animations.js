// Animações de reveal (Intersection Observer).
document.addEventListener('DOMContentLoaded', () => {
    const revealOptionsDefault = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOptionsShowcase = {
        threshold: 0.1,
        rootMargin: '0px 0px -25px 0px'
    };

    function createRevealObserver(options) {
        return new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, options);
    }

    const revealOnScrollDefault = createRevealObserver(revealOptionsDefault);
    const revealOnScrollShowcase = createRevealObserver(revealOptionsShowcase);

    document.querySelectorAll('.reveal.reveal--showcase').forEach(el => {
        revealOnScrollShowcase.observe(el);
    });

    document.querySelectorAll('.reveal:not(.reveal--showcase)').forEach(el => {
        revealOnScrollDefault.observe(el);
    });
});
