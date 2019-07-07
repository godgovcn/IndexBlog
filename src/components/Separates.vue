<template lang="pug">
  #page.screen.page
    .page-container(v-if="blog")
      .page-wrapper
        .title {{blog.title}}
          .meta 独立页面
        .content(v-html="blog.body")
        Comments(:config="config",:id="id")
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import Comments from "@/components/Comments";
let renderer = new marked.Renderer();
renderer.code = function(code, language) {
  return (
    '<pre><code class="hljs ' +
    language +
    '">' +
    hljs.highlightAuto(code).value +
    "</code></pre>"
  );
};
marked.setOptions({
  renderer: renderer
});
export default {
  name: "Separates",
  data() {
    return {
      id: false,
      blog: false
    };
  },
  created() {
    var that = this;
    this.config.separates.forEach(e => {
      if ((e.name = this.$route.name)) {
        that.id = e.id;
      }
    });
    fetch(
      "https://api.github.com/repos/" +
        that.config.author +
        "/" +
        that.config.reop +
        "/issues/" +
        that.id
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(rawdata) {
        var blog = {};
        that.blog = {
          title: rawdata.title,
          body: marked(rawdata.body)
        };
      });
  },
  components: {
    Comments: Comments
  },
  props: ["config"]
};
</script>

<style>
</style>
