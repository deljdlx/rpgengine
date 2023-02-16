class Renderer
{

  /**
   * @type {Element}
   */
  _element;

  /**
   * @type {DomElement}
   */
  dom;

  /**
   * @type {DomElement}
   */
  childDom;

  /**
   * @type {DomElement}
   */
  collisionDom;

  /**
   * @type {DomElement}
   */
  boundingBox;

  constructor(element) {
    this._element = element;
  }

  /**
   * @type {Element}
   * @returns {DomElement}
   */
  render() {
    if(this.dom) {
      return this.dom;
    }

    this.dom = document.createElement('div');
    this.dom.classList.add('map-element');

    this.dom.style.width = this._element.width() + 'px';
    this.dom.style.height = this._element.height() + 'px';

    this.dom.style.left = this._element.x() + 'px';
    this.dom.style.top = this._element.y() + 'px';

    this.childDom = document.createElement('div');
    this.dom.appendChild(this.childDom);

    this.renderBoundingBox(this._element);

    this._element.getChildren().forEach(element => {
      this.childDom.appendChild(element.render());
    });

    return this.dom;
  }

  getDom() {
    return this.dom;
  }


  renderBoundingBox(element) {
    this.boundingBox = document.createElement('div');
    this.boundingBox.classList.add('map-element__bounding-box');
    this.dom.append(this.boundingBox);
  }

  renderCollisionZones(element) {

    this.collisiondDom = document.createElement('div');
    this.collisiondDom.classList.add('map-element__collision-bounding-box');
    this.collisiondDom.style.left = element.getCollisionBoundingBox().x0() + 'px';
    this.collisiondDom.style.top = element.getCollisionBoundingBox().y0() + 'px';
    this.collisiondDom.style.width = element.getCollisionBoundingBox().width() + 'px';
    this.collisiondDom.style.height = element.getCollisionBoundingBox().height() + 'px';


    if(this.dom) {
      this.dom.appendChild(this.collisiondDom);
    }

    element.getCollisionZones().forEach(collisionElement => {
      const collisionDom = document.createElement('div');
      collisionDom.classList.add('map-element__collision-zone');
      collisionDom.style.width = collisionElement.width() + 'px';
      collisionDom.style.height = collisionElement.height() + 'px';
      collisionDom.style.left = collisionElement.x() - element.getCollisionBoundingBox().x0() + 'px';
      collisionDom.style.top = collisionElement.y() - element.getCollisionBoundingBox().y0() + 'px';
      this.collisiondDom.append(collisionDom);
    });

    element.getChildren().forEach(element => {
      element.renderCollisionZones();
    });

    return this.collisiondDom;
  }

}

