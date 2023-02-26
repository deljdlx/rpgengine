class CharacterRenderer extends Renderer
{

  spriteWidth = 48;
  spriteHeight = 48;

  spriteDirectionOffsets = {
    up: this.spriteHeight * -3,
    down: this.spriteHeight * 0,
    left: this.spriteHeight * -1,
    right: this.spriteHeight * -2,
  }

  constructor(element) {
    super(element);
    this.dom.classList.add('character');
    this.domSprite.style.backgroundImage = `url('assets/images/characters/characters-00.png')`;

    const left = -this.getElement().width() - this.getElement().getSpriteSheetOffsetLeft();

    const top = this.spriteDirectionOffsets['down'] - this.getElement().getSpriteSheetOffsetTop();
    this.domSprite.style.backgroundPosition = `${left}px ${top}px`

    this.addShadow();
  }


  update() {

      super.update();
      const animationIndex = this.getElement().getAnimationIndex();
      const left = animationIndex * -this.getElement().width() - this.getElement().getSpriteSheetOffsetLeft();
      const top = this.spriteDirectionOffsets[this.getElement().getDirection()] - this.getElement().getSpriteSheetOffsetTop();
      this.domSprite.style.backgroundPosition = `${left}px ${top}px`;
  }


}
