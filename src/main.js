const cl = console.log; cl; // Shorthand, avoid lint error using 'cl' once
// const $ = require("jquery");
// global.$ = global.jQuery = $;
const Vue = require("vue");
const gameUI = require("./vue/GameUI.vue");

const Amadev = require("./lib/amadev");
const amadev = global.amadev = new Amadev();
global.gameUI = gameUI;

new Vue({ 
  el: '#game-ui',
  render: (h) => h(gameUI)
});

amadev.render("canvas");
amadev.startGame();
