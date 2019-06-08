<template lang="pug">
  main
    Headers
    Footers
</template>

<script>
import Headers from "./Headers";
import Footers from "./Footers";
export default {
  name: "Index",
  components: {
    Headers: Headers,
    Footers: Footers
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
