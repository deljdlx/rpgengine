class House00 extends MapElement
{
  constructor()
  {
    super(
      130,
      130,
    );

    this.addCollisionZone(110, 55, 10, 70);
  }

  render() {
    super.render();
    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-02.png)';
    this.sprite.style.backgroundPosition = '-1734px -2390px';
    this.sprite.style.zIndex = '10';
    this.dom.appendChild(this.sprite);




    this.shadow = document.createElement('div');
    this.shadow.classList.add('shadow');
    this.shadow.style.borderRadius = '0'
    this.shadow.style.width = (110) + 'px';
    this.shadow.style.height = '20px';
    this.shadow.style.bottom = '-3px';
    this.shadow.style.left = '16px';
    this.dom.appendChild(this.shadow);
  }
}