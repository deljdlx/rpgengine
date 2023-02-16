class BoundingBox
{

  /**
   * @type {Element}
   */
  _element;

  _x0 = null;
  _x1 = null;
  _y0 = null;
  _y1 = null;

  /**
   * @param {Element} element
   */
  constructor(element) {
    this._element = element
  }

  /**
   * @param {Element} element
   * @returns {Element}
   */
  updateWithElement(element) {

    if(this.x0() === null || element.x() < this.x0()) {
      this.x0(element.x());
    }

    if(this.x1() === null || element.x() + element.width() > this.x1()) {
      this.x1(element.x() + element.width());
    }

    if(this.y0() === null || element.y() < this.y0()) {
      this.y0(element.y());
    }

    if(this.y1() === null || element.y() + element.height() > this.y1()) {
      this.y1(element.y() + element.height());
    }

    return element
  }

  /**
   * @param {Element} parentElement
   * @param {Element} childElement
   */
  updateWithRelativeElement(parentElement, childElement) {
    if(
      parentElement.getCollisionBoundingBox().x1() <
      childElement.getCollisionBoundingBox().x1() + childElement.x()
    ) {
      parentElement.getCollisionBoundingBox().x1(
        childElement.getCollisionBoundingBox().x1() + childElement.x()
      )
    }

    if(
      parentElement.getCollisionBoundingBox().x0() >
      childElement.getCollisionBoundingBox().x0() + childElement.x()
    ) {
      parentElement.getCollisionBoundingBox().x0(
        childElement.getCollisionBoundingBox().x0() + childElement.x()
      )
    }

    if(
      parentElement.getCollisionBoundingBox().y1() <
      childElement.getCollisionBoundingBox().y1() + childElement.y()
    ) {
      parentElement.getCollisionBoundingBox().y1(
        childElement.getCollisionBoundingBox().y1() + childElement.y()
      )
    }

    if(
      parentElement.getCollisionBoundingBox().y0() >
      childElement.getCollisionBoundingBox().y0() + childElement.y()
    ) {
      parentElement.getCollisionBoundingBox().y0(
        childElement.getCollisionBoundingBox().y0() + childElement.y()
      )
    }
  }

  // ===========================
  /**
   * 
   * @param {BoudingBox} boudingBox
   */
  isCollided(boundingBox) {
    return (
      this.offsetX0() <= boundingBox.offsetX1()
      && this.offsetX1() >= boundingBox.offsetX0()
      && this.offsetY0() <= boundingBox.offsetY1()
      && this.offsetY1() >= boundingBox.offsetY0()
    );
  }

  // ===========================

  offsetX0() {
    return this.x0() + this._element.offsetX();
  }

  offsetX1() {
    return this.x1() + this._element.offsetX();
  }

  offsetY0() {
    return this.y0() + this._element.offsetY();
  }

  offsetY1() {
    return this.y1() + this._element.offsetY();
  }


  x0(value = null) {
    if(value !== null) {
      this._x0 = value;
    }
    return this._x0;
  }

  x1(value = null) {
    if(value !== null) {
      this._x1 = value;
    }
    return this._x1;
  }

  y0(value = null) {
    if(value !== null) {
      this._y0 = value;
    }
    return this._y0;
  }

  y1(value = null) {
    if(value !== null) {
      this._y1 = value;
    }
    return this._y1;
  }

  width() {
    return this._x1 - this._x0;
  }

  height() {
    return this._y1 - this._y0;
  }

}