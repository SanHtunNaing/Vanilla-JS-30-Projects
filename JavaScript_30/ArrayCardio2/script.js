// --- Source Data ---
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];
  
  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 822342 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ];
  
  // Display Initial Data on Page Load
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('people-data').textContent = JSON.stringify(people, null, 2);
    document.getElementById('comments-data').textContent = JSON.stringify(comments, null, 2);
  });
  
  // 1. Array.prototype.some()
  function runSome() {
    const isAdult = people.some(person => {
      const currentYear = (new Date()).getFullYear();
      return currentYear - person.year >= 19;
    });
  
    const resultEl = document.getElementById('some-result');
    resultEl.innerHTML = `Result: <strong style="color: #4ade80;">${isAdult}</strong>\n\nExplanation: At least one person is 19 or older.`;
  }
  
  // 2. Array.prototype.every()
  function runEvery() {
    const allAdults = people.every(person => {
      const currentYear = (new Date()).getFullYear();
      return currentYear - person.year >= 19;
    });
  
    const resultEl = document.getElementById('every-result');
    resultEl.innerHTML = `Result: <strong style="color: #f87171;">${allAdults}</strong>\n\nExplanation: Not everyone is >= 19 (Lux was born in 2015).`;
  }
  
  // 3. Array.prototype.find()
  function runFind() {
    const comment = comments.find(comment => comment.id === 822342);
  
    const resultEl = document.getElementById('find-result');
    resultEl.textContent = `Found Object:\n` + JSON.stringify(comment, null, 2);
  }
  
  // 4. Array.prototype.findIndex() & Delete using Spread
  function runFindIndex() {
    const index = comments.findIndex(comment => comment.id === 822342);
  
    // Create a new array without the item
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];
  
    const resultEl = document.getElementById('findindex-result');
    resultEl.textContent = `Target Index: ${index}\n\nNew Array (Item Removed):\n` + JSON.stringify(newComments, null, 2);
  }
