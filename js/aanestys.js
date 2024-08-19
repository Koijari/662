/* Tallennus tapahtuu sessionStorageen
    Äänimäärää/käyttäjä ei ole rajoitettu
    Käyttäjätunnukset: rekisteröimällä
    Admintunnukset: admin/admin
*/

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form')
    if (loginForm) {
        loginForm.addEventListener('submit', loginTapahtuma)
    }

    const kyselyLista = document.getElementById('poll-list')
    if (kyselyLista) {
        loginTarkistus('user')
        KayttajaNaytaKyselyt()
    }

    const adminListat = document.getElementById('admin-poll-list')
    if (adminListat) {
        loginTarkistus('admin')
        AdminNaytaKyselyt()
    }

    const lisaaKyselyBtn = document.getElementById('add-poll-btn')
    if (lisaaKyselyBtn) {
        lisaaKyselyBtn.addEventListener('click', LisaaKysely)
    }

    const uloskirjausBtn = document.getElementById('logout-btn')
    if (uloskirjausBtn) {
        uloskirjausBtn.addEventListener('click', Uloskirjaus)
    }

    const lisaaVaihtoehtoBtn = document.getElementById('add-option-btn')
    if (lisaaVaihtoehtoBtn) {
        lisaaVaihtoehtoBtn.addEventListener('click', lisaaVaihtoehto)
    }
})

function lisaaVaihtoehto() {
    const vaihtoehtoKentta = document.getElementById('poll-options-container')
    const vaihtoehtoLaskuri = vaihtoehtoKentta.querySelectorAll('.poll-option-input').length + 1
    const vaihtoehtoKenttaLisaa = document.createElement('input') //Lisää vaihtoehtokenttä
    vaihtoehtoKenttaLisaa.type = 'text'
    vaihtoehtoKenttaLisaa.className = 'poll-option-input'
    vaihtoehtoKenttaLisaa.placeholder = `Vaihtoehto ${vaihtoehtoLaskuri}`
    vaihtoehtoKentta.appendChild(vaihtoehtoKenttaLisaa)
    vaihtoehtoKentta.appendChild(document.createElement('br'))
}

function loginTapahtuma(event) {
    event.preventDefault()

    const kayttaja = document.getElementById('username').value.trim()
    const salasana = document.getElementById('password').value.trim()
    const kayttajat = JSON.parse(sessionStorage.getItem('users')) || [] // sessionStorage

    const user = kayttajat.find(user => user.username === kayttaja && user.password === salasana)

    if (user) {
        sessionStorage.setItem('role', 'user') // Käyttötapatarkistus käyttäjä/admin
        window.location.href = 'index.html' // Käyttäjäruutu
    } else if (kayttaja === 'admin' && salasana === 'admin') {
        sessionStorage.setItem('role', 'admin')
        window.location.href = 'admin.html' // admin-hallintaruutu
    } else {
        alert('Tarkista tunnus ja/tai salasana, tai luo uusi tunnus.') //ErrorHandleri
    }
}

function loginTarkistus(expectedRole) {
    const kayttajaRooli = sessionStorage.getItem('role')
    if (kayttajaRooli !== expectedRole) {
        window.location.href = 'login.html'
    }
}

function Uloskirjaus() {
    sessionStorage.removeItem('role')
    window.location.href = 'login.html'
}

function KayttajaNaytaKyselyt() {
    const kyselyt = JSON.parse(sessionStorage.getItem('polls')) || []
    const kyselyLista = document.getElementById('poll-list')

    kyselyLista.innerHTML = kyselyt.map((poll, index) => `
        <div class="poll-item">
            <h3>${poll.question}</h3>
            <div class="poll-options">
                ${poll.options.map((option, i) => `
                    <label>
                        <br>
                        <input type="radio" name="poll${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button class="vote-btn" onclick="Aanestys(${index})">Äänestä</button>
            <div id="results-${index}" class="poll-results" style="display:none;">
                <h4>Tulokset:</h4>
                ${poll.options.map((option, i) => `
                    <p>${option}: ${poll.votes[i]} ääntä</p>
                `).join('')}
            </div>
        </div>
    `).join('')
}

function AdminNaytaKyselyt() {
    const kyselyt = JSON.parse(sessionStorage.getItem('polls')) || []
    const adminKyselyLista = document.getElementById('admin-poll-list')

    adminKyselyLista.innerHTML = kyselyt.map((poll, index) => `
        <div class="admin-poll-item">
            <h4>${poll.question}</h4>
            <div class="poll-options">
                ${poll.options.map((option, i) => `
                    <p>${option}: ${poll.votes[i]} ääntä</p>
                `).join('')}
            </div>
            <button onclick="PoistaKysely(${index})">Poista kysely</button>
        </div>
    `).join('')
}

function Aanestys(pollIndex) {
    const valittuVastaus = document.querySelector(`input[name="poll${pollIndex}"]:checked`)
    if (valittuVastaus) {
        const kyselyt = JSON.parse(sessionStorage.getItem('polls')) || []
        kyselyt[pollIndex].votes[valittuVastaus.value]++
        sessionStorage.setItem('polls', JSON.stringify(kyselyt))
        KayttajaNaytaKyselyt()

        const tulostenNaytto = document.getElementById(`results-${pollIndex}`)
        if (tulostenNaytto) {
            tulostenNaytto.style.display = 'block'
        }
    } else {
        alert('Valitse joku vaihtoehdoista.') //Virhehandleri
    }
}

function LisaaKysely() {
    const kysymys = document.getElementById('new-poll-question').value
    const vaihtoehtoLisaa = document.querySelectorAll('.poll-option-input')
    const vaihtoehdot = []
    
    vaihtoehtoLisaa.forEach(input => {
        if (input.value.trim()) {
            vaihtoehdot.push(input.value.trim())
        }
    })

    if (kysymys && vaihtoehdot.length >= 2) {
        const kyselyt = JSON.parse(sessionStorage.getItem('polls')) || []
        //Luo JSON-yhteensopivan listan
        kyselyt.push({
            question: kysymys,
            options: vaihtoehdot,
            votes: Array(vaihtoehdot.length).fill(0)
        })
        sessionStorage.setItem('polls', JSON.stringify(kyselyt))
        AdminNaytaKyselyt()
        document.getElementById('new-poll-question').value = ''
        document.getElementById('poll-options-container').innerHTML = `
            <input type="text" class="poll-option-input" placeholder="Vaihtoehto 1"><br>
            <input type="text" class="poll-option-input" placeholder="Vaihtoehto 2"><br>`
    } else {
        alert('Kyselyssä tulee olla kysymys ja ainakin kaksi vaihtoehtoa.') //Virhehandleri
    }
}

function PoistaKysely(pollIndex) {
    let polls = JSON.parse(sessionStorage.getItem('polls')) || []
    polls.splice(pollIndex, 1)
    sessionStorage.setItem('polls', JSON.stringify(polls))
    AdminNaytaKyselyt()
}
