document.addEventListener('DOMContentLoaded', async () => {


  const MAP_CONFIGURATION = {
    width: 600,
    height: 400,
  }

  const application = new Application(
    '#viewport',
    MAP_CONFIGURATION.width,
    MAP_CONFIGURATION.height,
  );

  application.registerElement('FenceGroup00', FenceGroup00);
  application.registerElement('House00', House00);
  application.registerElement('House01', House01);
  application.registerElement('Fountain00', Fountain00);
  application.registerElement('Woman00', Woman00);

  application.run();


//  const board = application.getViewport().getBoard();
//   const area = await board.getAreaAt(0, 0);
//   area.addElement(10, 0, new House01());
// board.getRenderer().renderAreas();



  /*
  for(let i = 0 ; i < 8 ; i++) {
    area.addElement(384 - i * 50, 263, new Ground00());
  }





  area.addElement(300, 310, new House01());

  area.addElement(50, 50, new FenceGroup00());

  area.addElement(200, 360, new Fountain00());


  const character = area.addElement(100, 260, new Character(0, 0, 48 * 3));

  setTimeout(() => {
    character.moveTo(200, 260, (character) => {
      console.log('%cbootstrap.js :: 33 =============================', 'color: #f00; font-size: 1rem');
      console.log("GOAL");
    });
  });


  for(let x = 0 ; x < 20 ; x++) {
    area.addElement(
      70 + Math.random() * 200,
      60 + Math.random() * 150,
      new Sunflower00()
    );
  }
  */




  // viewport.render();

  // viewport.renderDebug();


  // viewport.run();

  // board.renderCollisionZones();
  // console.log('%cbootstrap.js :: 67 =============================', 'color: #f00; font-size: 1rem');
  // console.log(board);



});
