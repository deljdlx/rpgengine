class GroupHome00 extends MapElementGroup
{

  constructor() {
    super();

    this.addElement('surface', new House00(), 1, 2);


    // this.addElement('surface', new Sign00(), 3.7, 4);

    /*
    const fenceTop = new MapElementGroup();
    for(let i = 0; i < 14 ; i++) {
      fenceTop.addElement('surface', new Fence00H(), (16 * i), 0, false);
    }
    this.addGroup('fenceTop', fenceTop, 0, 24, false);
    */


    /*
    for(let i = 0; i < 12 ; i++) {
      this.addElement('surface', new Fence00V(), 2, (24 + 16 * i), false);
      this.addElement('surface', new Fence00V(), -8 + (14 * 16), (24 + 16 * i), false);
    }
    */


    // this.addElement('surface', new Flower00(), 1.3, 4.5);

    /*
    const flowers =  new GroupFlowers00();
    this.addGroup('flowers', flowers, 1, 1);

    const flowers2 =  new GroupFlowers00();
    this.addGroup('flowers2', flowers2, 2, 1);
    */
  }
}