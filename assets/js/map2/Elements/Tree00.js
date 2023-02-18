class Tree00 extends Element
{
  constructor() {
    super(0, 0 , 64, 64)
    this.createCollisionZone(24, 34, 16, 24);
  }

  render() {
    super.render();
    this.dom.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.dom.style.backgroundPosition = '-256px 0';
    return this.dom;
  }
}
