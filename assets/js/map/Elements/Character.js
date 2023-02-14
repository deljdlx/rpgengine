class Character extends MapElement
{

  /**
   * @type {String}
   */
  spriteSheet;
  spriteSheetOffsetLeft = 0;
  spriteSheetOffsetTop = 0;

  spriteWidth = 48;
  spriteHeight = 48;

  spriteDirectionOffsets = {
    up: this.spriteHeight * -3,
    down: this.spriteHeight * 0,
    left: this.spriteHeight * -1,
    right: this.spriteHeight * -2,
  }

  started = false;
  
  animationSleepTime = 50;
  moveSleepTime = 10;
  animationTimer;
  moveTimer;

  direction;
  animationIndex = 0;

  constructor(spriteSheet = 'assets/images/characters/characters-00.png', spriteSheetOffsetLeft = 0, spriteSheetOffsetTop = 0)
  {
    super(
      48,
      48,
    );
    
    this.spriteSheet = spriteSheet;
    this.spriteSheetOffsetLeft = spriteSheetOffsetLeft;
    this.spriteSheetOffsetTop = spriteSheetOffsetTop;

    this.collisionZones.push(
      new Zone(this, 25, 20, 12, 18)
    );

    this.sprite.classList.add('character');
    this.sprite.style.backgroundImage = `url(${this.spriteSheet})`;
    this.sprite.style.backgroundPosition = `0px ${this.spriteSheetOffsetTop}px`;
    this.dom.appendChild(this.sprite);

    this.addShadow();
    this.shadow.style.width = '24px';
    this.shadow.style.left = '12px';
    this.shadow.style.bottom = this.height / -4 + 'px';
  }


  start() {
    if (this.started) {
      return;
    }

    this.started = true;
    this.animate();
    this.move();
  }

  /**
   * @returns {boolean}
   */
  detectCollision() {
    return this.getViewport().detectCollision(this);
  }

  stop() {
    this.started = false;
    clearTimeout(this.animationTimer);
    clearTimeout(this.moveTimer);
  }


  move() {
    if(!this.started) {
      return;
    }

    const collided = this.detectCollision();

    if(collided) {
      this.stop();
    }

    this.coordinates.relative.x += 1;
    this.coordinates.absolute.x += 1;
    this.dom.style.left = this.coordinates.relative.x + 'px';

    this.moveTimer = setTimeout(() => {
      this.move();
    }, this.moveSleepTime)
  }

  animate() {
    if(!this.started) {
      return;
    }

    this.update();

    this.animationTimer = setTimeout(() => {
      this.animate();
    }, this.animationSleepTime)
  }

  update() {
    const offsetLeft = this.animationIndex * this.spriteWidth * -1;
    const offsetTop = this.spriteDirectionOffsets[this.direction];

    this.animationIndex = ++this.animationIndex % 3
    this.sprite.style.backgroundPosition = offsetLeft + 'px ' + (offsetTop + this.spriteSheetOffsetTop) + 'px';
    super.update();
  }

  go(direction) {
    this.direction = direction;
    this.start();    
  }

  moveUp() {
    this.direction = 'up';
    this.start();
  }

  moveDown() {
    this.direction = 'down';
    this.start();
  }

  moveLeft() {
    this.direction = 'left';
    this.start();
  }

  moveRight() {
    this.direction = 'right';
    this.start();
  }
}
