const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const nameDisplay = document.getElementById("creature-name");
const idDisplay = document.getElementById("creature-id");
const weightDisplay = document.getElementById("weight");
const heightDisplay = document.getElementById("height");
const typesDisplay = document.getElementById("types");
const hpVal = document.getElementById("hp");
const attackVal = document.getElementById("attack");
const defenseVal = document.getElementById("defense");
const spAttackVal = document.getElementById("special-attack");
const spDefenseVal = document.getElementById("special-defense");
const speedVal = document.getElementById("speed");

const getStat = (stats, statName) => {
  const stat = stats.find((s) => s.name === statName);
  return stat ? stat.base_stat : "";
};

const clearUI = () => {
  nameDisplay.textContent = "";
  idDisplay.textContent = "";
  weightDisplay.textContent = "";
  heightDisplay.textContent = "";
  typesDisplay.innerHTML = "";
  hpVal.textContent = "";
  attackVal.textContent = "";
  defenseVal.textContent = "";
  spAttackVal.textContent = "";
  spDefenseVal.textContent = "";
  speedVal.textContent = "";
};

const updateUI = (data) => {
  nameDisplay.textContent = data.name.toUpperCase();
  idDisplay.textContent = #${data.id};
  weightDisplay.textContent = Weight ${data.weight};
  heightDisplay.textContent = Height ${data.height};

  hpVal.textContent = getStat(data.stats, "hp");
  attackVal.textContent = getStat(data.stats, "attack");
  defenseVal.textContent = getStat(data.stats, "defense");
  spAttackVal.textContent = getStat(data.stats, "special-attack");
  spDefenseVal.textContent = getStat(data.stats, "special-defense");
  speedVal.textContent = getStat(data.stats, "speed");

  typesDisplay.innerHTML = "";
  data.types.forEach((t) => {
    const typeEl = document.createElement("span");
    typeEl.textContent = t.name.toUpperCase();
    typesDisplay.appendChild(typeEl);
  });
};

const getCreature = async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    // Correct FCC endpoint
    const res = await fetch(
      https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}
    );

    if (!res.ok) {
      clearUI();
      alert("Creature not found");
      return;
    }

    const data = await res.json();
    updateUI(data);
  } catch (error) {
    clearUI();
    alert("Creature not found");
  }
};

searchButton.addEventListener("click", getCreature);