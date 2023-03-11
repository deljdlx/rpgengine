class Application
{

  _elementsClasses = {};
  _viewport;
  listeners = {};


  constructor(selector, width, height) {
    Application.mainInstance = this;
    this._viewport = new Viewport(
      this,
      document.querySelector(selector),
      0,
      0,
      width,
      height,
    );
  }

  addEventListener(name, callback) {
    if(typeof(this.listeners[name]) === 'undefined') {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);

    return this.listeners[name].length - 1;
  }

  handle(name, data = {}) {
    if(typeof(this.listeners[name]) !== 'undefined') {
      this.listeners[name].map(callback => {
        callback(data);
      });
    }
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


