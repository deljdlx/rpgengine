class Coordinates
{
  relative = {
    x: 0,
    y: 0,
  };
  absolute = {
    x: 0,
    y: 0,
  };

  setAbsolute(x, y) {
    this.absolute.x = y;
    this.absolute.y = y;
    return this;
  }
}
