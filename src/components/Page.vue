<template lang="pug">
  #page.screen.page(style="overflow-y: scroll;")
    .page-container(v-if="blog")
      .page-wrapper
        .title {{blog.title}}
          .meta
            a.category(v-for="e in blog.labels", :style="{'background-color':'#'+e.color}") {{e.name}}
        .content(v-html="blog.body")
        Comments(:config="config")
</template>

<script>
import Comments from '@/components/Comments'
export default {
  name: "Page",
  data() {
    return {
      blog: false
    };
  },
  created() {
    if (this.lists) {
      this.changeList();
    }
  },
  watch: {
    lists: function() {
      this.changeList();
    }
  },
  methods: {
    changeList: function() {
      var that = this;
      this.lists.forEach(function(e) {
        if (e.id == that.$route.params.id) {
          that.blog = e;
          return false;
        }
      });
    }
  },
  components: {
    Comments: Comments
  },
  props: ["lists","config"]
};
</script>
<style>
</style>
