class MapElementGroup
{
  layers = {};
  elements = [];

  parentGroup = null;
  groups = {};

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

    this.elements.forEach(element => {
      element.render();
    })

    /*
    for(let layerName in this.layers) {
      const elementDescriptors = this.layers[layerName];
      elementDescriptors.forEach(elementDescriptor => {
        elementDescriptor.render();
      })
    }
    */
  }

  /**
   * @param {string} groupName
   * @param {MapElementGroup} group
   * @returns {MapElementGroup}
   */
  addGroup(groupName, group, x, y,  matrixCoordinates = true) {

    if(matrixCoordinates) {
      x = x * 48;
      y = y * 48;
    }

    const coordinates = group.getCoordinates();
    coordinates.relative.x = x;
    coordinates.relative.y = y;

    this.groups[groupName] = group;
    group.setParentGroup(this);
    return group;
  }

  getCoordinates() {
    return this.coordinates;
  }

  setParentGroup(group) {
    this.parentGroup = group;
    return group;
  }

  getSubGroups() {
    return this.groups;
  }

  getBoundingBox() {
    return this.boundingBox;
  }

  /**
   * @param {MapElement} element
   * @param {float} x
   * @param {float} y
   * @returns {MapElement}
   */
  addElement(element, x , y, matrixCoordinates = true) {

    if(matrixCoordinates) {
      x = x * 48;
      y = y * 48;
    }

    if(x < this.boundingBox.x0 || this.boundingBox.x0 === null) {
      this.boundingBox.x0 = x
    }
    if(x + element.width > this.boundingBox.x1 || this.boundingBox.x1 === null) {
      this.boundingBox.x1 = x + element.width
    }

    if(y < this.boundingBox.y0 || this.boundingBox.y0 === null) {
      this.boundingBox.y0 = y
    }
    if(y + element.height > this.boundingBox.y1 || this.boundingBox.y1 === null) {
      this.boundingBox.y1 = y + element.height
    }

    const coordinates = new Coordinates();
    coordinates.relative = {
      x: parseInt(x),
      y: parseInt(y),
    };
    coordinates.absolute = {
      x: null,
      y: null,
    };

    element.setCoordinates(coordinates);

    this.elements.push(element);

    /*
    if(typeof(this.layers[layer]) === 'undefined') {
      this.layers[layer] = [];
    }
    element.setGroup(this);
    this.layers[layer].push(descriptor);
    */

    return element;
  }

  getLayers() {
    return this.layers;
  }

}