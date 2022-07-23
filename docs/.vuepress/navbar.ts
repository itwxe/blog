import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: "首页", link: "/"
    },
    {
        text: "学习笔记",
        prefix: "/study-notes",
        children: [
            {
                text: "MySQL",
                link: "/mysql/01.深入理解MySQL索引底层数据结构.md"
            },
            {
                text: "Redis",
                link: "/redis/01.Redis入门.md"
            },
            {
                text: "JVM",
                link: "/jvm/01.JVM组成结构.md"
            },
            {
                text: "并发编程",
                link: "/concurrent/01.线程基础、线程之间的共享和协作.md"
            },
            {
                text: "Zookeeper",
                link: "/zookeeper/01.ZooKeeper入门.md"
            },
            {
                text: "消息中间件",
                link: "/message-oriented-middleware/rabbitmq/01.Linux单机安装RabbitMQ.md"
            },
            {
                text: "Nginx",
                link: "/nginx/01.nginx+keepalived高可用.md"
            },
            {
                text: "Docker",
                link: "/Docker/01.揭开Docker的面纱.md"
            },
            {
                text: "设计模式",
                link: "/design-pattern/01.实战工厂方法模式.md"
            },
        ],
    },
    {
        text: "源码系列",
        prefix: "/source-code",
        children: [
            {
                text: "Mybatis",
                link: "/mybatis/01.MyBatis源码概述.md"
            },
        ]
    },
    {
        text: "部署",
        children: [
            {
                text: "软件安装",
                link: "/software-installation/01.Linux(CentOS7)下Nginx安装.md"
            },
            {
                text: "网站相关",
                link: "/website-related/01.基于Linux搭建Hexo.md"
            },
        ]
    },
    {
        text: "其他",
        prefix: "/other",
        children: [
            {
                text: "Window",
                link: "/window/01.win10开启ftp服务.md"
            },
            {
                text: "关于我",
                link: "/about/me.md"
            },
        ]
    },
]);
