// clientes.js — Lógica de troca de tabs por cliente
// Exibe apenas o painel do cliente selecionado com animação de fade

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#client-tabs .client-tab');
    const panels = document.querySelectorAll('.case-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const clientId = tab.getAttribute('data-client');

            // Atualiza estado ativo das tabs
            tabs.forEach(t => t.classList.remove('client-tab--active'));
            tab.classList.add('client-tab--active');

            // Scroll suave e fluído após pequeno delay para sincronizar com a montagem do card de projetos selecionado
            setTimeout(() => {
                const casesSection = document.getElementById('cases-panels');
                if (casesSection) {
                    const headerOffset = 100;
                    const elementPosition = casesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);

            // Esconde todos os painéis e mostra o selecionado
            panels.forEach(panel => {
                if (panel.getAttribute('data-client') === clientId) {
                    // Mostra o painel com animação
                    panel.style.display = 'block';
                    // Força reflow para a transição funcionar
                    panel.offsetHeight;
                    panel.classList.add('case-panel--active');
                } else {
                    panel.classList.remove('case-panel--active');
                    // Aguarda a transição antes de esconder
                    setTimeout(() => {
                        if (!panel.classList.contains('case-panel--active')) {
                            panel.style.display = 'none';
                        }
                    }, 500);
                }
            });
        });
    });
});
