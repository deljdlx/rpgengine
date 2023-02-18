class House01 extends House00
{
  constructor() {
    super(0, 0 , 130, 130)
    this.createCollisionZone(10, 50, 110, 70);

    const flowersCount = Math.random() * 5;
    for(let i = 0 ; i < flowersCount ; i++) {
      const left = 130 + Math.random() * 50;
      const top = Math.random() * 100 - 40;
      this.addElement(left, top, new Sunflower00());
    }
    

    this.addElement(50, -70, new Tree00());
    this.addElement(160, 70, new Tree00());

    const fenceLeft = -32;
    const right = 16 * 15 - 32;


    const fence0 = this.createElement(fenceLeft, -50);
    for(let i = 0 ; i < 15 ; i++) {
      fence0.addElement(i * 16, 0, new Fence00H());
    }

    const fence1 = this.createElement(fenceLeft, -50);
    for(let i = 0 ; i < 13 ; i++) {
      fence1.addElement(0, i * 16, new Fence00V());
    }

    const fenceRight = this.createElement(right, -50);
    for(let i = 0 ; i < 13 ; i++) {
      fenceRight.addElement(0, i * 16, new Fence00V());
    }

    const fence2 = this.createElement(fenceLeft, -50);
    for(let i = 0 ; i < 6 ; i++) {
      fence2.addElement(i * 16, 13 * 16, new Fence00H());
    }

    const fence3 = this.createElement(fenceLeft + 16 * 8 + 8, -50);
    for(let i = 0 ; i < 7 ; i++) {
      fence3.addElement(i * 16, 13 * 16, new Fence00H());
    }
    
  }
}