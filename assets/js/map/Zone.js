class Zone
{

  mapElement;
  mapArea;
  map;
  viewport;

  dom;

  width;
  height;

  x;
  y;

  solid = true;


  constructor(mapElement, width, height, x, y) {

    this.mapElement = mapElement;

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    /*
    this.dom = document.createElement('div');
    this.dom.classList.add('element-zone');
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    */


    // console.log('%cZone.js :: 39 =============================', 'color: #f00; font-size: 1rem');
    // console.log(this.collisionTop, this.collisionBottom, this.collisionLeft, this.collisionRight);
  }
}
