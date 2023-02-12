
class Map {

  /**
   * @type {Viewport}
   */
  viewport;

  areas = {
    '-1':  { '-1': null, '0': null, '1': null},
    '0':  { '-1': null, '0': null, '1': null},
    '1':  { '-1': null, '0': null, '1': null},
  }

  /**
   * @type {DomElement}
   */
  dom;

  constructor(viewport) {
    this.viewport = viewport;
    
    this.dom = document.querySelector('.map');
    this.dom = document.createElement('div');
    this.dom.classList.add('map');

    this.viewport.dom.appendChild(this.dom);

    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.areas[x][y] = new MapArea(this, x, y);
        this.dom.appendChild(this.areas[x][y].dom);
      }
    }
  }

  loadArea(x, y) {
    if(typeof this.areas[x] === 'undefined') {
      this.areas[x] = {}
    }
      
    if(typeof(this.areas[x][y]) === 'undefined') {
      const left = x * this.viewport.width;
      const top = y * this.viewport.height;
      this.areas[x][y] = new MapArea(this, x, y);
      this.dom.appendChild(this.areas[x][y].dom);
    }
  }

  loadAreasAround(x, y) {

    this.loadArea(x - 1, y - 1);
    this.loadArea(x, y - 1);
    this.loadArea(x + 1, y - 1);

    this.loadArea(x - 1, y);
    this.loadArea(x, y);
    this.loadArea(x + 1, y);

    this.loadArea(x - 1, y + 1);
    this.loadArea(x, y + 1);
    this.loadArea(x + 1, y + 1);
    
    this.deleteArea(x - 1, y + 2);
    this.deleteArea(x, y + 2);
    this.deleteArea(x + 1, y + 2);

    this.deleteArea(x - 1, y - 2);
    this.deleteArea(x, y - 2);
    this.deleteArea(x + 1, y - 2);

    this.deleteArea(x + 2, y - 2);
    this.deleteArea(x + 2, y - 1);
    this.deleteArea(x + 2, y);
    this.deleteArea(x + 2, y + 1);
    this.deleteArea(x + 2, y + 2);

    this.deleteArea(x - 2, y - 2);
    this.deleteArea(x - 2, y - 1);
    this.deleteArea(x - 2, y);
    this.deleteArea(x - 2, y + 1);
    this.deleteArea(x - 2, y + 2);
  }

  deleteArea(x, y) {
    if(typeof this.areas[x] !== 'undefined') {
      if(typeof this.areas[x][y] !== 'undefined') {
        this.areas[x][y].dom.remove();
        delete(this.areas[x][y]);
      }
    }
  }
}
