class Viewport
{
  direction;
  moving = 0;
  interval = 10;


  /**
   * @type {Geometry}
   */
  geometry;

  loop;

  speed = 5;

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

  startLoop() {
    this.tick();
  }

  tick() {
    this.update();
    this.loop = setTimeout(() => {
      this.tick();
    }, this.interval)
  }

  update() {

    if(this.moving === 0) {
      return;
    }

    switch(this.direction) {
      case 'up': { this.geometry.add('y', -this.speed); break; }
      case 'down': { this.geometry.add('y', this.speed); break; }
      case 'left': { this.geometry.add('x', -this.speed); break; }
      case 'right': { this.geometry.add('x', this.speed); break; }
    }

    this.character.x(this.x());
    this.character.y(this.y());
    this.character.createCollisionZone(0, 0, 16, 16);

    const collisions = this.character.getCollision(this.board);

    console.log('%cViewport.js :: 96 =============================', 'color: #f00; font-size: 1rem');
    console.log(collisions);

    /*
    .forEach(element => {
      console.log('%cViewport.js :: 92 =============================', 'color: #f00; font-size: 1rem');
      console.log(element);
    });
    */


    this.renderer.update();
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
