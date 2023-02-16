
class Viewport {
  dom;
  map;
  character;

  /**
   * @type {Layer[]}}
   */
  layers = {};

  left = 0;
  top = 0;

  x = 0;
  y = 0;

  cellSize = 32;

  width = 576;
  height = 576;

  movingDirection = null;
  moving = false;

  moveSpeed = 2;

  listeners = {};

  areaDescriptors = [];



  constructor(width = 576, height = 576) {

    this.width = width;
    this.height = height;

    this.dom = document.querySelector('.viewport');
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';

    this.addLayer('ground');
    this.addLayer('surface');
    this.initializeMainCharacter();
  }


  render() {
    this.areaDescriptors.forEach(areaDescriptor => {
      areaDescriptor.render();
    });
  }

  /**
   * @returns {MainCharacter}
   */
  getCharacter() {
    return this.character;
  }

  /**
   * @returns {MainCharacter}
   */
  initializeMainCharacter() {
    this.character = new MainCharacter(
      'assets/images/characters/characters-00.png',
      (48 * 3),
      (48 * 4),
    );

    this.character.render();

    this.character.setViewport(this);
    this.dom.appendChild(this.character.dom);
    this.character.coordinates.absolute.x = this.x + this.width / 2;
    this.character.coordinates.absolute.y = this.y + this.height / 2;

    this.character.x = this.x + this.width / 2;
    this.character.y = this.y + this.height / 2;
    this.character.dom.style.left = this.width / 2 + 'px';
    this.character.dom.style.top = this.height / 2 + 'px';

    return this.character;
  }

  // ===========================

  loadAreaDescriptor(areaX, areaY, areaDescriptor) {

    this.areaDescriptors.push(areaDescriptor);
    areaDescriptor.getCoordinates().setAbsolute(
      areaX * this.cellSize,
      areaY * this.cellSize
    );


    /*
    for(let layerName in areaDescriptor.layers) {
      const layer = this.getLayer(layerName);
      if(layer === false) {
        continue
      }

      for(let x in areaDescriptor.layers[layerName]) {
        for(let y in areaDescriptor.layers[layerName][x]) {
          const element = areaDescriptor.layers[layerName][x][y];
          layer.getArea(areaX, areaY).addElement(element, x, y);
          element.update();
        }
      }
    }
    */

    return areaDescriptor;
  }


  getLayer(name) {
    if(typeof(this.layers[name]) !== 'undefined') {
      return this.layers[name];
    }
    return false;
  }

  // =========================== 


  addEventListener(name, callback) {
    if(typeof(this.listeners[name]) === 'undefined') {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);

    return this.listeners[name].length - 1;
  }

  handle(name, data = {}) {
    if(typeof(this.listeners[name]) !== 'undefined') {
      this.listeners[name].map(callback => {
        callback(data);
      });
    }
  }

  getViewportData() {
    return {
      viewport: this,
      x: this.x,
      y: this.y,
      direction: this.movingDirection,
      area: this.getCurrentAreaCoordinates(),
    };
  }

  // =========================== 

  getCurrentAreaCoordinates() {
    const areaY = Math.floor((this.y + this.height / 2) / this.height);
    const areaX = Math.floor((this.x + this.width / 2) / this.width);
    return {
      x : areaX,
      y: areaY,
    };
  }

  getCurrentArea() {
    const {x, y} = this.getCurrentAreaCoordinates();
    return this.layers['surface'].getArea(x, y);
  }

  getCurrentElements() {
    return this.getCurrentArea().getElements();
  }

  /**
   * @param {String} layerName
   * @param {*} fixed 
   * @returns {Layer}
   */
  addLayer(layerName, fixed = false) {
    this.layers[layerName] = new Layer(this, layerName, fixed);
    return this.layers[layerName];
  }


  detectCollision(sourceElement) {

    let hasCollision = false;

    if(!sourceElement) {
      sourceElement = this.character;
    }

    this.areaDescriptors.forEach(areaDescriptor => {
      const areaBoundingBox = areaDescriptor.getBoundingBox();

      const areaCollided = sourceElement.isCollided({
        x0: areaBoundingBox.x0 + areaDescriptor.getCoordinates().absolute.x,
        x1: areaBoundingBox.x1 + areaDescriptor.getCoordinates().absolute.x,
        y0: areaBoundingBox.y0 + areaDescriptor.getCoordinates().absolute.y,
        y1: areaBoundingBox.y1 + areaDescriptor.getCoordinates().absolute.y,
      });

      if(areaCollided) {
        console.log('%cViewport.js :: 193 =============================', 'color: #f00; font-size: 1rem');
        console.log("COLLISION");
        areaDescriptor.getGroups().forEach(group => {
          const groupBoundingBox = group.getBoundingBox();
          // console.log('%cViewport.js :: 195 =============================', 'color: #f00; font-size: 1rem');
          // console.log(groupBoundingBox);
        })
      }
    });

    return false;


    for(let layerName in this.layers) {

      if(hasCollision) {
        break;
      }

      const map = this.layers[layerName].map;

      for (let x  in map.areas) {

        if(hasCollision) {
          break;
        }

        for (let y in map.areas[x]) {
          const area = map.areas[x][y];

          if(hasCollision) {
            break;
          }

          area.getElements().forEach((elementDescriptor) => {

            if(hasCollision) {
              return true;
            }

            const element = elementDescriptor.element;

            if(sourceElement === elementDescriptor.element) {
              return hasCollision;
            }


            if(sourceElement !== this.character) {
              if(sourceElement.isCollided(this.character.getDescriptor())) {
                hasCollision = true;

                /*
                sourceElement.handle('collision', {
                  source: sourceElement,
                  target: this.character,
                  withMainCharacter: true,
                });
                */

                return true;
              }
            }

            if(sourceElement.isCollided(elementDescriptor)) {
              hasCollision = true;
              /*
              const withMainCharacter = (sourceElement === this.character) ? true : false;
              element.handle('collision', {
                source: element,
                target: sourceElement,
                withMainCharacter: withMainCharacter,
              });
              */

              element.dom.classList.add('collision');
            }
            else {
              element.dom.classList.remove('collision');
            }
          });
        }
      }
    }

    /*
    if(hasCollision) {
      this.handle('collision');
    }
    */

    return hasCollision;
  }

  stop() {
    this.moving = false;
    this.movingDirection = null;
    this.character.stop();
  }

  update() {

    if(!this.moving) {
      return;
    }

    const currentX = this.x;
    const currentY = this.y;

    if(this.movingDirection === 'up') {
      this.y -= this.moveSpeed;
    }
    else if(this.movingDirection === 'down') {
      this.y += this.moveSpeed;
    }
    else if(this.movingDirection === 'left') {
      this.x -= this.moveSpeed;
    }
    else if(this.movingDirection === 'right') {
      this.x += this.moveSpeed;
    }

    this.character.coordinates.absolute.x = this.x + this.width / 2;
    this.character.coordinates.absolute.y = this.y + this.height / 2;


    const collision = this.detectCollision();

    if(collision) {
      this.x = currentX;
      this.y = currentY;

      this.character.coordinates.absolute.x = this.x + this.width / 2;
      this.character.coordinates.absolute.y = this.y + this.height / 2;

      this.stop();
      return;
    }

    this.character.go(this.movingDirection);

    this.handle('move', {
      viewport: this.getViewportData(),
    });

    const currentArea = this.getCurrentAreaCoordinates();
    for(let layerName in this.layers) {
      const map = this.layers[layerName].map;
      map.dom.style.left = this.x * -1 + 'px';
      map.dom.style.top = this.y * -1 + 'px';
      map.loadAreasAround(currentArea.x, currentArea.y);
    }


    this.getCurrentElements().map(elementDescriptor => {
      const element = elementDescriptor.element;
      element.update();
    })


    setTimeout(() => {
      this.update();
    }, 5);
  }


  move(direction) {
    if(this.moving) {
      return;
    }

    this.moving = true;

    if(direction) {
      this.movingDirection = direction;
    }

    this.update();
  }


  launch() {

    document.body.addEventListener('keyup', (event) => {
      this.stop();
      return;
    });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.move('left');
      }

      if (event.key === 'ArrowRight') {
        this.move('right');
      }
      if (event.key === 'ArrowUp') {
        this.move('up');
      }
      if (event.key === 'ArrowDown') {
        this.move('down');
      }
    });
  }
}