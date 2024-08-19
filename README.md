# 662
UML Use Case

#663
Käyttötapauskuvaukset:
  1) Kirjaudu
     - käyttäjä ja admin
     - käynnistys
     - kirjaudu sisään tunnuksilla
     - oikeat tunnukset
     - käyttäjänimen ja salasanan syöttäminen
     - väärät tunnukset => ilmoitus
  2) Luo tunnukset
     - käyttäjä
     - kirjaudu-ruudun linkki
     - luo uudet tunnukset
     - tunnukset luotu oikein
     - käyttäjänimen ja salasanan luominen
     - käyttäjänimi olemassa => uusi yritys
  3) Äänestys
     - käyttäjä
     - kirjaudu sisään käyttäjä-tunnuksilla
     - valitse äänestys ja äänestä
     - valitse jokin vaihtoehdoista ja äänestä
     - vaihtoehto valittu ja painettu äänestä-nappia => näe tulokset
     - vaihtoehtoa ei valittu ennen äänestystä => ilmoitus
  4) Luo äänestys
     - Admin
     - kirjaudu sisään admin-tunnuksilla
     - Aseta kysymys ja vaihtoehdot => luo uusi äänestys
     - Kysymys on ja min. kaksi vaihtoehtoa
     - esiehto täyttyy ja luo-nappia painettu
     - ei kysymystä tai yksi vaihtoehto => ilmoitus
  5) Poista äänestys
     - Admin
     - kirjaudu sisään admin-tunnuksilla
     - poistettavan äänestyksen valinta
     - äänestys luotu
     - esiehto täyttyy ja poista-nappia painetaan
     - poista-nappia ei paineta => ei poistoa
