class Board extends Element
{
  _viewport;
  areas = {};
  // _hasSprite = false;

  constructor(viewport) {
    super(0, 0, 800, 800);

    this._viewport = viewport;
    this._application = viewport.getApplication();

    this.renderer = new BoardRenderer(this);
  }

  async initialize() {
    const promises = [];
    for(let x = -1 ; x < 2 ; x++) {
      for(let y = -1 ; y < 2 ; y++) {
        promises.push(this.loadArea(x, y));
      }
    }
    return Promise.all(promises);
  }

  update() {
    this.getAreas(true).forEach(area => {
      area.update();
    });
  }

  async loadArea(x, y) {
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

        // this.getRenderer().renderAreas();
        return area;
      });
    }

    return this.areas[x][y];
  }

  async getAreaAt(x, y) {
    if(!this.areaExistsAt(x, y)) {
      return await this.loadArea(x, y);
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
    // this.areas[x][y] = new Area(this, x * this.width(), y * this.height());
    const area = new Area(this, 0 , 0);
    this.areas[x][y] = area;

    this.addElement(x * this.width(), y * this.height(), area);

    return this.areas[x][y];
  }

  getAreas(flatten = false) {
    if(flatten) {
      const areas = [];
      for(let x in this.areas) {
        const row = this.areas[x];
        for(let y in row) {
          areas.push(row[y]);
        }
      }
      return areas;
    }

    return this.areas;
  }
}

