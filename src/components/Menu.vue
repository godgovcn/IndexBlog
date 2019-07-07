<template lang="pug">
  div.menu
    div.group
      router-link#back.item.mdi.mdi-arrow-left(:to="to",:style='style') 
      div.drop-down
        span.item.mdi.mdi-format-annotation-plus
        span.item.mdi.mdi-share-variant
    div.group
      div.hidden(:class="toggle ? 'show' : '' ")
        router-link.item(v-for="(v,i) in separates",:key="i",:to="v.path") {{v.title}}
      a.item.mdi.mdi-menu(:class="toggle ? 'rotate' : '' ",@click=" toggle = !toggle")
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      style: {
        opacity: 1,
        transform: "rotate(0deg)"
      },
      separates: this.config.separates,
      to: "/",
      toggle: false
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
    cl: function(separate) {
      this.separate = separate;
    },
    state: function(now) {
      if (now == "Index") {
        this.style.opacity = 0;
        this.to = "/";
        return;
      }
      if (now == "Archive") {
        this.style.opacity = 1;
        this.style.transform = "rotate(0deg)";
        this.to = "/";
        return;
      }
      this.style.transform = "rotate(90deg)";
      this.to = "/archive";
      return;
    }
  },
  props: ["inside", "config"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
