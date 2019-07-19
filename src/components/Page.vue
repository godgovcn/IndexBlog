<template lang="pug">
  #page.screen.page
    .page-container(v-if="blog")
      .page-wrapper
        .cover(v-if="blog.img")
          .cover-image(:style="{backgroundImage:'url('+blog.img+')'}")
            .title {{blog.title}}
              .meta
                a.category(v-for="e in blog.labels", :style="{'background-color':'#'+e.color}") {{e.name}}
        .title(v-else) {{blog.title}}
          .meta
            a.category(v-for="e in blog.labels", :style="{'background-color':'#'+e.color}") {{e.name}}
        .content(v-html="blog.body")
        Comments(:config="config",:id="$route.params.id",:update="update")
        form#comment-form(methods="post",action="#",role="form",v-if="config.oauth.use")
          .send-comment
            .respond
              textarea.textarea(rows=8,name="body",placeholder="来一发？",:disabled="!login",v-model="message")
              a.send(@click="send",:class="{'dissend':!login}")
                svg(style="width:50px;height:20px",viewBox="0 0 24 24")
                  path(fill="#666666",d="M2,21L23,12L2,3V10L17,12L2,14V21Z")
          .extra(v-if="login")
            .text-info(style="background-color:#20bf20;color:white;") 登录身份 {{loginuser}} 
              a(@click="logout",style="cursor:pointer") 退登>>
          .extra(v-else)
            .text-info(style="background-color:#f0ad4e;color:white;") 请登录到 GITHUB 尊享评论功能 
              a(:href="'https://github.com/login/oauth/authorize?client_id='+ config.oauth.client_id  + '&redirect_uri=' + config.url + '#/page/' + $route.params.id ") 登录>>
        form#comment-form(methods="post",action="#",role="form",v-else)
          .extrax.extra
            .text-info(style="background-color:#aaaaaa;color:white;") 评论功能尚未开启，请到 
              a(:href="'https://github.com/'+config.author+'/'+config.reop+'/issues/'+$route.params.id") 这里评论>>
</template>

<script>
import Comments from "@/components/Comments";
export default {
  name: "Page",
  data() {
    return {
      blog: false,
      message: "",
      update: false
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
    send: function() {
      if (this.login) {
        if (this.message.length > 0) {
          var that = this;
          fetch(
            "https://api.github.com/repos/" +
              that.config.author +
              "/" +
              that.config.reop +
              "/issues/" +
              that.$route.params.id +
              "/comments?access_token=" +
              that.login,
            {
              method: "POST",
              body: JSON.stringify({
                body: that.message
              }),
              headers: new Headers({
                "Content-Type": "application/json"
              })
            }
          )
            .then(function(res) {
              return res.json();
            })
            .then(function(rawdata) {
              that.update = {
                name: rawdata.user.login,
                avatar: rawdata.user.avatar_url,
                url: rawdata.user.html_url,
                body: rawdata.body
              };
            });
        }
      }
    },
    changeList: function() {
      var that = this;
      this.lists.forEach(function(e) {
        if (e.id == that.$route.params.id) {
          that.blog = e;
          return false;
        }
      });
    },
    logout: function() {
      this.$cookies.remove("IndexBlog_Login");
      window.location.href = this.config.url + "#" + this.$route.path;
    }
  },
  components: {
    Comments: Comments
  },
  props: ["lists", "config", "login", "loginuser"]
};
</script>
<style>
</style>
