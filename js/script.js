const obtenerDigimonAsyncAwait = async () => {
    try {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon');

        if (!response.ok) {
            throw new Error('Error al obtener los datos de Digimon.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const mdigimon = async () => {
    const digimonRow = document.getElementById('digimonRow');

    try {
        const digimones = await obtenerDigimonAsyncAwait();
        localStorage.setItem("digimones", JSON.stringify(digimones));

        const searchInput = document.getElementById('searchInput');

        const mostrarDigimons = (term) => {
            digimonRow.innerHTML = '';
            const row = document.createElement('div');
            row.classList.add('row');

            digimones.forEach((digimon) => {
                if (digimon.name.toLowerCase().includes(term.toLowerCase())) {
                    const cardCol = document.createElement('div');
                    cardCol.classList.add('col-sm-2');

                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.classList.add('mt-2');
                    card.classList.add('mb-2');
                    

                    const cardImg = document.createElement('img');
                    cardImg.classList.add('card-img-top');
                    cardImg.src = digimon.img;

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = digimon.name;

                    const cardText = document.createElement('p');
                    cardText.classList.add('card-text');
                    cardText.textContent = `Nivel: ${digimon.level}`;

                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);

                    card.appendChild(cardImg);
                    card.appendChild(cardBody);

                    cardCol.appendChild(card);
                    row.appendChild(cardCol);
                }
            });

            digimonRow.appendChild(row);
        };

        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            mostrarDigimons(searchTerm);
        });

        mostrarDigimons('');
    } catch (error) {
        throw error;
    }
}

mdigimon();


