<script>
const cl = console.log; cl;
const $ = global.$;
// http://seiyria.com/bootstrap-slider/ - https://github.com/seiyria/bootstrap-slider
const Slider = require("bootstrap-slider");

module.exports = {
  name: "game-ui"
  ,data(){
    return {
       amadev: null
      ,gameSize: 4
    };
  }
  ,computed: {
    score(){
      return this.amadev ? this.amadev.score : "&nbsp;";
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
      nv===true ? $("#gameModal").modal("show") : void 0;
    }
    ,score(nv,ov){
      nv===2048 ? $("#gameModal").modal("show") : void 0;
    }
  }
  ,methods: {
    startGame(){
      this.amadev.startGame();
    }
    ,log(){
      cl(arguments)
    }
  }
  ,beforeMount(){
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

    <button @click="startGame()" class="btn btn-primary btn-lg">New game</button>
  </div> <!-- col -->

  <div class="col col-md-8">
    <!-- <div class="pane"> -->
    <canvas id="canvas" width="500" height="500"></canvas>
    <!-- </div> -->
  </div> <!-- col -->

  <!-- <pre>{{gameSize}}</pre> -->

</div> <!-- row -->
</div> <!-- container -->

<div id="gameModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 v-if="loss" class="modal-title">Game over!</h4>
        <h4 v-if="score === 2048" class="modal-title">You made it!</h4>
      </div>
      <div class="modal-body">
        <p>Score: {{score}}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" data-dismiss="modal">Close</button>
        <button @click="startGame()" v-if="score!==2048"
          class="btn btn-primary" data-dismiss="modal">New game</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!--     <div class="input-group">
      <div class="input-group-addon">[2-20]</div>
      <input type="number" class="form-control" placeholder="Game size"
        @change.stop="void 0;"
        v-model.number="gameSize" />
    </div> -->

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
/*.pane {
  border: 1px solid #ccc;
  padding: 1rem;
}*/
#canvas {
  background: #fff;
  border: 1px solid #ccc;
}
.btn {
  margin-top: 2rem;
}
.panel-score {
  width: 20rem;
  background: #337ab7;
  color: #fff;
  font-weight: bold;
  font-size: 200%;
  text-align: center;
}
.block {
  display: block;
}
</style>
