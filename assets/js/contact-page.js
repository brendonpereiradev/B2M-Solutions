(() => {
    const button = document.getElementById('copy-email');
    const address = document.getElementById('contact-email');
    const status = document.getElementById('copy-email-status');
    if (!button || !address || !status) return;

    button.addEventListener('click', async () => {
        button.disabled = true;
        status.textContent = '';
        try {
            await navigator.clipboard.writeText(address.textContent.trim());
            status.textContent = 'Endereço copiado.';
        } catch {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(address);
            selection?.removeAllRanges();
            selection?.addRange(range);
            status.textContent = 'Não foi possível copiar automaticamente. Selecione e copie o endereço acima.';
        } finally {
            button.disabled = false;
        }
    });
})();
