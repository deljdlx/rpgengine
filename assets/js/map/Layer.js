class Layer
{
  /**
   * @type {Viewport}
   */
  viewport;

  name = '';

  fixed = false;

  /**
   * @type {Map}
   */
  map;

  /**
   * @type {boolean}
   */
  moving = false;

  constructor(viewport, name, fixed = false) {
    this.viewport = viewport;
    this.name = name;
    this.fixed = fixed;
    this.map = new Map(this.viewport);
    this.map.dom.classList.add('map-layer', 'map-layer--' + name);
    this.dom = this.viewport.dom;
  }

  getMap() {
    return this.map;
  }

  getArea(x, y) {
    return this.map.areas[x][y];
  }

  stop() {
    if(this.fixed) {
      return;
    }
    this.moving = false;
    this.map.stop();
  }

  move() {
    if(this.fixed) {
      return;
    }
    this.moving = true;
    this.map.move();
  }

  go(direction) {
    if(this.fixed) {
      return;
    }

    if(direction === 'left') {
      return this.map.goLeft();  
    }
    if(direction === 'right') {
      return this.map.goRight();  
    }
    if(direction === 'up') {
      return this.map.goUp();  
    }
    if(direction === 'down') {
      return this.map.goDown();  
    }
  }

  appendChild(element) {
    this.map.dom.appendChild(element);
  }
}