class Character extends Element
{

  animationIndex = 0;
  direction;

  spriteSheetOffsetLeft = 0;
  spriteSheetOffsetTop = 0;


  tickInterval = 8;
  tick = 0;





  constructor(x = null, y = null, spriteSheetOffsetLeft = 0, spriteSheetOffsetTop = 0) {
    super(x, y, 48, 48);

    this.spriteSheetOffsetLeft = spriteSheetOffsetLeft;
    this.spriteSheetOffsetTop = spriteSheetOffsetTop;

    this.createCollisionZone(16, 24, 14, 12);
    this.renderer = new CharacterRenderer(this);
  }




  getSpriteSheetOffsetLeft() {
    return this.spriteSheetOffsetLeft;
  }

  getSpriteSheetOffsetTop() {
    return this.spriteSheetOffsetTop;
  }

  getDirection() {
    return this.direction;
  }

  getAnimationIndex() {
    return this.animationIndex;
  }

  update() {
    if(this._moving) {
      this.tick = (++this.tick % this.tickInterval);
      if(this.tick === 0) {
        this.animationIndex = (++this.animationIndex % 3);
      }
    }
    super.update();
  }

  setDirection(direction) {
    this.direction = direction;
  }
}
