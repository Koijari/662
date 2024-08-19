/* Käyttäjän rekisteröinnin tapahtumat */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const kayttaja = document.getElementById('reg-username').value.trim();
        const salasana = document.getElementById('reg-password').value.trim();
        const kayttajat = JSON.parse(sessionStorage.getItem('users')) || [];

        // Tunnuksen tarkistus on/ei
        const kaytajaOlemassa = kayttajat.some(user => user.username === kayttaja);
        
        if (kaytajaOlemassa) {
            document.getElementById('register-message').style.color = '#a00'
            document.getElementById('register-message').textContent = 
                'Tunnus käytössä!';
        } else {
            //Uuden käyttäjän lisääminen rekisteriin
            kayttajat.push({ username: kayttaja, password: salasana });
            sessionStorage.setItem('users', JSON.stringify(kayttajat));
            
            document.getElementById('register-message').style.color = '#0a0'
            document.getElementById('register-message').textContent = 'Tunnus luotu!';        
        }

        //palautusviive login-sivulle 
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});
