class Viewport
{
  direction;
  moving = 0;
  interval = 4;


  /**
   * @type {Geometry}
   */
  geometry;

  loop;

  speed = 2;

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

  constructor(container, board, x = 0, y = 0, width = 500, height = 500)
  {
    this.container = container;
    this.board = board;
    this.geometry = new Geometry(x, y);
    this.geometry.x(x);
    this.geometry.y(y);
    this.geometry.width(width);
    this.geometry.height(height);
    this.renderer = new ViewportRenderer(this);

    this.character = new Character();
    this.character.x(this.width() / 2);
    this.character.y(this.height() / 2);
  }

  getCharacter(){
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

  loadAreasFromCurrentPosition() {
    const at = this.getCurrentAreaCoordinates();

    this.board.loadArea(at.x - 1, at.y);
    this.board.loadArea(at.x - 1, at.y - 1);
    this.board.loadArea(at.x - 1, at.y + 1);

    this.board.loadArea(at.x + 1, at.y);
    this.board.loadArea(at.x + 1, at.y - 1);
    this.board.loadArea(at.x + 1, at.y + 1);

    this.board.loadArea(at.x, at.y + 1);
    this.board.loadArea(at.x, at.y - 1);
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

    if(this.moving === 0) {
      return;
    }

    this.loadAreasFromCurrentPosition();
    this.freeAreasFromCurrentPosision();

    const saveGeometry = this.geometry.clone();
    switch(this.direction) {
      case 'up': { this.geometry.add('y', -this.speed); break; }
      case 'down': { this.geometry.add('y', this.speed); break; }
      case 'left': { this.geometry.add('x', -this.speed); break; }
      case 'right': { this.geometry.add('x', this.speed); break; }
    }

    this.character.x(this.x() + this.width() / 2);
    this.character.y(this.y() + this.height() / 2);

    let collisions = this.character.getCollision(this.board);


    if(collisions.length) {
      this.geometry = saveGeometry;
      this.character.x(this.x() + this.width() / 2);
      this.character.y(this.y() + this.height() / 2);
    }

    this.getBoard().update();
    this.renderer.update();
    this.character.update();
  }

  render() {
    return this.renderer.render(this.container);
  }

  // ===========================

  stop() {
    this.moving = 0;
  }

  move(direction) {
    this.direction = direction;
    this.moving = 1;
    this.character.setDirection(this.direction);
  }

  run() {
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
