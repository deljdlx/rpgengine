class ViewportRenderer
{
  /**
   * @type {Viewport}
   */
  _viewport;

  /**
   * @type {DomElement}
   */
  _container;

  /**
   * @param {Viewport} viewport
   */

  /**
   * @type {DomElement}
   */
  domCharacter;

  constructor(viewport) {
    this._viewport = viewport;
    this._container = this._viewport.getContainer();
    this._board = this._viewport.getBoard();
  }

  /**
   * @param {DomElement} container
   */
  render() {
    this._container.style.width = this._viewport.getGeometry().width() + 'px';
    this._container.style.height = this._viewport.getGeometry().height() + 'px';
    this._container.append(this._viewport.getBoard().render());

    this.domCharacter = this._viewport.getCharacter().getRenderer().render();

    this._container.append(this.domCharacter);

    this.domCharacter.style.backgroundColor = '#fff';

  }

  update(){
    const left = -this._viewport.x();
    const top = -this._viewport.y();

    this._board.getRenderer().getDom().style.transform = `translateX(${left}px) translateY(${top}px)`
  }
}
