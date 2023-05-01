class Editor
{


  selectedSprite = 'Tree00';
  application;

  spritePanel;

  constructor(application) {

    this.application = application;


    this.spritePanel = document.querySelector('#sprite-panel');

    this.initializeSpritePanel();
    this.initializeEvents();

  }

  initializeSpritePanel() {
    this.application.getRegisteredElements().forEach(elementName => {
      this.registerSprite(elementName);
    });
  }

  registerSprite(spriteName) {
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('editor-sprite-container');


    const sprite = this.application.instanciate(spriteName);
    const element = sprite.render();
    spriteContainer.style.width = sprite.getBoundingBox().width() + 'px';
    spriteContainer.style.height = sprite.getBoundingBox().height() + 'px';

    spriteContainer.append(element);


    sprite.getAllChildren().forEach(child => {
      element.append(child.render());
      // this.dom.append(child.getDom());
    });

    spriteContainer.addEventListener('click', () => {
      this.selectedSprite = spriteName;
    });

    this.spritePanel.append(spriteContainer);

  }





  initializeEvents() {

    this.application.addEventListener('area.click', (event) => {
      console.log('%ceditor-bootstrap.js :: 52 =============================', 'color: #f00; font-size: 1rem');
      const area = event.area;

      const sprite = this.application.instanciate(this.selectedSprite);

      const x = event.areaX - sprite.width() / 2;
      const y = event.areaY - sprite.height() / 2;


      const element = area.addElement(
        x,
        y,
        sprite,
        'foobar',
      );

      console.log(event)
      console.log(area);

      console.log('%ceditor-bootstrap.js :: 65 =============================', 'color: #f00; font-size: 1rem');
      console.log(element);

      area.getBoard().getRenderer().update();
      new DraggableElement(element);
    });
  }


}

