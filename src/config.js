import Separates from '@/components/Separates'
export default {
    author: "FireUnicornser", //连接到github的账户
    reop: "govBlog", //连接到github issues文章列表的项目名
    title: "腐坏科技", //主标题
    subTitle: "哇，又不知道想干点啥了。。。", //副标题
    url: "https://www.godgov.cn/", //网站地址
    separates: [ //独立页面
        {
            title: '友链', //在menu上显示的名字
            name: 'Friends', //路由name
            path: '/friends', //路由地址
            id: '4' //用于获取数据的issuesid
        },
        //{
        //    title: '关于', 
        //    name: 'About',
        //    path: '/about', 
        //    id: '4'
        //}
    ],
    //生成独立页面路由的方法
    separatePage() {
        var pageList = []
        this.separates.forEach(e => {
            pageList.push({
                path: e.path,
                name: e.name,
                component: Separates
            })
        });
        return pageList
    }
}