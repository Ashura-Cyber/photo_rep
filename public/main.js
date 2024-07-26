import { votes, vote } from './votes.js';

document.getElementById('vote-photo1').addEventListener('click', () => vote('photo1'));
document.getElementById('vote-photo2').addEventListener('click', () => vote('photo2'));

// Display initial votes
document.getElementById('votes-photo1').innerText = `${votes.photo1} votes`;
document.getElementById('votes-photo2').innerText = `${votes.photo2} votes`;

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value || ""}; ${expires}; path=/`;
    console.log(`Cookie set: ${name}=${value}; ${expires}; path=/`);
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            console.log(`Cookie retrieved: ${name}=${c.substring(nameEQ.length, c.length)}`);
            return c.substring(nameEQ.length, c.length);
        }
    }
    console.log(`Cookie not found: ${name}`);
    return null;
}

// Function to get and save location in cookies
function getAndSaveLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // Save in cookies
                setCookie('latitude', latitude, 1); // 1 day expiry
                setCookie('longitude', longitude, 1); // 1 day expiry

                console.log(`Location obtained and saved: Latitude=${latitude}, Longitude=${longitude}`);
                // Send cookies to the server
                sendCookiesToServer();
            },
            (error) => {
                console.error(`Geolocation error: ${error.message}`);
            }
        );
    } else {
        console.warn('Geolocation is not supported by this browser.');
    }
}

// Function to send cookies to the server
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

// Execute location fetching and saving on page load
document.addEventListener('DOMContentLoaded', getAndSaveLocation);
