import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
    "/java-notes": [
        {
            text: "并发编程",
            icon: "concurrent",
            prefix: "concurrent",
            collapsible: true,
            children: [
                "01.线程基础、线程之间的共享和协作.md",
                "02.Java线程的并发工具类.md",
                "03.Java显式锁.md",
                "04.并发容器.md",
                "05.并发下Map常见面试题及参考答案.md",
                "06.Java线程池.md",
                "07.并发安全和死锁.md",
                "08.实现一个并发任务执行框架.md",
            ]
        },
        {
            text: "JVM",
            icon: "java",
            prefix: "jvm",
            collapsible: true,
            children: [
                "01.JVM组成结构.md",
                "02.JVM中的对象.md",
                "03.JVM垃圾回收算法和垃圾回收器.md",
                "04.JVM的执行子系统.md",
                "05.JVM性能优化.md",
            ]
        },
        {
            text: "设计模式",
            icon: "design-pattern",
            prefix: "design-pattern",
            collapsible: true,
            children: [
                {
                    text: "创建型模式",
                    collapsible: true,
                    children: [
                        "01.实战工厂方法模式.md",
                        "02.实战抽象工厂模式.md",
                        "03.实战建造者模式.md",
                        "04.实战原型模式.md",
                        "05.实战单例模式.md",
                    ]
                },
                {
                    text: "结构型模式",
                    collapsible: true,
                    children: [
                        "06.实战适配器模式.md",
                        "07.实战桥接模式.md",
                        "08.实战组合模式.md",
                        "09.实战装饰器模式.md",
                        "10.实战外观模式.md",
                        "11.实战享元模式.md",
                        "12.实战代理模式.md",
                    ]
                },
                {
                    text: "行为型模式",
                    collapsible: true,
                    children: [
                        "13.实战责任链模式.md",
                        "14.实战命令模式.md",
                        "15.实战迭代器模式.md",
                        "16.实战中介者模式.md",
                        "17.实战备忘录模式.md",
                        "18.实战观察者模式.md",
                        "19.实战状态模式.md",
                        "20.实战策略模式.md",
                        "21.实战模板模式.md",
                        "23.实战访问者模式.md",
                    ]
                },
            ]
        },
        {
            text: "MySQL",
            icon: "mysql",
            prefix: "mysql",
            collapsible: true,
            children: [
                "01.深入理解MySQL索引底层数据结构.md",
                "02.MySQL体系结构概览.md",
                "03.Explain执行计划详解.md",
                "04.MySQL再深入执行计划之trace工具.md",
                "05.SQL性能优化技巧.md",
                "06.MySQL性能优化之索引设计.md",
                "07.MySQL事务和锁.md",
            ]
        },
        {
            text: "Redis",
            icon: "redis",
            prefix: "redis",
            collapsible: true,
            children: [
                "01.Redis入门.md",
                "02.Redis常见应用场景.md",
                "03.Redis性能测试、jedis连接原理、弱事务.md",
                "04.Redis高可用.md",
            ]
        },
        {
            text: "消息中间件",
            icon: "message-oriented-middleware",
            prefix: "message-oriented-middleware",
            collapsible: true,
            children: [
                {
                    text: "RabbitMQ",
                    icon: "rabbitmq",
                    prefix: "rabbitmq",
                    collapsible: true,
                    children: [
                        "01.Linux单机安装RabbitMQ.md",
                        "02.RabbitMQ入门.md",
                    ]
                },
            ]
        },
        {
            text: "Zookeeper",
            icon: "zookeeper",
            prefix: "zookeeper",
            collapsible: true,
            children: [
                "01.ZooKeeper入门.md",
                "02.ZooKeeper Java客户端.md",
                "03.ZooKeeper集群解析.md",
                "04.ZooKeeper分布式锁的实现.md",
            ]
        },
        {
            text: "Nginx",
            icon: "nginx",
            prefix: "nginx",
            collapsible: true,
            children: [
                "01.nginx+keepalived高可用.md",
            ]
        },
    ],
    "/source-code": [
        {
            text: "Mybatis",
            icon: "mybatis",
            prefix: "mybatis",
            collapsible: true,
            children: [
                "01.MyBatis源码概述.md",
                "02.MyBatis日志模块分析.md",
                "03.MyBatis数据源模块分析.md",
                "04.MyBatis缓存模块分析.md",
                "05.MyBatis反射模块分析.md",
                "06.MyBatis流程概述.md",
                "07.MyBatis流程（第一阶段）.md",
                "08.MyBatis流程（第二阶段）.md",
                "09.MyBatis流程（第三阶段）.md",
                "10.Mybatis Spring集成原理分析.md",
            ]
        },
    ],
    "/python-notes": [
        {
            text: "Python筑基篇",
            icon: "base",
            prefix: "python-base",
            collapsible: true,
            children: [
                "01.Python开发环境搭建.md",
                "02.变量及变量类型.md",
                "03.控制流程.md",
            ]
        },
    ],
    "/dev-ops": [
        {
            text: "软件安装",
            icon: "software-installation",
            prefix: "software-installation",
            collapsible: true,
            children: [
                {
                    text: "Linux",
                    icon: "linux",
                    prefix: "linux",
                    collapsible: true,
                    children: [
                        "01.Linux安装Nginx.md",
                        "02.Linux安装jdk1.8.md",
                        "03.Linux配置多个tomcat.md",
                        "04.Linux二进制安装MySQL5.7.26.md",
                        "05.Linux安装MinIO.md",
                        "06.Linux安装Redis5.0.md",
                        "07.基于Gitea搭建属于自己的Git服务.md",
                    ]
                },
                {
                    text: "Window",
                    icon: "window",
                    prefix: "window",
                    collapsible: true,
                    children: [
                        "01.win10开启ftp服务.md",
                        "02.SSH客户端真香组合之PuTTY和WinSCP.md",
                    ]
                },
            ]
        },
        {
            text: "博客搭建",
            icon: "blog-build",
            prefix: "blog-build",
            collapsible: true,
            children: [
                {
                    text: "写作工具",
                    icon: "util",
                    prefix: "util",
                    collapsible: true,
                    children: [
                        "01.Typora+PicGo+LskyPro打造舒适写作环境.md",
                        "02.Docker安装LskyPro2.0升级过程.md",
                        "03.Typora+MinIO+Java代码打造舒适写作环境.md",
                        "04.Typora+MinIO+Python代码打造舒适协作环境.md",
                    ]
                },
            ]
        },
        {
            text: "网站相关",
            icon: "website-related",
            prefix: "website-related",
            collapsible: true,
            children: [
                "01.域名更换为itwxe.com.md",
                "02.使用Let's Encrypt实现网站https化.md",
                "03.Let's Encrypt泛域名使用和Nginx配置拆分.md",
                "04.一文明白CDN加速是个啥.md",
            ]
        },
        {
            text: "Docker",
            icon: "docker",
            prefix: "docker",
            collapsible: true,
            children: [
                "01.揭开Docker的面纱.md",
                "02.CentOS7安装Docker初体验.md",
                "03.Docker基本操作.md",
                "04.DockerFile构建镜像.md",
                "05.Docker使用maven插件打包SpringBoot项目.md",
                "06.Docker搭建MySQL并挂载数据.md",
                "07.Docker搭建Redis5.0并挂载数据.md",
                "08.Docker编排利器DockerCompose.md",
            ]
        },
    ],
    "/other": [
        {
            text: "关于我",
            prefix: "about",
            children: [
                "me.md",
            ]
        },
    ],
})
