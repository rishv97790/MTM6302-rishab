document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('pokemon-gallery');
    const loadMoreButton = document.getElementById('load-more');
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    const caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || [];

    // Function to parse Pokémon ID from URL
    function parseUrl(url) {
        return url.split('/').filter(Boolean).pop();
    }

    // Function to load Pokémon data
    async function loadPokemon(url) {
        const response = await fetch(url);
        const data = await response.json();
        nextUrl = data.next;
        data.results.forEach(pokemon => addPokemonToGallery(pokemon));
    }

    // Function to add Pokémon to gallery
    async function addPokemonToGallery(pokemon) {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png" alt="${pokemon.name}">
            <h5>${pokemon.name}</h5>
            <button class="btn btn-secondary btn-sm catch-release">${caughtPokemon.includes(details.id) ? 'Release' : 'Catch'}</button>
        `;

        pokemonCard.querySelector('img').addEventListener('click', () => showPokemonDetails(details));
        gallery.appendChild(pokemonCard);
    }

    // Function to show Pokémon details
    function showPokemonDetails(details) {
        const detailsDiv = document.getElementById('pokemon-details');
        detailsDiv.innerHTML = `
            <h2>${details.name}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png" alt="${details.name}">
            <p>Height: ${details.height}</p>
            <p>Weight: ${details.weight}</p>
            <button class="btn btn-secondary" onclick="closeDetails()">Close</button>
        `;
        detailsDiv.style.display = 'block';
    }

    // Function to close Pokémon details
    window.closeDetails = function() {
        document.getElementById('pokemon-details').style.display = 'none';
    }

    loadMoreButton.addEventListener('click', () => {
        if (nextUrl) {
            loadPokemon(nextUrl);
        }
    });

    // Initial load
    loadPokemon(nextUrl);
});