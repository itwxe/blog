import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
  "/java-notes/concurrent/": [
    {
      text: "并发编程",
      icon: "concurrent",
      collapsible: true,
      children: "structure",
    },
  ],

  "/java-notes/jvm/": [
    {
      text: "JVM",
      icon: "java",
      collapsible: true,
      children: "structure",
    },
  ],
  "/java-notes/design-pattern/": [
    {
      text: "设计模式",
      icon: "design-pattern",
      collapsible: true,
      children: [
        {
          text: "创建型模式",
          icon: "design-pattern",
          collapsible: true,
          prefix: "01.创建型模式",
          children: "structure",
        },
        {
          text: "结构性模式",
          icon: "design-pattern",
          collapsible: true,
          prefix: "02.结构性模式",
          children: "structure",
        },
        {
          text: "行为型模式",
          icon: "design-pattern",
          collapsible: true,
          prefix: "03.行为型模式",
          children: "structure",
        }
      ]
    },
  ],
  "/java-notes/mysql/": [
    {
      text: "MySQL",
      icon: "mysql",
      collapsible: true,
      children: "structure",
    },
  ],
  "/java-notes/redis/": [
    {
      text: "Redis",
      icon: "redis",
      collapsible: true,
      children: "structure",
    },
  ],
  "/java-notes/message-oriented-middleware/": [
    {
      text: "消息中间件",
      icon: "message-oriented-middleware",
      collapsible: true,
      children: [
        {
          text: "RabbitMQ",
          icon: "rabbitmq",
          prefix: "01.RabbitMQ",
          collapsible: true,
          children: "structure",
        },
      ]
    },
  ],
  "/java-notes/zookeeper/": [
    {
      text: "Zookeeper",
      icon: "zookeeper",
      collapsible: true,
      children: "structure",
    },
  ],
  "/java-notes/nginx/": [

    {
      text: "Nginx",
      icon: "nginx",
      collapsible: true,
      children: "structure",
    },
  ],
  "/source-code/mybatis/": [
    {
      text: "Mybatis",
      icon: "mybatis",
      collapsible: true,
      children: "structure",
    },
  ],
  // "/python-notes/python-base/": [
  //     {
  //         text: "Python筑基篇",
  //         icon: "base",
  //         collapsible: true,
  //         children: "structure",
  //     },
  // ],
  "/web-notes/01.html/": [
    {
      text: "HTML",
      icon: "HTML",
      collapsible: true,
      children: "structure",
    },
  ],
  "/web-notes/02.css/": [
    {
      text: "CSS",
      icon: "CSS",
      collapsible: true,
      children: "structure",
    },
  ],
  "/web-notes/03.javascript/": [
    {
      text: "JavaScript",
      icon: "JS",
      collapsible: true,
      children: "structure",
    },
  ],
  "/dev-ops/software-installation/": [
    {
      text: "软件安装",
      icon: "software-installation",
      collapsible: true,
      children: [
        {
          text: "Linux",
          icon: "linux",
          prefix: "01.Linux",
          collapsible: true,
          children: "structure",
        },
        {
          text: "Window",
          icon: "window",
          prefix: "02.WIndow",
          collapsible: true,
          children: "structure",
        },
      ]
    },
  ],
  "/dev-ops/blog-build/": [
    {
      text: "博客搭建",
      icon: "blog-build",
      collapsible: true,
      children: "structure",
    },
  ],
  "/dev-ops/website-related/": [
    {
      text: "网站相关",
      icon: "website-related",
      collapsible: true,
      children: "structure",
    },
  ],
  "/dev-ops/docker/": [
    {
      text: "Docker",
      icon: "docker",
      collapsible: true,
      children: "structure",
    },
  ],
  "/other": [
    {
      text: "关于我",
      prefix: "about",
      children: "structure",
    },
  ],
})
