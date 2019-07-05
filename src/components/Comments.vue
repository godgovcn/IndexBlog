<template lang="pug">
  #comments
    .comments-head
      svg(style="width:20px;height:20px" viewBox="0 0 24 24")
        <path fill="white" d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7C5,5.89 5.9,5 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.9 12.75,23 12.5,23V23H12M13,17V20.08L16.08,17H21V7H7V17H13M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15Z" />
      | &nbsp;&nbsp;评论
    ol.comment-list(v-if="comments")
      li.comment-body.comment-parent(v-for="v in comments")
        .a-comment
          .comment-element
            .comment-container
              .comment-author-avatar
                a(:href="v.url")
                  img.avatar(:src="v.avatar" :alt="v.name" width="55" height="55")
              .comment-author-info
                .comments-meta
                  span.comment-author-name
                    a(:href="v.url" rel="external nofollow") {{v.name}}
                  a.comment-time 啥时候？
                    span.detail-time &nbsp;·&nbsp;到底啥时候？
                .comment-content
                  p {{v.body}}
          a.comment-reply
            span.mdi.mdi-reply
    center
      p 评论施工中。。。如果想要评论，请到
        a(:href="'https://github.com/'+config.author+'/'+config.reop+'/issues/'+this.$route.params.id") 这里
        |评论
</template>
<script>
export default {
  name: "Comments",
  data() {
    return {
      t:true,
      comments: false
    };
  },
  created() {
    var that = this;
    var list = []
    //评论
    fetch(
      "https://api.github.com/repos/" +
        that.config.author +
        "/" +
        that.config.reop +
        "/issues/" +
        that.$route.params.id +
        "/comments"
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(rawdata) {
        rawdata.forEach(e => {
          list.push({
            name: e.user.login,
            avatar: e.user.avatar_url,
            url: e.user.html_url,
            body: e.body
          });
        });
      });
      that.comments = list;
  },
  props: ["config"]
};
</script>
<style>
</style>

