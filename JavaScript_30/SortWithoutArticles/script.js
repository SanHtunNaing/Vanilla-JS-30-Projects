const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Any Given Day',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog'
  ];
  
  const bandsList = document.querySelector('#bands');
  const sortBtn = document.getElementById('sortBtn');
  const resetBtn = document.getElementById('resetBtn');
  const toggleGuideBtn = document.getElementById('toggleGuideBtn');
  const guideCard = document.getElementById('guideCard');
  
  // 1. Function to strip articles for logic comparison
  function strip(bandName) {
    return bandName.replace(/^(a |an |the )/i, '').trim();
  }
  
  // 2. Render function
  function displayBands(list) {
    bandsList.innerHTML = list.map(band => `<li>${band}</li>`).join('');
  }
  
  // Initial Render
  displayBands(bands);
  
  // 3. Sort Action
  sortBtn.addEventListener('click', () => {
    const sorted = [...bands].sort((a, b) => (strip(a) > strip(b) ? 1 : -1));
    displayBands(sorted);
  });
  
  // 4. Reset Action (Original Order)
  resetBtn.addEventListener('click', () => {
    displayBands(bands);
  });
  
  // 5. Toggle Study Guide
  toggleGuideBtn.addEventListener('click', () => {
    guideCard.classList.toggle('hidden');
  });
