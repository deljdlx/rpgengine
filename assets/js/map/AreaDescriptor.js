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

}

