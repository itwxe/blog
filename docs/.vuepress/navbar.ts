import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: "首页", link: "/"
    },
    {
        text: "Java笔记",
        prefix: "/java-notes",
        children: [
            {
                text: "并发编程",
                link: "/concurrent/01.线程基础、线程之间的共享和协作.md"
            },
            {
                text: "JVM",
                link: "/jvm/01.JVM组成结构.md"
            },
            {
                text: "设计模式",
                link: "/design-pattern/01.实战工厂方法模式.md"
            },
            {
                text: "MySQL",
                link: "/mysql/01.深入理解MySQL索引底层数据结构.md"
            },
            {
                text: "Redis",
                link: "/redis/01.Redis入门.md"
            },
            {
                text: "消息中间件",
                link: "/message-oriented-middleware/rabbitmq/01.Linux单机安装RabbitMQ.md"
            },
            {
                text: "Zookeeper",
                link: "/zookeeper/01.ZooKeeper入门.md"
            },
            {
                text: "Nginx",
                link: "/nginx/01.nginx+keepalived高可用.md"
            },
        ],
    },
    {
        text: "源码笔记",
        prefix: "/source-code",
        children: [
            {
                text: "Mybatis",
                link: "/mybatis/01.MyBatis源码概述.md"
            },
        ]
    },
    {
        text: "dev-ops",
        children: [
            {
                text: "软件安装",
                link: "/dev-ops/software-installation/linux/01.Linux(CentOS7)下Nginx安装.md"
            },
            {
                text: "网站相关",
                link: "/dev-ops/website-related/01.基于Linux搭建Hexo.md"
            },
            {
                text: "Docker",
                link: "/dev-ops/docker/01.揭开Docker的面纱.md"
            },
        ]
    },
    {
        text: "其他",
        prefix: "/other",
        children: [
            {
                text: "关于我",
                link: "/about/me.md"
            },
        ]
    },
]);
