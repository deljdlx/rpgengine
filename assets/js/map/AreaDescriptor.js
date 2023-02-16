class AreaDescriptor
{

  spriteWidth = 32;
  spriteHeight = 32;

  layers = {};


  /**
   * @type {MapElementGroup[]}
   */
  groups = [];

  /**
   * @type {Coordinates}
   */
   coordinates;

  boundingBox = {
    x0: null,
    y0: null,
    x1: null,
    y1: null,
  }

  constructor() {
    this.coordinates = new Coordinates();
  }


  render() {
    this.groups.forEach(group => {
      group.render();
    })
  }

  getBoundingBox() {
    return this.boundingBox;
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



  addElement(layerName, element, x, y, matrixCoordinates = true) {
    if(matrixCoordinates) {
      x = x * 48;
      y = y * 48;
    }

    if(typeof(this.layers[layerName]) === 'undefined') {
      this.layers[layerName] = {};
    }

    if(typeof(this.layers[layerName][x]) === 'undefined') {
      this.layers[layerName][x] = {};
    }
    this.layers[layerName][x][y] = element;

    const elementBoundingBox = element.getBoundingBox();

    if(this.boundingBox.x0 + elementBoundingBox.x0 + x < this.boundingBox.x0 || this.boundingBox.x0 === null) {
      this.boundingBox.x0 += elementBoundingBox.x0 + x;
    }
    if(this.boundingBox.x1 + elementBoundingBox.x1 + x > this.boundingBox.x1 || this.boundingBox.x1 === null) {
      this.boundingBox.x1 += elementBoundingBox.x1 + x;
    }

    if(this.boundingBox.y0 + elementBoundingBox.y0 + y < this.boundingBox.y0  || this.boundingBox.y0 === null) {
      this.boundingBox.y0 += elementBoundingBox.y0 + y;
    }
    if(this.boundingBox.y1 + elementBoundingBox.y1 + y > this.boundingBox.y1 + y || this.boundingBox.y1 === null) {
      this.boundingBox.y1 += elementBoundingBox.y1 + y;
    }
  }

  /**
   * @param {MapElementGroup} group
   * @param {float} x 
   * @param {float} y 
   * @returns {MapElement}
   */
  addGroup(group, x= 0  , y = 0, matrixCoordinates = true) {

    this.handleGroup(group, x, y, matrixCoordinates);

    const subGroups = group.getSubGroups();
    for(let groupName in subGroups) {
      const group = subGroups[groupName];

      this.handleGroup(group, x, y, matrixCoordinates);
    }
  }

  getGroups() {
    return this.groups;
  }

  handleGroup(group, x, y, matrixCoordinates = true) {

    this.groups.push(group);

    if(matrixCoordinates) {
      x = x * 48 + group.getCoordinates().relative.x;
      y = y * 48 + group.getCoordinates().relative.y;
    }

    const groupBoundingBox = group.getBoundingBox();

    if(groupBoundingBox.x0 + x < this.boundingBox.x0 || this.boundingBox.x0 === null) {
      this.boundingBox.x0 = groupBoundingBox.x0 + x;
    }
    if(groupBoundingBox.x1 + x > this.boundingBox.x1 || this.boundingBox.x1 === null) {
      this.boundingBox.x1 = groupBoundingBox.x1 + x;
    }

    if(groupBoundingBox.y0 + y < this.boundingBox.y0 || this.boundingBox.y0 === null) {
      this.boundingBox.y0 = groupBoundingBox.y0 + y;
    }
    if(groupBoundingBox.y1 + y > this.boundingBox.y1 + y || this.boundingBox.y1 === null) {
      this.boundingBox.y1 = groupBoundingBox.y1 + y;
    }

    const layers = group.getLayers();
    for(let layerName in layers) {
      /*
      const elements = layers[layerName];
      elements.map(elementDescriptor => {
        const element = elementDescriptor.getElement();
        this.addElement(
          layerName,
          element,
          element.getCoordinates().relative.x + x,
          element.getCoordinates().relative.y + y,
          false,
        )
      });

      // */
    }
  }
}

