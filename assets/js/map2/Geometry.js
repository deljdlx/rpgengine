class Geometry
{
  /**
   * @type {Number}
   */
  _width = 16;

  /**
   * @type {Number}
   */
  _height = 16;
  /**
   * @type {Coordinates}
   */
  _coordinates;

  constructor() {
    this._coordinates = new Coordinates();
  }

  coordinates() {
    return this._coordinates;
  }

  width(value = null) {
    if(value !== null) {
      this._width = value;
    }
    return this._width;
  }

  height(value = null) {
    if(value !== null) {
      this._height = value;
    }
    return this._height;
  }

  x(value = null) {
    return this._coordinates.x(value);
  }

  y(value = null) {
    return this._coordinates.y(value);
  }

  add(axis, value) {
    return this._coordinates.add(axis, value);
  }

}
