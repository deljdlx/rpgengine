
const board = new Board();

board.x(0);
board.y(0);
board.width(500);
board.height(500);

board.createCollisionZone(70,50, 30, 10);
board.createCollisionZone(120,70, 10, 10);
board.createCollisionZone(90,100, 10, 10);

const child = board.createElement(290, 10, 100 ,100);
child.createCollisionZone(30,10, 10, 10);
child.createCollisionZone(30,30, 50, 50);

child.createElement(10,10, 10,10);


const child2 = board.createElement(10, 130, 380 ,200);
child2.createCollisionZone(10,10, 10, 10);
child2.createCollisionZone(30,30, 10, 10);
const child3 = child2.createElement(70,10, 300, 180);
child3.createCollisionZone(50, 50, 10, 50);
child3.createCollisionZone(100, 10, 20, 10);

const child4 = child3.createElement(150, 100, 50, 50);
child4.createCollisionZone(10, 10, 30, 30);


const character = board.createElement(240,270, 10, 10);
character.createCollisionZone(0, 0, 10, 10);

// const dom = board.render();
// board.run();


// character.getRenderer().getDom().style.backgroundColor = '#f0f';
/*
character.getCollision(board).forEach(element => {
  element.getRenderer().getDom().style.backgroundColor = '#f00';
});
*/

// document.querySelector('#board').appendChild(dom);


const viewport = new Viewport(
  document.querySelector('#viewport'),
  board,
  0,
  0,
);

viewport.render();
viewport.run();


board.renderCollisionZones();