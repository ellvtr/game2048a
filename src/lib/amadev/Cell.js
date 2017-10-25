/*function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}*/

class Cell {
  constructor(row, coll, app){
    this.value = 0;
    this.x = coll * app.width + 5 * (coll + 1);
    this.y = row * app.width + 5 * (row + 1);
  }

}

module.exports = Cell;
