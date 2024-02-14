async function main() {
    const fetches = await getData();
    await renderData(fetches);
}

async function getData() {
    try {
        // Fetch Jurien's JSON data
        const responseJurien = await fetch('https://jurienwaijenberg.github.io/web-app-from-scratch-2324/info.json');
        const dataJurien = await responseJurien.json();

        // Fetch data Lisa from the JSON file
        const responseLisa = await fetch('https://raw.githubusercontent.com/LisaxLF/web-app-from-scratch-2324/main/info.json');
        const dataLisa = await responseLisa.json();
        
        console.log(dataJurien, dataLisa);

        return [...dataJurien, dataLisa]; // Combine both datasets into one array
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

async function renderData(datasets) {
    // render data
    const app = document.getElementById('repeater');
    
    datasets.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h1>${data.firstName}</h1>
            <p>${data.lastName}</p>
            <p>Age: ${data.age}</p>
            <p>City: ${data.city}</p>
        `;
        app.appendChild(div);
    });
}

main()
