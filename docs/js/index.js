// Functie om data toe te voegen aan de HTML
async function renderData(teamMembers) {
    // Zoek de container waar de kaarten aan moeten worden toegevoegd
    const cardContainer = document.getElementById("repeater");
    
    // Doorloop elk dataset-object
    teamMembers.forEach(data => {
        // Maak een nieuw sectie-element aan voor de kaart
        const card = document.createElement("section");
        card.classList.add("card");

        // Voeg de innerHTML voor de kaart toe
        card.innerHTML = `
            <section class="flip-card-inner">
                <section class="flip-card-front">
                    <section class="card-img">
                        <img src="${data.avatar_url}" alt="Avatar">
                    </section>
                    <section class="person-info">
                        <h1>${data.firstName} ${data.lastName}</h1>
                        <p>City: ${data.city}</p> 
                        <p>Bio: ${data.bio || 'N/A'}</p> <!-- Als er geen bio is, toon 'N/A' -->
                    </section>
                    <section class="hobbies">
                        <h2>Hobbies</h2>
                        <section>
                            ${data.hobbies.map(hobby => `<p>${hobby}</p>`).join('')}
                        </section>
                    </section>
                </section>
                <section class="flip-card-back">
                    <h1>2 truths one lie</h1> 
                    <section>
                        ${data.truthsAndLies.map(truthOrLie => `<p>${truthOrLie}</p>`).join('')}
                    </section>
                </section>
            </section>
        `;

        // Voeg de kaart toe aan de kaartcontainer
        cardContainer.appendChild(card);
    });
}

// Hoofdfunctie om gegevens op te halen en weer te geven
async function main() {
    try {
        // Haal de gegevens op van beide bronnen
        const teamMembers = await getData();
        // Render de gegevens in de HTML
        await renderData(teamMembers);
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

        console.log(dataJurien, dataLisa);
        const teamMembers = [...dataJurien, ...dataLisa];

        // Geef beide datasets terug als een array
        return teamMembers;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}

// Roep de hoofdfunctie aan om het proces te starten
main();
