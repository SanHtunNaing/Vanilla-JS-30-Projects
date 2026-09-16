const initialPerson = {
    name: 'Wes Bos',
    age: 80,
    social: { twitter: '@wesbos' }
  };
  
  const initialPlayers = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
  
  let statePerson = JSON.parse(JSON.stringify(initialPerson));
  let statePlayers = [...initialPlayers];
  
  function updateTerminal(original, target, message, isMutated = false) {
    const outOriginal = document.getElementById('outOriginal');
    const outTarget = document.getElementById('outTarget');
    const statusToast = document.getElementById('statusToast');
  
    if (outOriginal) outOriginal.innerText = JSON.stringify(original, null, 2);
    if (outTarget) outTarget.innerText = JSON.stringify(target, null, 2);
    
    if (statusToast) {
      statusToast.innerHTML = `<i class="fa-solid fa-bolt"></i> ${message}`;
      if (isMutated) {
        statusToast.style.background = 'rgba(244, 63, 94, 0.25)';
        statusToast.style.borderColor = '#f43f5e';
        statusToast.style.color = '#fda4af';
      } else {
        statusToast.style.background = 'rgba(168, 85, 247, 0.25)';
        statusToast.style.borderColor = '#a855f7';
        statusToast.style.color = '#d8b4fe';
      }
    }
  }
  
  function resetState() {
    statePerson = JSON.parse(JSON.stringify(initialPerson));
    statePlayers = [...initialPlayers];
    updateTerminal(statePerson, statePlayers, "State reset to default initial values.");
  }
  
  // Global Execution Functions
  window.runArrayRef = function() {
    resetState();
    const team = statePlayers;
    team[3] = 'LUX (MUTATED!)';
    updateTerminal(statePlayers, team, "MUTATION: Modifying team[3] changed the ORIGINAL array! (Shared Memory Reference)", true);
  };
  
  window.runArrayCopy = function() {
    resetState();
    const teamCopy = [...statePlayers];
    teamCopy[3] = 'LUX (ISOLATED)';
    updateTerminal(statePlayers, teamCopy, "SUCCESS: Spread copy [...players] created a isolated array. Original data is safe!");
  };
  
  window.runObjRef = function() {
    resetState();
    const cap = statePerson;
    cap.age = 99;
    updateTerminal(statePerson, cap, "MUTATION: Modifying cap.age changed statePerson.age to 99! (Shared Memory Reference)", true);
  };
  
  window.runObjShallow = function() {
    resetState();
    const cap2 = Object.assign({}, statePerson, { age: 12 });
    cap2.social.twitter = '@coolman (MUTATED!)';
    updateTerminal(statePerson, cap2, "SHALLOW WARNING: Top level copied safely, but nested social.twitter mutated original data!", true);
  };
  
  window.runObjDeep = function() {
    resetState();
    const dev = structuredClone(statePerson);
    dev.social.twitter = '@coolman (DEEP COPIED)';
    updateTerminal(statePerson, dev, "SUCCESS: structuredClone() isolated all nested levels completely!");
  };
  
  // Initial load trigger
  document.addEventListener('DOMContentLoaded', () => {
    resetState();
  });
