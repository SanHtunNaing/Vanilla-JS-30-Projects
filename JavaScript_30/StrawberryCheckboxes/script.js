:root {
    --bg-strawberry: #fff5f6;
    --card-bg: #ffffff;
    --pink-soft: #ffe4e8;
    --pink-primary: #ffb3c1;
    --red-accent: #ff4d6d;
    --red-dark: #c9184a;
    --text-dark: #590d22;
    --text-muted: #a4133c;
    --border-color: #ffccd5;
    --shadow-pink: rgba(255, 77, 109, 0.15);
  
    /* Quadrant Colors */
    --q1-border: #ff4d6d;
    --q2-border: #ff758f;
    --q3-border: #ff8fa3;
    --q4-border: #ffb3c1;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  
  body {
    background-color: var(--bg-strawberry);
    background-image: 
      radial-gradient(#ffccd5 1px, transparent 1px),
      radial-gradient(#ffccd5 1px, var(--bg-strawberry) 1px);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
    color: var(--text-dark);
    min-height: 100vh;
    padding: 2.5rem 1.5rem;
    display: flex;
    justify-content: center;
  }
  
  .container {
    max-width: 1200px;
    width: 100%;
  }
  
  /* Header Section */
  .header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  
  .header-badge {
    background: var(--pink-soft);
    color: var(--red-dark);
    padding: 0.5rem 1.2rem;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--border-color);
    margin-bottom: 0.8rem;
  }
  
  .header h1 {
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--red-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .header p {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
  
  .hint-banner {
    margin-top: 1.2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: #ffffff;
    padding: 0.6rem 1.4rem;
    border-radius: 50px;
    border: 2px dashed var(--pink-primary);
    color: var(--red-dark);
    font-size: 0.92rem;
    box-shadow: 0 4px 15px var(--shadow-pink);
  }
  
  kbd {
    background: var(--pink-soft);
    border: 1px solid var(--pink-primary);
    color: var(--red-dark);
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-weight: bold;
    font-size: 0.85rem;
  }
  
  /* Form Card */
  .add-todo-card {
    background: var(--card-bg);
    padding: 1.5rem 2rem;
    border-radius: 24px;
    border: 2px solid var(--border-color);
    box-shadow: 0 10px 30px var(--shadow-pink);
    margin-bottom: 2.5rem;
  }
  
  .add-todo-form {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .input-group {
    flex: 2;
    min-width: 260px;
    position: relative;
  }
  
  .input-group input {
    width: 100%;
    padding: 0.9rem 1.2rem 0.9rem 2.8rem;
    border-radius: 14px;
    border: 2px solid var(--border-color);
    outline: none;
    font-size: 1rem;
    color: var(--text-dark);
    transition: all 0.2s;
  }
  
  .input-group input:focus {
    border-color: var(--red-accent);
    box-shadow: 0 0 0 4px rgba(255, 77, 109, 0.15);
  }
  
  .input-group i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--red-accent);
  }
  
  .select-group {
    flex: 1;
    min-width: 200px;
  }
  
  .select-group select {
    width: 100%;
    padding: 0.9rem 1.2rem;
    border-radius: 14px;
    border: 2px solid var(--border-color);
    outline: none;
    font-size: 0.95rem;
    color: var(--text-dark);
    background: white;
    cursor: pointer;
    font-weight: 600;
  }
  
  .btn-add {
    background: var(--red-accent);
    color: white;
    border: none;
    padding: 0.9rem 1.8rem;
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 6px 18px rgba(255, 77, 109, 0.3);
  }
  
  .btn-add:hover {
    background: var(--red-dark);
    transform: translateY(-2px);
  }
  
  /* Eisenhower Matrix Grid */
  .matrix-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
  
  .quadrant {
    background: var(--card-bg);
    border-radius: 24px;
    padding: 1.5rem;
    border: 2px solid var(--border-color);
    box-shadow: 0 10px 25px var(--shadow-pink);
    display: flex;
    flex-direction: column;
    min-height: 320px;
  }
  
  .quadrant.q1 { border-top: 6px solid var(--q1-border); }
  .quadrant.q2 { border-top: 6px solid var(--q2-border); }
  .quadrant.q3 { border-top: 6px solid var(--q3-border); }
  .quadrant.q4 { border-top: 6px solid var(--q4-border); }
  
  .q-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px dashed var(--pink-soft);
  }
  
  .q-header h2 {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--red-dark);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .q-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
    border-radius: 20px;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .q1 .q-badge { background: #ffe4e8; color: #c9184a; }
  .q2 .q-badge { background: #fff0f3; color: #ff4d6d; }
  .q3 .q-badge { background: #ffe4e8; color: #ff758f; }
  .q4 .q-badge { background: #f8f9fa; color: #6c757d; }
  
  .todo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1;
  }
  
  .item {
    display: flex;
    align-items: center;
    background: var(--bg-strawberry);
    padding: 0.85rem 1rem;
    border-radius: 14px;
    border: 1px solid var(--border-color);
    transition: all 0.2s;
  }
  
  .item:hover {
    background: #ffffff;
    border-color: var(--pink-primary);
    box-shadow: 0 4px 12px var(--shadow-pink);
  }
  
  /* Custom Checkbox */
  .item input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border: 2px solid var(--red-accent);
    border-radius: 6px;
    cursor: pointer;
    margin-right: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
    background: white;
  }
  
  .item input[type="checkbox"]:checked {
    background-color: var(--red-accent);
    border-color: var(--red-accent);
  }
  
  .item input[type="checkbox"]:checked::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  
  .item p {
    flex-grow: 1;
    font-size: 0.95rem;
    color: var(--text-dark);
    font-weight: 600;
    transition: all 0.2s;
    margin: 0 0.5rem;
    word-break: break-word;
  }
  
  .item input[type="checkbox"]:checked + p {
    text-decoration: line-through;
    color: #a4133c;
    opacity: 0.6;
  }
  
  .delete-btn {
    background: none;
    border: none;
    color: #ff8fa3;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.3rem 0.5rem;
    border-radius: 6px;
    transition: all 0.2s;
    opacity: 0.5;
  }
  
  .item:hover .delete-btn { opacity: 1; }
  .delete-btn:hover { color: var(--red-dark); background: #ffe4e8; }
  
  .empty-msg {
    text-align: center;
    color: #ff8fa3;
    font-size: 0.88rem;
    font-style: italic;
    margin: auto 0;
    padding: 2rem 0;
  }
  
  @media (max-width: 850px) {
    .matrix-grid { grid-template-columns: 1fr; }
  }
