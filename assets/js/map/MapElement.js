
class MapElement {

   /**
    * @type { MapArea }
    */
  mapArea;

  /**
   * @type {boolean}
   */
  animated = false;


  /**
   * @type { Coordinates }
   */
  coordinates = {};

   /**
    * @type { DomElement }
    */
  dom;

   /**
    * @type { DomElement }
    */
  sprite;

  /**
   * @type {integer}
   */
  width;

  /**
   * @type {integer}
   */
  height;

  /**
   * @type {Zone[]}
   */
  collisionZones = [];

  /**
   * @type {boolean}
   */
  collided = false;

  listeners = {};


  boundingBox = {
    x0: null,
    y0: null,
    x1: null,
    y1: null,
  }


  /**
   * @type {MapElementGroup|null}
   */
  group;

  constructor(width, height) {
    this.coordinates = new Coordinates();

    this.width = width;
    this.height = height;
  }

  render() {

    this.dom = document.createElement('div');
    this.dom.classList.add('map-element');
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";

    this.sprite = document.createElement('div');
    this.sprite.classList.add('sprite');
    this.dom.appendChild(this.sprite);

    console.log('%cMapElement.js :: 85 =============================', 'color: #f00; font-size: 1rem');
    console.log(this.dom);
  }

  // ===========================
  /**
   * @param {MapElementGroup} group
   * @returns {MapElementGroup}
   */
  setGroup(group) {
    this.group = group;
    return group;
  }


  /**
   * @returns {MapElementGroup|null}
   */
  getGroup() {
    return this.group;
  }

  // ===========================

  say(sentence) {
    this.handle('say', {
      source: this,
      sentence: sentence,
    });
  }

  clear() {
    this.handle('clear', {
      source: this,
    });
  }

  addEventListener(name, callback) {
    if(typeof(this.listeners[name]) === 'undefined') {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);

    return this.listeners[name].length - 1;
  }

  handle(name, data = {}) {
    if(typeof(this.listeners[name]) !== 'undefined') {
      this.listeners[name].map(callback => {
        callback(data);
      });
    }

    this.getViewport().handle(name, data);
  }

  // =========================== 

  getDescriptor() {
    return new ElementDescriptor(this, this.coordinates);
  }


  setViewport(viewport) {
    this.viewport = viewport;
  }


  getViewport() {
    return this.viewport;
  }

  /**
   * @param {Coordinates} coordinates
   * @returns
   */
  setCoordinates(coordinates) {
    this.coordinates = coordinates;
    return this;
  }

  getCoordinates() {
    return this.coordinates;
  }

  /**
   * @param {MapArea} area 
   * @returns 
   */
  setMapArea(area) {
    this.mapArea = area;
    this.viewport = this.mapArea.getViewport();
    return this;
  }

  addShadow() {
    this.shadow = document.createElement('div');
    this.shadow.classList.add('shadow');
    this.shadow.style.width = this.width + 'px';
    this.shadow.style.height = this.height / 2 + 'px';
    this.shadow.style.bottom = this.height / -2 + 'px';
    this.dom.appendChild(this.shadow);
  }


  addCollisionZone(width, height, x, y)
  {
    const zone = new Zone(this, width, height, x, y);
    this.collisionZones.push(zone);



    if(x < this.boundingBox.x0 || this.boundingBox.x0 === null) {
      this.boundingBox.x0 = x;
    }
    if(x + width > this.boundingBox.x1 || this.boundingBox.x1 === null) {
      this.boundingBox.x1 = x + width;
    }

    if(y < this.boundingBox.y0 || this.boundingBox.y0 === null) {
      this.boundingBox.y0 = y;
    }
    if(y + height > this.boundingBox.y1 || this.boundingBox.y1 === null) {
      this.boundingBox.y1 = y + height;
    }


    if(zone.dom) {
      this.dom.appendChild(zone.dom);
    }
  }

  getBoundingBox() {
    return this.boundingBox;
  }

  getCollisionZones() {
    return this.collisionZones;
  }

  isAnimated() {
    return this.animated;
  }

  isCollided(boundingBox) {

    let hasCollision = false;

    console.log('%cMapElement.js :: 200 =============================', 'color: #f00; font-size: 1rem');
    console.log(boundingBox);

    hasCollision = this.collisionZones.reduce((collided, zone) => {
      const collisionLeft = boundingBox.x0 < zone.x + zone.width + this.coordinates.absolute.x;
      const collisionRight = boundingBox.x1 > zone.x + this.coordinates.absolute.x;
      const collisionTop = boundingBox.y0 < zone.y + zone.height + this.coordinates.absolute.y;
      const collisionBottom = boundingBox.y1 > zone.y + this.coordinates.absolute.y;

      return collisionLeft && collisionRight && collisionTop && collisionBottom
    }, false);

    this.collided = hasCollision;
    return hasCollision;


    /*
    if(hasCollision) {
      this.handle('collision', {
        source: this,
        target: element,
      });

      element.handle('collision', {
        source: element,
        target: this,
      })
    }

    if(this.collided && !hasCollision) {
      this.handle('endCollision', {
        source: this,
        target: element,
      });
      this.handle('endCollision', {
        source: element,
        target: this,
      });
    }
    */

    this.collided = hasCollision;

    return hasCollision;



  }


  isCollided2(elementDescriptor) {

    let hasCollision = false;

    const element = elementDescriptor.element;
    const elementCoordinates = elementDescriptor.coordinates.absolute;

    if(!element.isAnimated() && !this.isAnimated()) {
      return false;
    }

    const zones = element.getCollisionZones();

    for(let zone of zones) {

      if(hasCollision) {
        break;
      }

      const left = elementCoordinates.x + zone.x;
      const right = elementCoordinates.x + zone.x + zone.width;
      const top = elementCoordinates.y + zone.y;
      const bottom = elementCoordinates.y + zone.y + zone.height;

      hasCollision = this.collisionZones.reduce((collided, zone) => {
        const collisionLeft = left < zone.x + zone.width + this.coordinates.absolute.x;
        const collisionRight = right > zone.x + this.coordinates.absolute.x;
        const collisionTop = top < zone.y + zone.height + this.coordinates.absolute.y;
        const collisionBottom = bottom > zone.y + this.coordinates.absolute.y;

        return collisionLeft && collisionRight && collisionTop && collisionBottom
      }, false);
    }

    if(hasCollision) {
      this.handle('collision', {
        source: this,
        target: element,
      });

      element.handle('collision', {
        source: element,
        target: this,
      })
    }

    if(this.collided && !hasCollision) {
      this.handle('endCollision', {
        source: this,
        target: element,
      });
      this.handle('endCollision', {
        source: element,
        target: this,
      });
    }

    this.collided = hasCollision;

    return hasCollision;
  }




  update() {
    const offsets = this.getOffsets();
    if(parseInt(offsets.top + this.height) != parseInt(this.dom.style.zIndex)) {
      setTimeout(() => {
        this.dom.style.zIndex = offsets.top + this.height;
      }, 1)
    }
  }

  getOffsets() {
    let element = this.dom;
    let top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
  };
}
