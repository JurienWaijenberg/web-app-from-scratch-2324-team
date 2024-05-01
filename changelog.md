# Changelog

## Week 1

De eerste week zijn we met zijn vieren begonnen met de groeps opdracht. De eerste twee dagen hebben we nagedacht over wat we gaan maken en wat het thema van de website wordt. We hebben uiteindelijk besloten om een kook gerelateerde website te maken.

Na een aantal dagen kwamen Katarina en Raul er achter dat deze minor niks voor hun is. Zij konden gelukkig nog terecht bij een andere minor. Het nadeel was alleen dat ons groepje van vier naar twee(Lisa en Juriën) is gegaan.

Om de groeps website te maken moet iedereen zijn individuele website ook werken. Hier hebben we ons dan ook de rest van de week op gefocused.

## Week twee

In week twee hebben we besloten om het concept te versimpelen zodat het project nog enig sinds haalbaar wordt. We hebben er voor gekozen om onze data in twee flipboxen te laden. Op de voorkant is onze info te zien en op de achterkant zijn de 2 truths one lie te zien.

Lisa heeft hier een ontwerp voor gemaakt.

![Schermafbeelding website](https://github.com/JurienWaijenberg/web-app-from-scratch-2324-team/blob/4d5e1049a781a942637f9855cb48bca7f7389270/docs/images/Schermafbeelding-ontwerp.jpeg)

Jurien heeft vervolgens dit ontwerp in code omgezet. Nu de blokken gecodeert en gestyled zijn heeft Lisa het script geschreven om de data op te halen en te verwerken op de home pagina.

In de code hieronder is te zien hoe de twee API's opgehaald worden.

```js
// Functie om gegevens op te halen van beide bronnen
async function getData() {
    try {
        // Fetch de JSON-gegevens van Jurien
        const responseJurien = await fetch('https://jurienwaijenberg.github.io/web-app-from-scratch-2324/info.json');
        const dataJurien = await responseJurien.json();

        // Fetch de JSON-gegevens van Lisa
        const responseLisa = await fetch('https://raw.githubusercontent.com/LisaxLF/web-app-from-scratch-2324/main/info.json');
        const dataLisa = await responseLisa.json();

        const teamMembers = [...dataJurien, ...dataLisa];

        // Geef beide datasets terug als een array
        return teamMembers;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}
```

In de code hieronder is te zien hoe vervolgens deze data in een repeater wordt toegevoegd aan de home pagina. Los van dat de data uit verschillende API's komt is de stuctuur van de API wel het zelfde. Dit maakt het mogelijk om het samen te voegen.

```js
// Functie om data toe te voegen aan de HTML
async function renderData(teamMembers) {
    // Zoek de container waar de kaarten aan moeten worden toegevoegd
    const cardContainer = document.getElementById("repeater");

    // Doorloop elk dataset-object
    teamMembers.forEach(data => {
        // Maak een nieuw sectie-element aan voor de kaart
        const card = document.createElement("section");
        card.classList.add("card");

        // De vragen uit de truthsAndLies moeten een random volgorde krijgen
        data.truthsAndLies.sort(() => Math.random() - 0.5);
        
        // Voeg de innerHTML voor de kaart toe
        card.innerHTML = `
            <section class="flip-card-inner">
                <section class="flip-card-front">
                    <section class="person-info">
                        <h1>${data.firstName} ${data.lastName}</h1>
                        <p>${data.city}</p> 
                        <p>${data.bio || 'N/A'}</p> <!-- Als er geen bio is, toon 'N/A' -->
                    </section>
                    <section class="card-img">
                        <img src="${data.avatar_url}" alt="Avatar">
                        <section class="hobbies">
                            <ul>
                                ${data.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
                            </ul>
                        </section>
                    </section>
                </section>
                <section class="flip-card-back">
                    <h1>2 truths one lie</h1> 
                    <section>
                        ${data.truthsAndLies.map(truthOrLie => `<button>${truthOrLie}</button>`).join('')}
                    </section>
                </section>
            </section>
        `;

        // Voeg de kaart toe aan de kaartcontainer
        cardContainer.appendChild(card);
    });
}
```

Om het project af te ronden heeft Lisa het ontwerp aangepast waardoor de website visueel aantrekkelijker is geworden. Daarnaast heeft ze een functie geschreven waardoor je kan klikken op de 2 truths one lie zodat de gebruiker kan zien wat wat is. Dit maakt het project echt af. De functie is hieronder te zien.

```js
async function main() {
    try {
        // Haal de gegevens op van beide bronnen
        const teamMembers = await getData();
        // Render de gegevens in de HTML
        await renderData(teamMembers);

        // TODO get all buttons
        const buttons = document.querySelectorAll('button');
        console.log("These are the buttons inputs", buttons);

        // Eventlistener toevoegen aan de knoppen
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const userChoice = e.target.innerText;
                const personCard = button.closest('.card');
                const personName = personCard.querySelector('h1').innerText;

                // TODO check the truths and lies
                checkTruthsAndLies(userChoice, personName, e);
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Functie om te controleren truths and lies van beide bronnen
async function checkTruthsAndLies(userChoice, personName, e) {
    // Haal de data op van beide bronnen
    const teamMembers = await getData();

    // Zoek de juiste persoon in de teamleden
    const selectedPerson = teamMembers.find(member => `${member.firstName} ${member.lastName}` === personName);

    // Haal de waarheden en leugens op van de geselecteerde persoon
    const truthsAndLies = selectedPerson.truthsAndLies;

    // De laatste waarheid of leugen is de waarheid
    const truth = truthsAndLies[truthsAndLies.length - 1];

    // Controleer of de waarheid overeenkomt met de gebruikerskeuze
    if (userChoice === truth) {
        console.log(`You have chosen the truth`);
        e.target.classList.add('correct')
    } else {
        console.log(`You have chosen a lie`);
        e.target.classList.add('incorrect')
    }
}
```

## Conclusie

Ondanks de hoeveelheid tijd we hier voor hadden in combinatie met de uitval van twee teamgenoten, zijn we toch trots op het eindresultaat. We hebben hard gewerkt om iets werkens op te leveren.