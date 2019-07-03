<template lang="pug">
  div.menu
    div.group
      router-link#back.item.mdi.mdi-arrow-left(v-bind:to="to",:style='style') 
      div.drop-down
        span.item.mdi.mdi-format-annotation-plus
        span.item.mdi.mdi-share-variant
    div.group
      div.hidden
      a.item 关于
      a.item.mdi.mdi-menu
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      style: {
        opacity: 1
      },
      to: "/"
    };
  },
  created: function() {
    this.state(this.$route.name, this.$route.name);
  },
  watch: {
    $route(to, from) {
      this.state(to.name, from.name);
    }
  },
  methods: {
    state: function(to, from) {
      if (from == "Archive") {
        this.style.opacity = 1;
        if (this.inside.infoStyle.left > 0) {
          this.inside.infoStyle.left = 0;
          this.to = "/archive";
          return;
        }
      }
      if (to == "Index") {
        this.style.opacity = 0;
        this.to = "/";
        return;
      }
      if (to == "Archive") {
        this.style.opacity = 1;
        this.to = "/";
        return;
      }
    }
  },
  props: ["inside"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
