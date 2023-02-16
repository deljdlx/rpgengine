class Element
{

  /**
   * @type {BoundingBox}
   */
  boundingBox;

  /**
   * @type {BoundingBox}
   */
   collisionBoundingBox;


  /**
   * @type {Geometry}
   */
  geometry;


  /**
   * @type {Element}
   */
  parent;

  /**
   * @type {Element[]}
   */
  children = [];

  /**
   * @type {Renderer}
   */
  renderer;

  /**
   * @type {Element}
   */
  collisionZones = [];

  constructor(x = null, y = null, width = null, height = null)
  {
    this.geometry = new Geometry();
    this.boundingBox = new BoundingBox(this);
    this.collisionBoundingBox = new BoundingBox(this);

    this.renderer = new Renderer(this);

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);
  }

  width(value = null) {
    return this.geometry.width(value);
  }

  height(value = null) {
    return this.geometry.height(value);
  }

  x(value = null) {
    return this.geometry.x(value);
  }

  y(value = null) {
    return this.geometry.y(value);
  }

  offsetX() {
    if(this.parent) {
      return this.x() + this.parent.offsetX();
    }

    return this.x();
  }

  offsetY() {
    if(this.parent) {
      return this.y() + this.parent.offsetY();
    }

    return this.y();
  }

  createElement(x = null, y = null, width = null, height = null) {
    const element = new Element(x, y, width, height);
    this.children.push(element);
    element.setParent(this);
    return element;
  }

  createCollisionZone(x = null, y = null, width = null, height = null) {
    const zone = new Element(x, y, width, height);
    zone.setParent(this);
    this.collisionZones.push(zone);
    this.collisionBoundingBox.updateWithElement(zone);

    if(this.parent) {
      this.parent.updateCollisionBoundingBox(this);
    }

    return zone;
  }

  /**
   * @param {Element}
   */
  updateCollisionBoundingBox(element) {
    this.collisionBoundingBox.updateWithRelativeElement(this, element);
    if(this.parent) {
      this.parent.updateCollisionBoundingBox(this);
    }
  }

  getCollision(element) {
    if(element === this) {
      return false;
    }

    console.log('%cElement.js :: 122 =============================', 'color: #f00; font-size: 1rem');
    console.log(this.getCollisionBoundingBox());

    const collided = this.getCollisionBoundingBox().isCollided(
      element.getCollisionBoundingBox()
    );

    if(collided) {
      if(!element.getChildren().length) {
        return [element];
      }

      const childCollisions = element.getChildren().map(child => {
        return this.getCollision(child);
      }).filter(Boolean).reduce((accumulator, element) => element, []);

      if(!childCollisions.length) {
        return [element]
      }

      return childCollisions;
    }

    return false;
  }

  /**
   * @param {Element} element
   * @returns {Element}
   */
  setParent(element) {
    this.parent = element
    return parent;
  }

  getChildren() {
    return this.children;
  }

  getCollisionZones() {
    return this.collisionZones;
  }

  getCollisionBoundingBox() {
    return this.collisionBoundingBox;
  }

  getBoundingBox() {
    return this.boundingBox;
  }


  // ===========================

  /**
   * @returns {Renderer}
   */
  getRenderer() {
    return this.renderer;
  }

  render() {
    return this.renderer.render(this);
  }

  renderCollisionZones() {
    return this.renderer.renderCollisionZones(this);
  }
}