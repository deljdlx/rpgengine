class Flower extends MapElement
{
  constructor()
  {
    super(
      48,
      28,
    );

    this.addCollisionZone(48, 24, 0, 4);

    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1587px -1080px`;

    this.addShadow();
    this.shadow.style.bottom = this.height / -4 + 'px';

  }
}

