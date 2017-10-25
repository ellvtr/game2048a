<script>
module.exports = {
  name: "my-comp"
  ,data(){
    return {
      msg: "Some Message"
    };
  }
};

</script>

<template><span>
  <h1>{{msg}}</h1>
  <p>myComp</p>
</span></template>

<style scoped>
  p {
    text-align: center;
  }
</style>
