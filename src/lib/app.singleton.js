const App = require("./App");
const Amadev = require("./amadev");

module.exports = new App({
  amadev: new Amadev()
});
