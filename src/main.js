import Vue from 'vue'
import App from './IndexBlog'
import router from './router'
import VueCookies from "vue-cookies";

Vue.use(VueCookies)
Vue.config.productionTip = false
//vue的get参数获取很诡异，手动处理
Vue.prototype.$url = function () {
  var url = decodeURIComponent(location.search);
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};
/* eslint-disable no-new */
new Vue({
  el: '#indexblog',
  router,
  render: h => h(App)
})
