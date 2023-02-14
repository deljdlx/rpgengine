class Fence00H extends MapElement
{
  constructor()
  {
    super(
      16,
      16,
    );

    this.addCollisionZone(16, 16, 0, 0);

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1520px -1520px`;
    this.dom.appendChild(this.sprite);

    this.addShadow();
    this.shadow.style.bottom = this.height / -4 + 'px';

  }
}

