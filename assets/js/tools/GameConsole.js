class GameConsole
{

  viewport;
  container;

  constructor(viewport, selector) {
    this.viewport = viewport;
    this.container = document.querySelector(selector);
  }

  clear() {
    this.container.innerHTML = '';
  }

  addEntry(content) {
    const entry = document.createElement('div');
    entry.classList.add('controle-entry');
    entry.innerHTML = content;
    this.container.appendChild(entry);
  }
}

