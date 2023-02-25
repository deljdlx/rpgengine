class Element
{


  _hasSprite = true;

  manualZ = false;
  /**
   * @type {BoundingBox}
   */
  boundingBox;

  /**
   * @type {Boolean}
   */
  _collided;


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


  /**
   * @type {Boolean}
   */
  _needUpdate = false;

  rendered = false;

  /**
   * @type {?Element}
   */
  _relativeTo = null;

  /**
   * @type {boolean}
   */
  _staticPosition = false;
  _targetX;
  _targetY;
  _targetHitZone = 2;
  _onMoveEnd = () => null;
  _moving = false;
  _movingSpeed = 2;


  constructor(x = null, y = null, width = null, height = null)
  {
    this.geometry = new Geometry();
    this.boundingBox = new BoundingBox(this);
    this.collisionBoundingBox = new BoundingBox(this);

    this.renderer = new Renderer(this);
    this.dom = this.renderer.getDom();

    this.x(x);
    this.y(y);
    this.width(width);
    this.height(height);
  }

  /**
   *
   * @param {?boolean} value
   * @returns {boolean}
   */
  staticPosition(value = null) {
    if(value  !== null) {
      this._staticPosition = value;
    }
    return this._staticPosition;
  }


  // ===========================

  movingSpeed(value = null) {
    if(value !== null) {
      this._movingSpeed = value;
    }

    return this._movingSpeed;
  }

  isMoving(value = null) {
    if(value !== null) {
      this._moving = value;
    }

    return this._moving;
  }

  update() {

    if(this.isMoving() && this.y() < this._targetY) {
      this.direction = 'down';
      this.y(this.y() + this._movingSpeed);
    }
    else if(this.isMoving() && this.x() < this._targetX) {
      this.direction = 'right';
      this.x(this.x() + this._movingSpeed);
    }

    if(this.parent) {
      this.parent.updateCollisionBoundingBox(this);
    }

    if(this.needUpdate() || this.isMoving()) {
      if(
        Math.abs(this._targetX - this.x()) <= this._targetHitZone
        && Math.abs(this._targetY - this.y()) <= this._targetHitZone
        && this.isMoving()
      ) {
        this._moving = false;
        this._onMoveEnd(this);
      }

      this.getRenderer().update();
      this.getChildren().forEach(element => {
        element.update();
      });
    }

    this.needUpdate(false);
  }

  moveTo(x, y, onEnd = () => {}) {

    this._targetX = x;
    this._targetY = y;
    this._moving = true;
    this._onMoveEnd = onEnd;
    this.needUpdate(true);

    return this;
  }


  /**
   *
   * @param {?Element} element
   * @returns
   */
  relativeTo(element = null) {
    if(element !== null) {
      this._relativeTo = element;
    }

    return this._relativeTo;
  }

  getRelativeToOffsets() {
    if(!this._relativeTo) {
      return {
        x: 0,
        y: 0,
      }
    }

    const offsets = this._relativeTo.getRelativeToOffsets();
    return {
      x: offsets.x  + this.x(),
      y: offsets.y  + this.y(),
    };
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

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @returns {Element}
   */

  createElement(x = null, y = null, width = null, height = null) {
    const element = new Element(x, y, width, height);
    this.children.push(element);
    element.setParent(this);
    element.relativeTo(this);
    return element;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {Element} element
   * @returns {Element}
   */
  addElement(x = 0, y = 0, element) {

    this.children.push(element);
    element.setParent(this);
    element.relativeTo(this);

    element.x(x);
    element.y(y);

    this.updateCollisionBoundingBox(element);

    if(this.parent) {
      this.parent.updateCollisionBoundingBox(this);
    }

    this.needUpdate(true);
    return element;
  }

  createCollisionZone(x = null, y = null, width = null, height = null) {

    const zone = new BoundingBox(this);
    zone.x0(x);
    zone.y0(y);
    zone.width(width);
    zone.height(height);
    this.collisionZones.push(zone);

    this.collisionBoundingBox.updateWithBoundingBox(zone);

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

  // ===========================
  needUpdate(value = null) {
    if(value !== null) {
      this._needUpdate = value;
      if(this.parent) {
        this.parent.needUpdate(value);
      }
    }

    return this._needUpdate;
  }


  // ===========================

  collided(value = null) {

    if(value !== null) {
      if(value !== this._collided) {
        this._collided = value;
        if(value === false) {
          this.collisionZones.forEach(zone => {
            zone.collided(false);
          });
        }

        if(this.parent) {
          this.parent.collided(value);
        }
        this.needUpdate(true);
      }
    }

    return this._collided;
  }

  getCollision(element) {

    if(element === this) {
      return false;
    }


    const boundingBoxCollided = this.getCollisionBoundingBox().isCollided(
      element.getCollisionBoundingBox()
    );

    if(boundingBoxCollided) {

      const collided = element.collisionZones.reduce((collided, zone) => {

        const isCollided = this.getCollisionBoundingBox().isCollided(zone);
        if(!collided) {
          collided = isCollided;
        }
        zone.collided(isCollided);

        return collided
      }, false);

      if(collided) {
        element.collided(true);
        this.collided(true);
        return [element];
      }


      const childCollisions = element.getChildren().map(child => {
        const result = this.getCollision(child);

        return result;
      }).filter(Boolean).reduce((accumulator, element) => element, []);

      if(childCollisions.length) {
        return childCollisions;
      }
    }

    element.clearCollision();
    this.clearCollision();

    return false;
  }

  clearCollision() {
    this.collided(false);
    this.getCollisionZones().forEach(zone => {
      if(zone.dom) {
        zone.collided(false);
      }

    });
    this.getChildren().forEach(child => {
      child.clearCollision();
    });
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

  getAllChildren() {
    const children = [];
    this.getChildren().forEach(parent => {
      children.push(parent);
      // parent.relativeTo(this);

      parent.getAllChildren().forEach(child => {
        // child.relativeTo(parent);
        children.push(child);
      });
    });
    return children;
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

  /**
   * @returns {Boolean}
   */
  isRendered() {
    return this.rendered;
  }

  /**
   * @returns
   */
  render() {
    this.rendered = true;
    return this.renderer.render();
  }

  renderBoundingBox() {
    this.renderer.renderBoundingBox();

    this.getChildren().forEach(element => {
      element.renderBoundingBox()
    });
  }

  renderCollisionZones() {
    return this.renderer.renderCollisionZones();
  }
}