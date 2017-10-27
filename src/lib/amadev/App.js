const cl = console.log; cl; // Shorthand, avoid lint error using 'cl' once
const Hammer = require("hammerjs");

const $ = global.$;
const document = global.document;

const Cell = require("./Cell");

class App {
  constructor(){
    this.score = 0;
    this.size = 4;
    this.cells = [];
    this.fontSize;
    this.loss = false;
  } // constructor

  render(){
    // props:
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width / this.size - 6;
    // event handler for arrow key events:
    $(document).on("keydown", function(event){
      if (!this.loss) {
        if (event.keyCode === 38 || event.keyCode === 87) {
          this.moveUp(); 
        } else if (event.keyCode === 39 || event.keyCode === 68) {
          this.moveRight();
        } else if (event.keyCode === 40 || event.keyCode === 83) {
          this.moveDown(); 
        } else if (event.keyCode === 37 || event.keyCode === 65) {
          this.moveLeft(); 
        }
      }
    }.bind(this) );
    // event handler for swipe events:
    const hmr = new Hammer(this.canvas);
    hmr.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hmr.on("swipe", e=>{
      switch(e.offsetDirection){
        case 2:
          this.moveLeft(); break;
        case 4:
          this.moveRight(); break;
        case 8:
          this.moveUp(); break;
        case 16:
          this.moveDown(); break;
        default:
          cl("Amadev 2048 swipe; no case match for: " + e.offsetDirection);
      }
    });

  } // render

  canvasClean(){
    this.ctx.clearRect(0, 0, 500, 500);
  }

  resetGame(){
    this.score = 0;
    this.loss = false;
    this.canvas.style.opacity = '1';
    this.canvasClean();
  }

  startGame(){
    this.resetGame();
    this.createCells();
    this.drawAllCells();
    this.pasteNewCell();
    this.pasteNewCell();
  }

  setSize(size){
    size > 12 ? size = 12 : void 0;
    size < 2 ? size = 2 : void 0;
    this.size = size;
    this.width = this.canvas.width / this.size - 6;
    this.canvasClean();
    this.startGame();
  }

  finishGame(){
    this.canvas.style.opacity = '0.5';
    this.loss = true;
  }

  createCells(){
    var i, j;
    for(i = 0; i < this.size; i++) {
      this.cells[i] = [];
      for(j = 0; j < this.size; j++) {
        this.cells[i][j] = new Cell(i, j, this);
      }
    }
  }

  drawAllCells(){
    var i, j;
    for(i = 0; i < this.size; i++) {
      for(j = 0; j < this.size; j++) {
        this.drawCell(this.cells[i][j]);
      }
    }
  }

  drawCell(cell){
    this.ctx.beginPath();
    this.ctx.rect(cell.x, cell.y, this.width, this.width);
    switch (cell.value){
      case 0 : this.ctx.fillStyle = '#efefef'; break;
      case 2 : this.ctx.fillStyle = '#D2691E'; break;
      case 4 : this.ctx.fillStyle = '#FF7F50'; break;
      case 8 : this.ctx.fillStyle = '#ffbf00'; break;
      case 16 : this.ctx.fillStyle = '#bfff00'; break;
      case 32 : this.ctx.fillStyle = '#40ff00'; break;
      case 64 : this.ctx.fillStyle = '#00bfff'; break;
      case 128 : this.ctx.fillStyle = '#FF7F50'; break;
      case 256 : this.ctx.fillStyle = '#0040ff'; break;
      case 512 : this.ctx.fillStyle = '#ff0080'; break;
      case 1024 : this.ctx.fillStyle = '#D2691E'; break;
      case 2048 : this.ctx.fillStyle = '#FF7F50'; break;
      case 4096 : this.ctx.fillStyle = '#ffbf00'; break;
      default : this.ctx.fillStyle = '#ff0080';
    }
    this.ctx.fill();
    if (cell.value) {
      this.fontSize = this.width/2;
      this.ctx.font = this.fontSize + 'px Arial';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(cell.value, cell.x + this.width / 2, cell.y + this.width / 2 + this.width/7);
    }
  } // drawCell

  pasteNewCell(){
    var countFree = 0;
    var i, j;
    for(i = 0; i < this.size; i++) {
      for(j = 0; j < this.size; j++) {
        if(!this.cells[i][j].value) {
          countFree++;
        }
      }
    }
    if(!countFree) {
      this.finishGame();
      return;
    }
    while(true) {
      var row = Math.floor(Math.random() * this.size);
      var coll = Math.floor(Math.random() * this.size);
      if(!this.cells[row][coll].value) {
        this.cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
        this.drawAllCells();
        return;
      }
    }
  } // pasteNewCell

  moveRight() {
    var i, j;
    var coll;
    for(i = 0; i < this.size; i++) {
      for(j = this.size - 2; j >= 0; j--) {
        if(this.cells[i][j].value) {
          coll = j;
          while (coll + 1 < this.size) {
            if (!this.cells[i][coll + 1].value) {
              this.cells[i][coll + 1].value = this.cells[i][coll].value;
              this.cells[i][coll].value = 0;
              coll++;
            } else if (this.cells[i][coll].value === this.cells[i][coll + 1].value) {
              this.cells[i][coll + 1].value *= 2;
              this.score += this.cells[i][coll + 1].value;
              this.cells[i][coll].value = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
    }
    this.pasteNewCell();
  } // moveRight

  moveLeft(){
    var i, j;
    var coll;
    for(i = 0; i < this.size; i++) {
      for(j = 1; j < this.size; j++) {
        if(this.cells[i][j].value) {
          coll = j;
          while (coll - 1 >= 0) {
            if (!this.cells[i][coll - 1].value) {
              this.cells[i][coll - 1].value = this.cells[i][coll].value;
              this.cells[i][coll].value = 0;
              coll--;
            } else if (this.cells[i][coll].value === this.cells[i][coll - 1].value) {
              this.cells[i][coll - 1].value *= 2;
              this.score += this.cells[i][coll - 1].value;
              this.cells[i][coll].value = 0;
              break;
            } else {
              break; 
            }
          }
        }
      }
    }
    this.pasteNewCell();
  } // moveLeft

  moveUp(){
    var i, j, row;
    for(j = 0; j < this.size; j++) {
      for(i = 1; i < this.size; i++) {
        if(this.cells[i][j].value) {
          row = i;
          while (row > 0) {
            if(!this.cells[row - 1][j].value) {
              this.cells[row - 1][j].value = this.cells[row][j].value;
              this.cells[row][j].value = 0;
              row--;
            } else if (this.cells[row][j].value === this.cells[row - 1][j].value) {
              this.cells[row - 1][j].value *= 2;
              this.score += this.cells[row - 1][j].value;
              this.cells[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
        }
      }
    }
    this.pasteNewCell();
  } // moveUp

  moveDown(){
    var i, j, row;
    for(j = 0; j < this.size; j++) {
      for(i = this.size - 2; i >= 0; i--) {
        if(this.cells[i][j].value) {
          row = i;
          while (row + 1 < this.size) {
            if (!this.cells[row + 1][j].value) {
              this.cells[row + 1][j].value = this.cells[row][j].value;
              this.cells[row][j].value = 0;
              row++;
            } else if (this.cells[row][j].value === this.cells[row + 1][j].value) {
              this.cells[row + 1][j].value *= 2;
              this.score += this.cells[row + 1][j].value;
              this.cells[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
        }
      }
    }
    this.pasteNewCell();
  } // moveDown

} // class App

module.exports = App;
