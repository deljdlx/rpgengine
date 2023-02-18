
const MAP_CONFIGURATION = {
  width: 400,
  height: 400,
}

const board = new Board(MAP_CONFIGURATION.width * 3, MAP_CONFIGURATION.height * 3);

const area = board.getAreaAt(0, 0);


for(let i = 0 ; i < 8 ; i++) {
  area.addElement(384 - i * 50, 263, new Ground00());
}




area.addElement(300, 50, new House01());
area.addElement(300, 300, new House01());
area.addElement(50, 50, new FenceGroup00());

area.addElement(200, 360, new Fountain00());


area.addElement(100, 260, new Character(0, 0, 48 * 3));



for(let x = 0 ; x < 20 ; x++) {
  area.addElement(
    70 + Math.random() * 200,
    60 + Math.random() * 150,
    new Sunflower00()
  );
}



// board.getAreaAt(1, 0).addElement(50, 50, new House00());


// console.log('%cbootstrap.js :: 32 =============================', 'color: #f00; font-size: 1rem');
// console.log(board.collisionBoundingBox);

// board.getAreaAt(1, 0).addElement(200, 200, new House00());



// area.addElement(70, 180, new Sunflower00());


// area.createElement(50, 50, 130, 130).createCollisionZone(10, 50, 110, 70);


// board.getAreaAt(1, 0).createElement(0, 0, 30, 30).createCollisionZone(0, 0, 30, 30);
// board.getAreaAt(1, 1).createElement(0, 0, 30, 30).createCollisionZone(0, 0, 30, 30);

/*
board.getAreaAt(-1, 0).createElement(0, 0, 80, 80)
  .createElement(50, 50)
  .createCollisionZone(0, 0, 10, 10)
;
*/






// board.x(0);
// board.y(0);
// board.width(200);
// board.height(200);

/*
const area = new Area(board);

area.createCollisionZone(50,50, 50, 50);
area.createCollisionZone(100,100, 50, 50);

const child = area.createElement(200, 0, 300, 300);
child.createCollisionZone(0, 0, 50, 50);
child.createCollisionZone(50,50, 50, 50);
  const child2 = child.createElement(100,100, 200, 200);
  child2.createCollisionZone(50,50, 50, 50);


const child3 = area.createElement(100, 200, 300, 300);
  child3.createCollisionZone(0, 0, 50, 50);
  child3.createCollisionZone(50,50, 50, 50);
*/


const viewport = new Viewport(
  document.querySelector('#viewport'),
  board,
  0,
  0,
  MAP_CONFIGURATION.width,
  MAP_CONFIGURATION.height,
);

viewport.render();
viewport.run();

//board.renderCollisionZones();


// console.log('%cbootstrap.js :: 67 =============================', 'color: #f00; font-size: 1rem');
// console.log(board);
