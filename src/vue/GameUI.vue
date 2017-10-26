<script>
const cl = console.log; cl;

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
  }
  ,watch: {
    gameSize(nv,ov){
      nv > 20 ? this.gameSize = 20 : void 0;
      // cl('gameSize,nv,ov',nv,ov);
      this.amadev.setSize(nv);
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
};

</script>

<template>
<div class="container">
<div class="jumbotron">
  <h1>2048</h1>
</div>

<div class="row">

  <div class="col col-md-4">
    <!-- <p>Score: {{score}}</p> -->
    <div class="panel panel-primary panel-score">
      <div class="panel-heading">
        <h3 class="panel-title">Score</h3>
      </div>
      <div class="panel-body">
        {{score}}
      </div>
    </div>

    <div class="input-group">
      <div class="input-group-addon">[2-20]</div>
      <input type="number" class="form-control" placeholder="Game size"
        @change.stop="void 0;"
        v-model.number="gameSize" />
    </div>
    <button @click="startGame()" class="btn btn-primary">New game</button>
  </div> <!-- col -->

  <div class="col col-md-8">
    <!-- <div class="pane"> -->
    <canvas id="canvas" width="500" height="500"></canvas>
    <!-- </div> -->
  </div> <!-- col -->

</div> <!-- row -->
</div> <!-- container -->

</template>

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
  width: 12rem;
  /*margin-left: auto;*/
  /*margin-right: auto;*/
}
</style>
