class SunFlower00 extends MapElement
{
  constructor()
  {
    super(
      16,
      24,
    );

    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1760px -1256px`;
    this.addShadow();
  }


  update() {
    const offsets = this.getOffsets();
    this.dom.style.zIndex = offsets.top + this.height;
  }

}