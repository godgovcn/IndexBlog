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
        opacity: 1,
        transform: 'rotate(0deg)'
      },
      to: "/"
    };
  },
  created: function() {
    this.state(this.$route.name);
  },
  watch: {
    $route(to, from) {
      this.state(to.name);
    }
  },
  methods: {
    state: function(now) {
      if (now == "Index") {
        this.style.opacity = 0;
        this.to = "/";
        return;
      }
      if (now == "Archive") {
        this.style.opacity = 1;
        this.style.transform = 'rotate(0deg)';
        this.to = "/";
        return;
      }
      if (now == "Page") {
        this.style.transform = 'rotate(90deg)';
        this.to = "/Archive";
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
