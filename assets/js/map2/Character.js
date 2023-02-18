class Character extends Element
{

  animationIndex = 0;
  direction;


  tickInterval = 7;
  tick = 0;

  constructor(x = null, y = null) {
    super(x, y, 48, 48);
    this.createCollisionZone(11, 24, 24, 24);
    this.renderer = new CharacterRenderer(this);

    // console.log('%cCharacter.js :: 16 =============================', 'color: #f00; font-size: 1rem');
    // console.log(this);
  }

  getDirection() {
    return this.direction;
  }

  getAnimationIndex() {
    return this.animationIndex;
  }

  update() {
    this.tick = (++this.tick % this.tickInterval);
    if(this.tick === 0) {
      this.animationIndex = (++this.animationIndex % 3);
    }
    this.getRenderer().update();
  }

  setDirection(direction) {
    this.direction = direction;
  }
}
