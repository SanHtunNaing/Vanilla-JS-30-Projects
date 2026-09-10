const screenConsole = document.querySelector('#screenConsole');
const detailTitle = document.querySelector('#detailTitle');
const detailExplanation = document.querySelector('#detailExplanation');
const detailCode = document.querySelector('#detailCode');

// Explanations Dataset (English)
const tricksData = {
  1: {
    title: "1. Regular Console (console.log)",
    explanation: "Standard method to print basic string outputs, numbers, variables, or objects directly to the browser console.",
    code: `console.log('Hello World');`,
    action: () => {
      console.log('Hello World');
      printScreen('Regular Log: "Hello World"');
    }
  },
  2: {
    title: "2. Interpolated Log (%s)",
    explanation: "Allows string substitution using placeholders like %s. Useful for formatting string outputs dynamically (similar to C programming style).",
    code: `console.log('Hello I am a %s string!', '💩');`,
    action: () => {
      console.log('Hello I am a %s string!', '💩');
      printScreen('Interpolated: "Hello I am a 💩 string!"');
    }
  },
  3: {
    title: "3. Styled Console (%c)",
    explanation: "Applies custom inline CSS styles to console text output using the %c directive. Perfect for creating eye-catching log highlights or credit banners.",
    code: `console.log('%c Great Job!', 'background: #facc15; color: #713f12; font-size: 16px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');`,
    action: () => {
      console.log('%c Great Job!', 'background: #facc15; color: #713f12; font-size: 16px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
      printScreen('Styled Log: Outputted styled text in F12 browser console!');
    }
  },
  4: {
    title: "4. Warning Log (console.warn)",
    explanation: "Displays a yellow alert warning box with a warning icon in the console. Ideal for flagging deprecated functions or potential runtime issues.",
    code: `console.warn('Warning: Low battery level detected!');`,
    action: () => {
      console.warn('Warning: Low battery level detected!');
      printScreen('Warning: "Low battery level detected!"', 'warn');
    }
  },
  5: {
    title: "5. Error Log (console.error)",
    explanation: "Outputs a prominent red error box along with a full stack trace to help trace exactly where an application error occurred.",
    code: `console.error('Error: Failed to connect to server!');`,
    action: () => {
      console.error('Error: Failed to connect to server!');
      printScreen('Error: "Failed to connect to server!"', 'error');
    }
  },
  6: {
    title: "6. Info Log (console.info)",
    explanation: "Displays informational messages in the console, often accompanied by an 'i' info icon depending on the browser vendor.",
    code: `console.info('Info: System background sync completed.');`,
    action: () => {
      console.info('Info: System background sync completed.');
      printScreen('Info: "System background sync completed."', 'info');
    }
  },
  7: {
    title: "7. Testing / Assert (console.assert)",
    explanation: "Evaluates a condition and logs an error message ONLY if the condition evaluates to false. Useful for basic inline assertion debugging.",
    code: `const age = 15;\nconsole.assert(age >= 18, 'Underage! User is not an adult.');`,
    action: () => {
      const age = 15;
      console.assert(age >= 18, 'Underage! User is not an adult.');
      printScreen('Console Assert (Failed): "Underage! User is not an adult."', 'error');
    }
  },
  8: {
    title: "8. Clear Console (console.clear)",
    explanation: "Clears all previous logs from the browser console screen to give developers a clean workspace.",
    code: `console.clear();`,
    action: () => {
      console.clear();
      screenConsole.innerHTML = '<span class="log-line text-muted">> Console Cleared.</span>';
    }
  },
  9: {
    title: "9. Viewing DOM Elements (log vs dir)",
    explanation: "console.log() renders the element as an HTML tree node, while console.dir() expands the element as a full JavaScript object with all properties and methods visible.",
    code: `const p = document.querySelector('p');\nconsole.log(p); // Shows HTML tag\nconsole.dir(p); // Shows JS Object properties`,
    action: () => {
      const p = document.querySelector('.header p');
      console.log(p);
      console.dir(p);
      printScreen('DOM View: Check browser DevTools console to see the difference between log() and dir().');
    }
  },
  10: {
    title: "10. Grouping Logs (console.group)",
    explanation: "Organizes multiple related logs inside a collapsible nested folder group. Helps keep complex console outputs neat and manageable.",
    code: `dogs.forEach(dog => {\n  console.groupCollapsed(\`\${dog.name}\`);\n  console.log(\`Name: \${dog.name}\`);\n  console.log(\`Age: \${dog.age}\`);\n  console.groupEnd(\`\${dog.name}\`);\n});`,
    action: () => {
      const dogs = [{ name: 'Snickers', age: 2 }, { name: 'Hugo', age: 8 }];
      dogs.forEach(dog => {
        console.groupCollapsed(`${dog.name}`);
        console.log(`Name: ${dog.name}`);
        console.log(`Age: ${dog.age}`);
        console.groupEnd(`${dog.name}`);
      });
      printScreen('Grouped Logs: Grouped "Snickers" & "Hugo" inside browser console.');
    }
  },
  11: {
    title: "11. Counting (console.count)",
    explanation: "Tracks and increments the number of times console.count() has been called with a specific label. Great for tracking loop iterations or button clicks.",
    code: `console.count('User Clicked');\nconsole.count('User Clicked');`,
    action: () => {
      console.count('User Clicked');
      printScreen('Console Counted "User Clicked". Check browser console for running count total.');
    }
  },
  12: {
    title: "12. Timing Operations (console.time)",
    explanation: "Measures the exact time (in milliseconds) taken for an operation or API call to complete using matching console.time() and console.timeEnd() labels.",
    code: `console.time('fetch-data');\nfetch('https://api.github.com/users/wesbos')\n  .then(res => res.json())\n  .then(data => console.timeEnd('fetch-data'));`,
    action: () => {
      console.time('fetch-data');
      fetch('https://api.github.com/users/wesbos')
        .then(res => res.json())
        .then(() => {
          console.timeEnd('fetch-data');
          printScreen('Timing Operation: API Fetch complete! Time logged in browser console.');
        });
    }
  },
  13: {
    title: "13. Table View (console.table)",
    explanation: "Displays arrays of objects or 2D arrays as a clean, formatted interactive table with column headers for much easier readability.",
    code: `const users = [\n  { name: 'Aung Aung', age: 25 },\n  { name: 'Mya Mya', age: 22 }\n];\nconsole.table(users);`,
    action: () => {
      const users = [
        { name: 'Aung Aung', age: 25 },
        { name: 'Mya Mya', age: 22 }
      ];
      console.table(users);
      printScreen('Table View: Rendered array as an interactive table in browser console.');
    }
  },
  14: {
    title: "14. DOM Attribute Breakpoints",
    explanation: "A browser DevTools feature. Right-click any DOM element in DevTools -> 'Break on' -> 'Attribute modifications'. DevTools will automatically pause script execution whenever that element's attributes are modified.",
    code: `// DevTools Feature:\n// Right-click element -> Break on -> Attribute modifications`,
    action: () => {
      const card = document.querySelector('#breakPointCard');
      card.style.color = card.style.color === 'red' ? '#0f172a' : 'red';
      console.log('DOM Attribute modified!');
      printScreen('DOM Breakpoint: Attribute modified! (Use DevTools "Break on" to pause code execution live).');
    }
  }
};

function printScreen(text, type = 'normal') {
  const line = document.createElement('div');
  line.className = 'log-line';

  if (type === 'warn') line.className += ' text-warn';
  if (type === 'error') line.className += ' text-error';
  if (type === 'info') line.className += ' text-info';

  line.innerHTML = `> ${text}`;
  screenConsole.appendChild(line);
  screenConsole.scrollTop = screenConsole.scrollHeight;
}

function runTrick(id) {
  const data = tricksData[id];
  if (!data) return;

  // Update Detail Explanation Box
  detailTitle.innerHTML = `<i class="fa-solid fa-book-open"></i> ${data.title}`;
  detailExplanation.textContent = data.explanation;
  detailCode.textContent = data.code;

  // Run Trick Action
  data.action();

  // Scroll smoothly to detail box
  document.querySelector('#detailBox').scrollIntoView({ behavior: 'smooth' });
}
