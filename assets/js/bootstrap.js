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
  application.registerElement('Flower00', Flower00);

  
  const gameConsole = new GameConsole(application, '#game-console');
  gameConsole.addEntry('Hello world');

  application.addEventListener('map.update', (event) => {
    // console.log(event);
  });

  application.addEventListener('element.collision', (event) => {
    event.target.getRenderer().getDom().classList.add('collided');
    gameConsole.addEntry('collision');
    console.log(event.target);
  });

  application.addEventListener('element.collision.end', (event) => {
    event.target.getRenderer().getDom().classList.remove('collided');
  });
 

  application.addEventListener('element.trigger', (event) => {
    event.target.getRenderer().getDom().classList.add('collided');
  });

  application.addEventListener('element.trigger.end', (event) => {
    event.target.getRenderer().getDom().classList.remove('collided');
  });



  const viewport = new Viewport(
    application,
    document.querySelector('#viewport'),
    MAP_CONFIGURATION.width,
    MAP_CONFIGURATION.height,
  );

  const board = viewport.getBoard();
  await board.initializeAsync();

  const flower = board.getAreaAt(0, 0).addElement(0, 300, new Flower00());
  flower.addEventListener('trigger', () => {
    console.log('%cbootstrap.js :: 56 =============================', 'color: #f00; font-size: 1rem');
    console.log("ICI");
  });

  console.log('%cbootstrap.js :: 55 =============================', 'color: #f00; font-size: 1rem');
  console.log(flower);


  viewport.render();
  viewport.run();



  /*
  board.initialize();
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
  */


  // viewport.render();
  // viewport.run();












  // application.run();




  /*
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
  */



});