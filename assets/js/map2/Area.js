class Area extends Element
{
  /**
   * @type {Board}
   */
  board;


  // _hasSprite = false;

  /**
   * 
   * @param {Board} board 
   * @param {Number} x 
   * @param {Number} y 
   */
  constructor(board, x, y) {
    super(x, y, board.width(), board.height());
    this.board = board;
    this.renderer = new AreaRenderer(this);
  }

  update() {
    this.getRenderer().update();
    this.getChildren().forEach(element => {
      element.update();
    });
  }

}
