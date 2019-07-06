<template lang="pug">
  #archive.screen.archive
    #bar.archive-container
      .author-info.right-in-animation(:style='infoStyle')
        img.avatar(:src="info.avatar" width="100" height="100")
        .name {{config.title}}
        .desc {{config.subTitle}}
        .stat
          .article-count {{info.articleCount}}
          .category-count {{info.categoryCount}}
          .comment-count {{info.commentCount}}
        .social
        .copyright © {{config.title}} - {{date.getFullYear()}}
          .theme-info
            a(href="https://github.com/Archeb/Candy-Rebirth") Theme
            |
            | By
            |
            a(href="https://qwq.moe/") Archeb
            |
            | TBy
            |
            a(href="https://godgov.cn/") FireUnicornser
      .article-list(v-if="lists")
        .article.right-in-animation(v-for="v in lists",:style="v.style")
          .title
            router-link(:to="'/page/'+v.id") {{v.title}}
            .meta
              a.category(v-for="e in v.labels", :style="{'background-color':'#'+e.color}") {{e.name}}
          .content(v-on:click="goPage(v.id)")
            p(style='white-space: pre-line') {{v.content}}
</template>

<script>
import {TweenLite} from "gsap"
export default {
  name: "Archive",
  data() {
    return {
      date: new Date(),
      infoStyle: {
        opacity: 1
      }
    };
  },
  mounted: function() {
    document
      .getElementById("archive")
      .addEventListener("scroll", this.handleScroll, true);
    document
      .getElementById("archive")
      .addEventListener("wheel", this.pageWheel, true);
  },
  methods: {
    //监听滚动控制透明度和滚动状态
    handleScroll: function(e) {
      this.inside.infoStyle.left = document.getElementById("bar").scrollLeft;
    },
    //文章列表文字点击事件
    goPage: function(id) {
      this.$router.push({ path: "/page/" + id });
    },
    //监听鼠标滚轮滚动
    pageWheel: function(e) {
      if (e.deltaX == -0) {
        //-0和0到底是个啥玩意？？？真他吗神奇的js
        document.getElementById("bar").scrollBy(e.deltaY,0);
      }
    }
  },
  computed: {
    leftChannel() {
      return this.inside.infoStyle.left;
    }
  },
  watch: {
    lists: function() {
      this.handleScroll();
    },
    leftChannel: function(n, o) {
      this.infoStyle.opacity = (300 - n) / 300;
    }
  },
  props: ["lists", "info", "config", "inside"]
};
</script>
