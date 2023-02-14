class SunFlower00 extends MapElement
{
  constructor()
  {
    super(
      16,
      24,
    );

    // this.sprite.style.width = '16px';
    // this.sprite.style.height = '32px';

    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1760px -1256px`;
  }


  update() {
    const offsets = this.getOffsets();
    this.dom.style.zIndex = offsets.top + this.height;
  }

}