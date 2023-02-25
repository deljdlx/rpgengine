class Application
{

  _elementsClasses = {};
  _viewport;


  constructor(selector, width, height) {
    this._viewport = new Viewport(
      this,
      document.querySelector(selector),
      0,
      0,
      width,
      height,
    );
  }

  registerElement(name, constructorName) {
    this._elementsClasses[name] = constructorName;
  }

  instanciate(name) {
    return new this._elementsClasses[name];
  }

  async run() {
    await this._viewport.run();
    this._viewport.render();
    this._viewport.renderDebug();
  }

  getViewport() {
    return this._viewport;
  }


  async fetchArea(x, y) {
    return fetch('http://localhost/rpgengine/backend/areas/0_0.php').then(response => response.json());
  }
}


