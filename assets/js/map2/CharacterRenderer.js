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
    this.dom.style.backgroundImage = `url('assets/images/characters/characters-00.png')`;
    // this.dom.style.backgroundPosition = `0px ${this.spriteSheetOffsetTop}px`;

    this.dom.style.backgroundPosition = `0px 0px`;
  }


  update() {

      super.update();
      const animationIndex = this.getElement().getAnimationIndex();
      const left = animationIndex * -this.getElement().width();
      const top = this.spriteDirectionOffsets[this.getElement().getDirection()];
      this.dom.style.backgroundPosition = `${left}px ${top}px`;
  }


}
