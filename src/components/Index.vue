<template lang="pug">
  #index.screen.index
    div(style="margin:40vh auto;text-align:center;")
      h1(style="font-size:2.3rem") {{config.title}}
      span(style="color:#696969;font-size:0.9rem") {{config.subTitle}}
      h3
      br
      router-link.btn(to="/archive") Explore Me
</template>

<script>
export default {
  name: "Index",
  props:['config']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
