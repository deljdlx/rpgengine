class Area extends Element
{
  /**
   * @type {Board}
   */
  board;

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
}
