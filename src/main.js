const cl = console.log; cl;
// const $ = require("jquery");
// global.$ = global.jQuery = $;
const Vue = require("vue");
const vueTemp = require("./vue/template.vue");
const Amadev = require("./lib/amadev");
global.amadev = new Amadev();

new Vue({ 
  el: '#ui',
  render: (h) => h(vueTemp)
});
