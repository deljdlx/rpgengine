class GroundConcrete00 extends MapElement
{
  constructor()
  {
    super(
      50,
      48,
    );

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.sprite.style.backgroundImage = 'url(assets/images/map/map-sprites-01.png)';
    this.sprite.style.backgroundPosition = `-1790px -800px`;
    this.dom.appendChild(this.sprite);

   

  }
}