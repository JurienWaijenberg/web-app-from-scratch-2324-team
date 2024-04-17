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

// Start de applicatie
main();