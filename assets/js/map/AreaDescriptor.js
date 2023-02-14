class AreaDescriptor
{

  spriteWidth = 32;
  spriteHeight = 32;

  layers = {};

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
  }

  /**
   * @param {MapElementGroup} group
   * @param {float} x 
   * @param {float} y 
   * @returns {MapElement}
   */
  addGroup(group, x , y, matrixCoordinates = true) {

    if(matrixCoordinates) {
      x = x * 48;
      y = y * 48;
    }

    const layers = group.getLayers();
    for(let layerName in layers) {
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
    }


    // console.log('%cMapArea.js :: 84 =============================', 'color: #f00; font-size: 1rem');
    // console.log(group.getLayers());
  }


}

