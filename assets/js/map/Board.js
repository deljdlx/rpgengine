class Board extends Element
{
  areas = {};

  constructor(viewport) {
    super(0, 0, 800, 800);
    this._viewport = viewport;
    this._application = viewport.getApplication();

    this.renderer = new BoardRenderer(this);
  }

  initialize() {
    for(let x = -1 ; x < 2 ; x++) {
      for(let y = -1 ; y < 2 ; y++) {
        this.createAreaAt(x, y);
      }
    }
  }

  async initializeAsync() {
    let promises = []
    for(let x = -1 ; x < 2 ; x++) {
      for(let y = -1 ; y < 2 ; y++) {
        promises.push(this.loadAreaAsync(x, y));
      }
    }

    return Promise.all(promises);
  }

  async loadAreaAsync(x, y) {
    if(!this.areaExistsAt(x, y)) {

      const area = this.createAreaAt(x, y);
      return this._application.fetchArea(x, y).then(data => {
        data.forEach(descriptor => {
          area.addElement(
            descriptor.x,
            descriptor.y,
            this._application.instanciate(descriptor.element),
          );
        });
        return area;
      });
    }
    return this.areas[x][y];
  }


  loadArea(x, y) {
    if(!this.areaExistsAt(x, y)) {
      const area = this.createAreaAt(x, y);

      this.getRenderer().update();

      return area;
    }

    return this.areas[x][y];
  }

  getAreaAt(x, y) {
    if(!this.areaExistsAt(x, y)) {
      this.loadArea(x, y);
    }

    return this.areas[x][y];
  }

  freeArea(x, y) {
    if(!this.areaExistsAt(x, y)) {
      return false;
    }
    const area = this.areas[x][y];
    area.getRenderer().clear();
    delete this.areas[x][y];

    return area;
  }

  areaExistsAt(x, y) {
    if(typeof(this.areas[x]) === 'undefined') {
      return false;
    }
    if(typeof(this.areas[x][y]) === 'undefined') {
      return false;
    }
    return true;
  }

  createAreaAt(x, y) {
    if(typeof(this.areas[x]) === 'undefined') {
      this.areas[x] = {};
    }
    if(typeof(this.areas[x][y]) === 'undefined') {
      this.areas[x][y] = {};
    }
    const area = new Area(this, 0 , 0);
    this.areas[x][y] = area;
    this.addElement(x * this.width(), y * this.height(), area);
    return this.areas[x][y];
  }

  getAreas() {
    return this.areas;
  }
}

