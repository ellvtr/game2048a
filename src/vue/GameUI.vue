<script>
const cl = console.log; cl; // Shorthand, avoid lint error using 'cl' once
const $ = global.$;
// http://seiyria.com/bootstrap-slider/ - https://github.com/seiyria/bootstrap-slider
const Slider = require("bootstrap-slider");

module.exports = {
  name: "game-ui"
  ,data(){
    return {
       amadev: null
      ,gameSize: 4
      ,gameAvailablePx: 200
      ,maxCellValue: null
      ,reached2048: false
    };
  }
  ,computed: {
    score(){
      return this.amadev ? this.amadev.score : "";
    }
    ,loss(){
      return this.amadev ? this.amadev.loss : null ;
    }
  }
  ,watch: {
    gameSize(nv,ov){
      this.amadev.setSize(nv);
    }
    ,loss(nv,ov){
      // Notify when game is lost:
      nv===true ? $("#gameModal").modal("show") : void 0;
    }
    ,score(nv,ov){
      // Congrats if a cell is 2048, but only first time:
      this.maxCellValue = this.amadev.getMaxCellValue();
      if(!this.reached2048 && this.maxCellValue === 2048){
        this.reached2048 = true;
        $("#gameModal").modal("show");
      }
    }
  }
  ,methods: {
    startGame(){
      this.amadev.startGame();
    }
  }
  ,beforeMount(){
    // Set canvas size to fit screen size:
    const w = $(window).innerWidth() - 30;
    this.gameAvailablePx = w > 500 ? 500 : w;
    // Set amadev instance:
    this.amadev = global.amadev;
  }
  ,mounted(){
    // Create a slider and attach event listener:
    const slr = new Slider("#slr1", {
      formatter: function(value) {
        return 'Game size: ' + value;
      }
    });
    slr.on("change", o=>{
      this.gameSize = o.newValue;
    });
  } // mounted
};

</script>

<template><span>

<div class="container">
<div class="jumbotron">
  <h1>2048</h1>
</div>

<div class="row">

  <div class="col col-md-4">

    <div class="panel panel-primary panel-score">
      <div class="panel-body">
        Score: {{score}}
      </div>
    </div>

    <div class="form-group">
    <label for="slr1" class="block">Game size:</label>
    <input id="slr1" data-slider-id='slr1a' type="number"
      data-slider-min="2" data-slider-max="12" 
      data-slider-step="1" :data-slider-value="gameSize"/> <br/>
    </div>

    <button @click="startGame()" class="btn btn-primary btn-lg startGame">New game</button>
  </div> <!-- col -->

  <div class="col col-md-8" id="gameCol">
    <canvas id="canvas" :width="gameAvailablePx" :height="gameAvailablePx"></canvas>
  </div> <!-- col -->

  <!-- <pre>{{gameAvailablePx}}</pre> -->

</div> <!-- row -->
</div> <!-- container -->

<div id="gameModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 v-if="loss" class="modal-title">Game over!!</h4>
        <h4 v-if="maxCellValue === 2048" class="modal-title">You made it!</h4>
      </div>
      <div class="modal-body">
        <p>Score: {{score}}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" data-dismiss="modal">Close</button>
        <button @click="startGame()" v-if="maxCellValue!==2048"
          class="btn btn-primary" data-dismiss="modal">New game</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Regular input:
    <div class="input-group">
      <div class="input-group-addon">[2-20]</div>
      <input type="number" class="form-control" placeholder="Game size"
        @change.stop="void 0;"
        v-model.number="gameSize" />
    </div>
 -->

</span></template>

<style scoped>
.row {
  margin-top: 2rem;
}
.jumbotron {
  margin-top: 2rem;
}
.jumbotron h1 {
  text-align: center;
}
#canvas {
  background: #fff;
  border: 1px solid #ccc;
  margin-bottom: 4rem;
}
.btn.startGame {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.panel-score {
  width: 20rem;
  background: #fff;
  /*background: #337ab7;*/
  border-color: #337ab7;
  border-width: 0.4rem;
  border-radius: 0.8rem;
  color: #337ab7;
  /*color: #fff;*/
  font-weight: bold;
  font-size: 200%;
  text-align: center;
}
.block {
  display: block;
}
</style>
