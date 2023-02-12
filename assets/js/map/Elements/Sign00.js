class Sign00 extends MapElement
{
  constructor()
  {
    super(
      32,
      28,
    );

    this.addCollisionZone(32, 28, 0, 0);

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1695px -1200px`;
    this.dom.appendChild(this.sprite);

    this.addShadow();
    this.shadow.style.bottom = this.height / -4 + 'px';
  }
}