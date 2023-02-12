class MapArea {
  /**
   * @type { Viewport }
   */
  viewport;

  map;

  /**
   * @type { DomElement }
   */
  dom;

  /**
   * @type { MapElement[] }
   */
  elements = [];

  x;
  y;

  indexX;
  indexY;

  left;
  top;

  width;
  height;

  constructor(map, indexX, indexY) {

    this.indexX = indexX;
    this.indexY = indexY;

    this.map = map;
    this.viewport = this.map.viewport;

    this.x = this.indexX * this.viewport.width;
    this.y = this.indexY * this.viewport.height;

    this.dom = document.createElement('div');
    this.dom.classList.add('map-area');

    this.dom.style.left = this.x + 'px';
    this.dom.style.top = this.y + 'px';
    this.dom.style.width = this.map.width + 'px';
    this.dom.style.height = this.map.height + 'px';
  }

  /**
   * @return { Viewport }
   */
  getViewport() {
    return this.viewport;
  }

  getElements() {
    return this.elements;
  }

  grid() {
    for(let i = 0 ; i <= 10 ; i++) {
      let x = i * this.viewport.cellSize;
      const element = this.createElement(1, this.viewport.height, x, this.viewport.height, false);
      element.dom.classList.add('grid');
    }

    for(let i = 0 ; i <= 10 ; i++) {
      let y = i * this.viewport.cellSize;
      const element = this.createElement(this.viewport.width, 1, 0, y, false);
      element.dom.classList.add('grid');
    }
  }

  /**
   * 
   * @param {MapElement} element 
   * @param {float} x 
   * @param {float} y 
   * @returns {MapElement}
   */
  addElement(element, x , y) {

    const coordinates = new Coordinates();
    coordinates.relative = {
      x: parseInt(x),
      y: parseInt(y),
    };
    coordinates.absolute = {
      x: parseInt(x) + parseInt(this.x),
      y: parseInt(y) + parseInt(this.y),
    };

    element.setMapArea(this);
    element.setCoordinates(coordinates)

    this.elements.push(new ElementDescriptor(element, coordinates));

    this.dom.appendChild(element.dom);
    element.dom.style.left = x + 'px';
    element.dom.style.top = y + 'px';
    return element;
  }

  createElement(width, height, left, top, register = true) {
    const element = new MapElement(
      width,
      height,
      left,
      top,
    );
    
    if(register) {
      this.elements.push(element);
    }
    
    this.dom.appendChild(element.dom);
    return element;
  }


  addHorizontalRoad(left, top, size) {
    
    for(let i = 0; i< size; i++) {
      
      let x = left + i * 48;

      const r0 = this.createElement(48, 48, x, top,);
      r0.dom.style.backgroundImage = 'url(assets/images/map-sprites-00.png)';
      r0.dom.style.backgroundPosition = `${48 * -8}px ${48 * -3}px`;

      const r1 = this.createElement(48, 48, x, top + 48,);
      r1.dom.style.backgroundImage = 'url(assets/images/map-sprites-00.png)';
      r1.dom.style.backgroundPosition = `${48 * -8}px ${48 * -1}px`;
    }
  }

  addVerticalRoad(left, top, size) {
    
    for(let i = 0; i< size; i++) {
      
      let x = left;
      let y = top + i * 48;

      const r0 = this.createElement(48, 48, x, y,);
      r0.dom.style.backgroundImage = 'url(assets/images/map-sprites-00.png)';
      r0.dom.style.backgroundPosition = `${48 * -5}px ${48 * -3}px`;

      const r1 = this.createElement(48, 48, x + 48, y);
      r1.dom.style.backgroundImage = 'url(assets/images/map-sprites-00.png)';
      r1.dom.style.backgroundPosition = `${48 * -3}px ${48 * -3}px`;
    }
  }
}
