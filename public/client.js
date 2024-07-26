function sendCookiesToServer() {
    const cookies = document.cookie;

    fetch('/api/store-cookies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookies })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Cookies sent successfully:', result);
    })
    .catch(error => {
        console.error('Error sending cookies:', error);
    });
}

document.addEventListener('DOMContentLoaded', sendCookiesToServer);
