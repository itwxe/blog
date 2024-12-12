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
    children: [
      {
        text: '并发编程',
        link: '/java-notes/concurrent/01.线程基础、线程之间的共享和协作.md',
      },
      {
        text: 'JVM',
        link: '/java-notes/jvm/01.JVM组成结构.md',
      },
      {
        text: '设计模式',
        link: '/java-notes/design-pattern/01.创建型模式/01.实战工厂方法模式.md',
      },
      {
        text: 'MySQL',
        link: '/java-notes/mysql/01.深入理解MySQL索引底层数据结构.md',
      },
      {
        text: 'Redis',
        link: '/java-notes/redis/01.Redis入门.md',
      },
      {
        text: '消息中间件',
        link: '/java-notes/message-oriented-middleware/01.RabbitMQ/01.Linux单机安装RabbitMQ.md',
      },
      {
        text: 'Zookeeper',
        link: '/java-notes/zookeeper/01.ZooKeeper入门.md',
      },
      {
        text: 'Nginx',
        link: '/java-notes/nginx/01.nginx+keepalived高可用.md',
      },
    ]
  },
  {
    text: "源码笔记",
    icon: "code",
    children: [
      {
        text: 'MyBatis',
        link: '/source-code/mybatis/01.MyBatis源码概述.md',
      },
    ]
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
    children: [
      {
        text: 'HTML',
        link: '/web-notes/01.html/01.HTML基础.md',
      },
      {
        text: 'CSS',
        link: '/web-notes/02.css/01.CSS基础.md',
      },
      {
        text: 'JavaScript',
        link: '/web-notes/03.javascript/01.JS基础.md',
      },
    ]
  },
  {
    text: "部署笔记",
    icon: "setting",
    children: [
      {
        text: '软件安装',
        link: '/dev-ops/software-installation/01.Linux/01.Linux安装Nginx.md',
      },
      {
        text: '博客搭建',
        link: '/dev-ops/blog-build/01.Typora+PicGo+LskyPro打造舒适写作环境.md',
      },
      {
        text: '网站相关',
        link: '/dev-ops/website-related/01.域名更换为itwxe.com.md',
      },
      {
        text: 'Docker',
        link: '/dev-ops/docker/01.揭开Docker的面纱.md',
      },
    ]
  },
  {
    text: "其他",
    icon: "other",
    link: "/other/about/me.md",
  },
]);
