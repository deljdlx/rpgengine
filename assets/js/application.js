function getArea00() {
  
  const area00 = new AreaDescriptor();

  const character = new Character();
  area00.addElement('surface', character, 2, 3);



  character.addEventListener('collision', (data) => {
    data.source.say('Hello my friend, what can I do for you ?');
  });

  character.addEventListener('endCollision', (data) => {
    data.source.clear();
  });

  /*
  setTimeout(() => {
    character.go('right');
  })
  */

  
  for(let i = 0 ; i < 10 ; i++) {
    area00.addElement('ground', new GroundConcrete00(), 1 + i, 3);
    area00.addElement('ground', new GroundConcrete00(), 1 + i, 4);  
  }

  for(let i = 0 ; i < 7 ; i++) {
    area00.addElement('ground', new GroundConcrete00(), 10, 3 + i);
    area00.addElement('ground', new GroundConcrete00(), 11, 3 + i);  
  }

  area00.addElement('surface', new Tree00(), 0, 0);
  area00.addElement('surface', new Tree00(), 0, 7);
  area00.addElement('surface', new Tree00(), 0.5, 7.5);
  area00.addElement('surface', new Tree00(), 1, 7);

  for(let i = 0 ; i < 10 ; i++) {
    area00.addElement('surface', new Tree00(), 0.5 + Math.random() * i, 7.5 + Math.random() * i);
  }

  area00.addElement('surface', new House00(), 2, 1);

  // ===========================

  function getHouseGroup00() {
    const house00Group = new MapElementGroup();

    for(let i = 0; i < 14 ; i++) {
      house00Group.addElement('surface', new Fence00H(), (16 * i), 24, false);
    }
  
    for(let i = 0; i < 12 ; i++) {
      house00Group.addElement('surface', new Fence00V(), 2, (24 + 16 * i), false);
      house00Group.addElement('surface', new Fence00V(), -8 + (14 * 16), (24 + 16 * i), false);
    }
  
    house00Group.addElement('surface', new House00(), 1, 2);
    house00Group.addElement('surface', new Flower00(), 1.3, 4.5);

    house00Group.addElement('surface', new SunFlower00(), 1.3, 1);
    house00Group.addElement('surface', new SunFlower00(), 1.5, 1);
    house00Group.addElement('surface', new SunFlower00(), 1.7, 1);

    house00Group.addElement('surface', new Sign00(), 3.7, 4);

    return house00Group;
  }


  area00.addGroup(getHouseGroup00(), 6, 0);
  // area00.addGroup(getHouseGroup00(), 11, 0);

  // =========================== 


  /*
  area00.addElement('surface', new House00(), 7, 1);
  area00.addElement('surface', new Flower00(), 7.3, 3.5);
  area00.addElement('surface', new Sign00(), 9.5, 3);

  for(let i = 0; i < 14 ; i++) {
    area00.addElement('surface', new Fence00H(), (6 * 48 + 16 * i), 24, false);
  }

  for(let i = 0; i< 8 ; i++) {
    area00.addElement('surface', new Fence00V(), (6 * 48 + 2), (24 + 16 * i), false);
    area00.addElement('surface', new Fence00V(), (6 * 48 - 8 + 14 * 16), (24 + 16 * i), false);
  }
  */
  
  


  // area00.addElement('surface', new Flower00(), 7, 5);
  // area00.addElement('surface', new Flower01(), 6, 5);

  area00.addElement('surface', new Flower02(), 2, 5);

  area00.addElement('surface', new Fountain00(), 5, 7);

  return area00;
}


document.addEventListener('DOMContentLoaded', () => {

  const viewport = new Viewport();
  viewport.layers.surface.map.areas[0][0].grid();
  viewport.addArea(0, 0, getArea00());
  viewport.launch();

  const gameConsole = new GameConsole(viewport, '#console');
  document.querySelector('#debug-switch').addEventListener('click', (event) => {
    document.querySelector('body').classList.toggle('debug');
  });

  viewport.addEventListener('move', (data) => {
    const {viewport} = data;
    gameConsole.clear();
    gameConsole.addEntry(`Position : (${viewport.x}, ${viewport.y})`);
    gameConsole.addEntry(`Area : (${viewport.area.x}, ${viewport.area.y})`);
  });

  viewport.addEventListener('endCollision', (data) => {
    const container = document.querySelector('#bottom-panel__content');
    container.innerHTML = '';
  });

  viewport.addEventListener('say', (data) => {

    const template = document.querySelector('#chat-entry');
    const entry = template.content.firstElementChild.cloneNode(true);
    const sentenceElement = document.createElement('div');
    sentenceElement.classList = 'sentence';
    sentenceElement.innerHTML = data.sentence;
    entry.querySelector('.chat-content').appendChild(sentenceElement);

    const container = document.querySelector('#bottom-panel__content');
    container.innerHTML = '';
    container.appendChild(entry);
  });

  const statusBar = new StatusBar(viewport);

});

