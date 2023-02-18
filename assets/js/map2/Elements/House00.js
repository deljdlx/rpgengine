class House00 extends Element
{
  constructor() {
    super(0, 0 , 130, 130)
    this.createCollisionZone(10, 50, 110, 70);
  }

  render() {
    const dom = super.render();
    dom.style.backgroundImage = 'url(assets/images/map/map-sprites-02.png)';
    dom.style.backgroundPosition = '-1734px -2390px';
    return dom;
  }
}