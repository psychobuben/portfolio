
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Změna na port 443 pro HTTPS komunikaci
    const response = await fetch('https://jankonrad.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Email byl úspěšně odeslán!');
    } else {
        alert('Došlo k chybě při odesílání.');
    }
});