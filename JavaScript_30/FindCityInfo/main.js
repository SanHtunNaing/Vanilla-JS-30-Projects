const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const detailsCard = document.querySelector('#details');

let currentData = [];

async function searchGlobalCities(query) {
  if (!query || query.length < 2) {
    suggestions.style.display = 'block';
    suggestions.innerHTML = `<li>Filter for a city</li><li>or a state</li>`;
    detailsCard.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=6`);
    currentData = await response.json();
    displayMatches(currentData, query);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

function displayMatches(places, searchText) {
  if (places.length === 0) {
    suggestions.style.display = 'block';
    suggestions.innerHTML = `<li>No location found</li>`;
    return;
  }

  suggestions.style.display = 'block';
  const html = places.map((place, index) => {
    const regex = new RegExp(searchText, 'gi');
    const cityName = place.display_name.replace(regex, `<span class="hl">${searchText}</span>`);

    return `
      <li data-index="${index}">
        <span class="name" style="pointer-events: none;">${cityName}</span>
        <span class="coords" style="pointer-events: none;">Lat: ${parseFloat(place.lat).toFixed(2)}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}


suggestions.addEventListener('click', function(e) {
  const li = e.target.closest('li');
  if (!li || li.dataset.index === undefined) return;

  const selectedPlace = currentData[li.dataset.index];
  if (!selectedPlace) return;


  searchInput.value = selectedPlace.name || selectedPlace.display_name.split(',')[0];

  suggestions.style.display = 'none';
  
  detailsCard.style.display = 'block';
  detailsCard.innerHTML = `
    <h3>📍 ${selectedPlace.display_name.split(',')[0]}</h3>
    <p><strong>Full Name:</strong> ${selectedPlace.display_name}</p>
    <p><strong>Latitude:</strong> ${selectedPlace.lat} | <strong>Longitude:</strong> ${selectedPlace.lon}</p>
    <p><strong>Type:</strong> ${selectedPlace.type.toUpperCase()}</p>
  `;
});

// Debouncing Input Event
let timeout = null;
searchInput.addEventListener('input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    searchGlobalCities(this.value);
  }, 300);
});

function displayMatches(places, searchText) {
    if (!places || places.length === 0) {
      suggestions.style.display = 'block';
      suggestions.innerHTML = `<li>No location found</li>`;
      return;
    }
  
    suggestions.style.display = 'block';
    const html = places.map((place, index) => {
      const regex = new RegExp(searchText, 'gi');
      const cityName = place.display_name.replace(regex, `<span class="hl">${searchText}</span>`);
  
      return `
        <li data-index="${index}" style="animation-delay: ${index * 0.05}s;">
          <span class="name">${cityName}</span>
          <span class="coords">Lat: ${parseFloat(place.lat).toFixed(2)}</span>
        </li>
      `;
    }).join('');
  
    suggestions.innerHTML = html;
  }
