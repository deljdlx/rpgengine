class Viewport
{

  _application;

  direction;
  moving = 0;
  interval = 6;


  /**
   * @type {Geometry}
   */
  geometry;

  loop;

  speed = 1;

  /**
   * @type {Board}
   */
  board;

  /**
   * @type {ViewportRenderer}
   */
  renderer;

  /**
   * @type {DomElement}
   */
  container;


  /**
   * @type {Character}
   */
  character;

  constructor(application, container, x = 0, y = 0, width = 500, height = 500)
  {
    this._application = application;

    this.container = container;
    this.board = new Board(this);
    this.geometry = new Geometry(x, y);
    this.geometry.x(x);
    this.geometry.y(y);
    this.geometry.width(width);
    this.geometry.height(height);
    this.renderer = new ViewportRenderer(this);

    this.character = new Character();
    this.character.x(this.width() / 2);
    this.character.y(this.height() / 2);
    this.character.staticPosition(true);
  }

  getApplication() {
    return this._application;
  }



  getCharacter() {
    return this.character;
  }

  getBoard() {
    return this.board;
  }

  getContainer() {
    return this.container;
  }

  getCurrentAreaCoordinates() {
    const x = Math.floor(this.character.x() / this.board.width());
    const y = Math.floor((this.character.y() + 48) / this.board.height());
    return {
      x: x,
      y: y
    };
  }

  getCurrentArea() {
    const at = this.getCurrentAreaCoordinates();
    return this.board.getAreaAt(at.x, at.y)
  }

  currentAreaExists() {
    const at = this.getCurrentAreaCoordinates();
    return this.board.areaExistsAt(at.x, at.y);
  }

  async loadAreasFromCurrentPosition() {

    return;

    const at = this.getCurrentAreaCoordinates();

    const promises = [];

    promises.push(this.board.loadArea(at.x - 1, at.y));
    promises.push(this.board.loadArea(at.x - 1, at.y - 1));
    promises.push(this.board.loadArea(at.x - 1, at.y + 1));
    promises.push(this.board.loadArea(at.x + 1, at.y));
    promises.push(this.board.loadArea(at.x + 1, at.y - 1));
    promises.push(this.board.loadArea(at.x + 1, at.y + 1));
    promises.push(this.board.loadArea(at.x, at.y + 1));
    promises.push(this.board.loadArea(at.x, at.y - 1));

    return Promise.all(promises).then(() => {
      this.board.getRenderer().renderAreas();
    });
  }

  freeAreasFromCurrentPosision() {
    const at = this.getCurrentAreaCoordinates();

    this.board.freeArea(at.x - 2, at.y - 2);
    this.board.freeArea(at.x - 2, at.y - 1);
    this.board.freeArea(at.x - 2, at.y);
    this.board.freeArea(at.x - 2, at.y + 1);
    this.board.freeArea(at.x - 2, at.y + 2);

    this.board.freeArea(at.x + 2, at.y - 2);
    this.board.freeArea(at.x + 2, at.y - 1);
    this.board.freeArea(at.x + 2, at.y);
    this.board.freeArea(at.x + 2, at.y + 1);
    this.board.freeArea(at.x + 2, at.y + 2);

    this.board.freeArea(at.x - 1, at.y + 2);
    this.board.freeArea(at.x, at.y + 2);
    this.board.freeArea(at.x + 1, at.y + 2);

    this.board.freeArea(at.x - 1, at.y - 2);
    this.board.freeArea(at.x, at.y - 2);
    this.board.freeArea(at.x + 1, at.y - 2);
  }

  // ===========================

  startLoop() {
    this.tick();
  }

  tick() {
    this.update();
    this.loop = setTimeout(() => {
      this.tick();
    }, this.interval)
  }

  // ===========================

  update() {
    if(this.character.isMoving()) {
      const saveGeometry = this.geometry.clone();
      switch(this.direction) {
        case 'up': { this.geometry.add('y', -this.character.movingSpeed()); break; }
        case 'down': { this.geometry.add('y', this.character.movingSpeed()); break; }
        case 'left': { this.geometry.add('x', -this.character.movingSpeed()); break; }
        case 'right': { this.geometry.add('x', this.character.movingSpeed()); break; }
      }

      this.character.x(this.x() + this.width() / 2);
      this.character.y(this.y() + this.height() / 2);

      let collisions = this.character.getCollision(this.board);

      if(collisions.length) {
        this.geometry = saveGeometry;
        this.character.x(this.x() + this.width() / 2);
        this.character.y(this.y() + this.height() / 2);
      }
      else {
        this.loadAreasFromCurrentPosition();
        this.freeAreasFromCurrentPosision();
        this.character.update();
      }
    }

    this.getBoard().update();
    this.renderer.update();
  }

  render() {
    return this.renderer.render(this.container);
  }

  renderDebug() {
    return this.renderer.renderDebug();
  }

  // ===========================

  stop() {
    this.character.isMoving(false);
  }

  move(direction) {
    this.character.isMoving(true);
    this.direction = direction;
    this.character.setDirection(this.direction);
  }

  async run() {

    await this.getBoard().initialize();


    document.body.addEventListener('keyup', (event) => {
      this.stop();
      return;
    });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.move('left');
      }

      if (event.key === 'ArrowRight') {
        this.move('right');
      }
      if (event.key === 'ArrowUp') {
        this.move('up');
      }
      if (event.key === 'ArrowDown') {
        this.move('down');
      }
    });

    this.startLoop()
  }

  getBoard() {
    return this.board;
  }

  getGeometry() {
    return this.geometry;
  }

  x(value = null) {
    return this.geometry.x(value);
  }

  y(value = null) {
    return this.geometry.y(value);
  }

  width(value = null) {
    return this.geometry.width(value);
  }

  height(value = null) {
    return this.geometry.height(value);
  }

}
