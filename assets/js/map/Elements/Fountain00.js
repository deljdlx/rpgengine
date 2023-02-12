class Fountain00 extends MapElement
{
  constructor()
  {
    super(
      80,
      64,
    );

    this.addCollisionZone(72, 60, 4, 4);

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = '-1170px -2754px';
    this.sprite.style.zIndex = 10;
    this.dom.appendChild(this.sprite);

    this.addShadow();
    this.shadow.style.bottom = '-3px';
    this.shadow.style.left = '5px';
    this.shadow.style.width = '70px';
    this.shadow.style.transform = 'none';

    

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