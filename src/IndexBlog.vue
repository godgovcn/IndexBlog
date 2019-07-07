<template lang="pug">
  #IndexBlog
    .bg(:style="{backgroundImage:'url('+bg+')'}")
    Menu(:inside="inside",:config="config")
    transition(:name="inside.move")
      router-view(:lists="lists", :info="info", :config="config", :inside="inside")
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";

import Menu from "@/components/Menu";

import Config from "@/config.js";

import "@/assets/css/Candy-Rebirth.less";
import "@/assets/css/materialdesignicons.min.css";

import { TweenLite } from "gsap";
//配置markdown
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
  name: "IndexBlog",
  data: function() {
    var datas = {
      lists: false, //文章列表
      bg: "https://i.loli.net/2018/04/15/5ad2ca39da9bb.jpg", //背景地址
      info: {
        articleCount: 0,
        categoryCount: 0,
        commentCount: 0,
        avatar: false //头像地址
      },
      inside: {
        move: "",
        infoStyle: {
          opacity: 0,
          left: 0
        }
      }
    };
    datas.config = Config;
    return datas;
  },
  components: {
    Menu: Menu
  },
  created: function() {
    var that = this;
    //获取个人信息
    fetch("https://api.github.com/users/" + that.config.author)
      .then(function(res) {
        return res.json();
      })
      .then(function(rawdata) {
        that.info.avatar = rawdata.avatar_url;
      });
    //获取文章
    fetch(
      "https://api.github.com/repos/" +
        that.config.author +
        "/" +
        that.config.reop +
        "/issues?creator=" +
        that.config.author
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(rawdata) {
        var data = [];
        var comments = 0;
        rawdata.forEach(function(val, i) {
          data.push({
            img: false,
            title: val.title,
            id: val.number,
            labels: [],
            body: marked(val.body),
            content: that.content(marked(val.body)),
            author: val.user.login
          });
          //追加评论数量
          comments += val.comments;
          //添加标签
          val.labels.forEach(e => {
            data[i].labels.push({
              name: e.name,
              color: e.color
            });
          });
          //判断图片
          var div = document.createElement("div");
          div.innerHTML = data[i].body;
          var img = div.querySelector("img");
          if (img) {
            data[i].img = img.src;
            //判断图片是否需要隐藏
            if (img.alt == "hide") {
              div.querySelector("img").parentNode.removeChild(img);
              data[i].body = div.innerHTML;
            }
          }
        });
        that.lists = data;
        TweenLite.to(that.info, 1, {
          articleCount: rawdata.length,
          roundProps: ["articleCount"]
        });
        TweenLite.to(that.info, 1, {
          commentCount: comments,
          roundProps: ["commentCount"]
        });
      });
    //获取分类数量
    fetch(
      "https://api.github.com/repos/" +
        that.config.author +
        "/" +
        that.config.reop +
        "/labels"
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(rawdata) {
        TweenLite.to(that.info, 1, {
          categoryCount: rawdata.length,
          roundProps: ["categoryCount"]
        });
      });
  },
  methods: {
    content: function(e) {
      var div = document.createElement("div");
      div.innerHTML = e;
      return div.innerText;
    }
  },
  watch: {
    $route(to, from) {
      if (from.name == "Index") {
        this.inside.move = "move-right";
        return;
      }
      if (from.name == "Archive") {
        if (to.name == "Index") {
          this.inside.move = "move-left";
          return;
        }
        this.inside.move = "move-down";
        return;
      }
      this.inside.move = "move-up";
      return;
    }
  }
};
</script>

<style>
</style>
