import {navbar} from "vuepress-theme-hope";

export const navbarConfig = navbar([
    {
        text: "首页",
        icon: "home",
        link: "/",
    },
    {
        text: "Java笔记",
        icon: "java",
        link: "/java-notes/concurrent/01.线程基础、线程之间的共享和协作.md",
    },
    {
        text: "源码笔记",
        icon: "code",
        link: "/source-code/mybatis/01.MyBatis源码概述.md",
    },
    // {
    //     text: "Python笔记",
    //     icon: "python",
    //     link: "/python-notes/python-base/01.Python开发环境搭建.md",
    // },
    {
        text: "前端笔记",
        icon: "web",
        link: "/web-notes/01-html/01.HTML基础.md",
    },
    {
        text: "部署笔记",
        icon: "setting",
        link: "/dev-ops/software-installation/linux/01.Linux安装Nginx.md",
    },
    {
        text: "其他",
        icon: "other",
        link: "/other/about/me.md",
    },
]);
