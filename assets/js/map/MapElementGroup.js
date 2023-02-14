class MapElementGroup
{

  layers = {};
  elements = [];

  constructor() {

  }

  /**
   * 
   * @param {MapElement} element 
   * @param {float} x 
   * @param {float} y 
   * @returns {MapElement}
   */
  addElement(layer, element, x , y, matrixCoordinates = true) {

    if(matrixCoordinates) {
      x = x * 48;
      y = y * 48;
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

    const descriptor = new ElementDescriptor(element, coordinates);
    this.elements.push(descriptor);

    if(typeof(this.layers[layer]) === 'undefined') {
      this.layers[layer] = [];
    }

    this.layers[layer].push(descriptor);

    return element;
  }

  getLayers() {
    return this.layers;
  }

}