class ElementDescriptor
{

  /**
   * @type {MapElement}
   */
  element;

  /**
   * @type {Coordinates}
   */
  coordinates;


  /**
   * @param {MapElement} element 
   * @param {Coordinates} coordinates 
   */
  constructor(element, coordinates) {
    this.element = element;
    this.coordinates = coordinates;
  }
}
