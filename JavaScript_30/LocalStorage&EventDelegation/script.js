const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  if (plates.length === 0) {
    platesList.innerHTML = `<li style="color: var(--text-muted); justify-content: center;">No tapas added yet...</li>`;
    return;
  }

  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

// Event Delegation Magic!
function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

// Check/Uncheck/Clear Controls
document.getElementById('checkAllBtn').addEventListener('click', () => {
  items.forEach(item => item.done = true);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
});

document.getElementById('uncheckAllBtn').addEventListener('click', () => {
  items.forEach(item => item.done = false);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
});

document.getElementById('clearAllBtn').addEventListener('click', () => {
  items.length = 0;
  localStorage.removeItem('items');
  populateList(items, itemsList);
});

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// Initial Load
populateList(items, itemsList);
