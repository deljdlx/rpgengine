class Tree00 extends MapElement
{
  constructor()
  {
    super(
      64,
      64,
    );

    this.addCollisionZone(40, 40, 12, 18);

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = '-256px 0';
    this.sprite.style.zIndex = 10;
    this.dom.appendChild(this.sprite);

    

    /*
    this.shadow = document.createElement('div');
    this.shadow.classList.add('shadow');
    this.shadow.style.width = '32px';
    this.shadow.style.height = '32px';
    this.shadow.style.bottom = '-16px';
    this.shadow.style.left = '8px';
    this.shadow.style.zIndex = 20;
    this.dom.appendChild(this.shadow);
    */

  }
}