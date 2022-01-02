module.exports = {
    port: "8080",
    dest: "public",
    base: "/",
    // 是否开启默认预加载js
    shouldPrefetch: (file, type) => {
        return false;
    },
    // webpack 配置 https://vuepress.vuejs.org/zh/config/#chainwebpack
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const dateTime = new Date().getTime();

            // 清除js版本号
            config.output.filename('assets/js/cg-[name].js?v=' + dateTime).end();
            config.output.chunkFilename('assets/js/cg-[name].js?v=' + dateTime).end();

            // 清除css版本号
            config.plugin('mini-css-extract-plugin').use(require('mini-css-extract-plugin'), [{
                filename: 'assets/css/[name].css?v=' + dateTime,
                chunkFilename: 'assets/css/[name].css?v=' + dateTime
            }]).end();

        }
    },
    markdown: {
        lineNumbers: false,
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },
    locales: {
        "/": {
            lang: "zh-CN",
            title: "IT王小二",
            description: "万物之始, 大道至简, 衍化至繁"
        }
    },
    head: [
        // ico
        ["link", {rel: "icon", href: `/images/favicon.ico`}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "IT王小二"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "IT王小二"
        }],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
        ['script',
            {
                charset: 'utf-8',
                async: 'async',
                // src: 'https://code.jquery.com/jquery-3.5.1.min.js',
                src: '/js/jquery.min.js',
            }],
        // 友盟
        // ['script',
        //     {
        //         charset: 'utf-8',
        //         async: 'async',
        //         src: 'https://s9.cnzz.com/z_stat.php?id=1278232949&web_id=1278232949',
        //     }],
        // 添加百度统计
        ["script", {},
            `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?6471cf570d32477fe3b1cc6b9b649d98";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `
        ]
    ],
    plugins: [
        // ['@vuepress/back-to-top', true], replaced with inject page-sidebar
        ['@vuepress/medium-zoom', {
            selector: 'img:not(.nozoom)',
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }],
        // https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E9%80%89%E9%A1%B9
        // ['@vuepress/pwa', {
        //     serviceWorker: true,
        //     updatePopup: {
        //         '/': {
        //             message: "发现新内容可用",
        //             buttonText: "刷新"
        //         },
        //     }
        // }],
        // see: https://github.com/ekoeryanto/vuepress-plugin-sitemap
        ['sitemap', {
            hostname: 'https://itwxe.com',
            // 排除无实际内容的页面
            exclude: ["/404.html"],
            // 简单修复非IDE环境下 yarn build 后 vuepress-plugin-sitemap 插件 RangeError: Invalid time value 的错误，修复后IDE环境下sitemap.xml日期异常
            dateFormatter: time => {
                time = time.replace(/-/g,':').replace(' ',':').split(':')
                return time[0] + "-" + time[1] + "-" + time[2]
            },
            changefreq: 'weekly'
        }],
        // see: https://github.com/IOriens/vuepress-plugin-baidu-autopush
        ['vuepress-plugin-baidu-autopush', {}],
        ["vuepress-plugin-tags", {
            type: 'default', // 标签预定义样式
            color: '#42b983',  // 标签字体颜色
            border: '1px solid #e2faef', // 标签边框颜色
            backgroundColor: '#f0faf5', // 标签背景颜色
            selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；
        }],
        // https://github.com/lorisleiva/vuepress-plugin-seo
        ["seo", {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            // twitterCard: _ => 'summary_large_image',
            type: $page => 'article',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }]
    ],
    themeConfig: {
        // 仓库地址
        docsRepo: "itwxe/blog",
        // 编辑文档的所在目录
        docsDir: 'docs',
        // 文档放在一个特定的分支下：
        docsBranch: 'master',
        // logo: "/images/favicon.ico",
        editLinks: true,
        sidebarDepth: 0,
        smoothScroll: true,
        locales: {
            "/": {
                label: "简体中文",
                selectText: "Languages",
                editLinkText: "在 GitHub 上编辑此页",
                lastUpdated: "上次更新",
                nav: [
                    {
                        text: '快速开始', link: '/md/read-guide/guide.md'
                    },
                    {
                        text: '学习笔记',
                        items: [
                            {
                                text: 'Redis',
                                link: '/md/study-notes/redis/2020-04-30-1-Redis入门.md'
                            },
                            {
                                text: 'JVM',
                                link: '/md/study-notes/jvm/2020-05-04-JVM组成结构.md'
                            },
                            {
                                text: '并发编程',
                                link: '/md/study-notes/concurrent/2020-05-08-1-线程基础、线程之间的共享和协作.md'
                            },
                            {
                                text: 'Zookeeper',
                                link: '/md/study-notes/zookeeper/2020-05-20-ZooKeeper入门.md'
                            },
                            {
                                text: '消息中间件',
                                link: '/md/study-notes/message-oriented-middleware/rabbitmq/2020-06-08-1-Linux单机安装RabbitMQ.md'
                            },
                            {
                                text: 'Nginx',
                                link: '/md/study-notes/nginx/nginx+keepalived高可用.md'
                            },
                            {
                                text: 'Docker',
                                link: '/md/study-notes/Docker/2021-07-07-揭开Docker的面纱.md'
                            }
                        ]
                    },
                    {
                        text: '源码系列',
                        items: [
                            {
                                text: 'Mybatis',
                                link: '/md/source-code/mybatis/2020-05-14-MyBatis源码概述.md'
                            }
                        ]
                    },
                    {
                        text: '部署',
                        items: [
                            {
                                text: '软件安装',
                                link: '/md/deploy/software-installation/2021-08-15-基于Gitea搭建属于自己的Git服务.md'
                            },
                            {
                                text: '网站相关',
                                link: '/md/deploy/website-related/2019-07-06-1-基于Linux搭建Hexo.md'
                            }
                        ]
                    },
                    {
                        text: '杂记',
                        link: '/md/other/2020-03-05-win10开启ftp服务.md'
                    },
                    {
                        text: '关于',
                        items: [
                            {
                                text: '关于我',
                                link: '/md/about/me.md'
                            },
                            {
                                text: 'Github',
                                link: 'https://github.com/itwxe/blog'
                            }
                        ]
                    }
                ],
                sidebar: {
                    "/md/read-guide/": getNavReadGuide(),
                    "/md/study-notes/redis/": getNavStudyNotesRedis(),
                    "/md/study-notes/jvm/": getNavStudyNotesJVM(),
                    "/md/study-notes/concurrent/": getNavStudyNotesConcurrent(),
                    "/md/study-notes/zookeeper/": getNavStudyNotesZookeeper(),
                    "/md/study-notes/message-oriented-middleware/": getNavStudyNotesMessageOrientedMiddleware(),
                    "/md/study-notes/nginx/": getNavStudyNotesNginx(),
                    "/md/study-notes/docker/": getNavStudyNotesDocker(),
                    "/md/source-code/mybatis/": getNavSourceCodeMybatis(),
                    "/md/deploy/software-installation/": getNavDeploySoftwareInstallation(),
                    "/md/deploy/website-related/": getNavDeployWebsiteRelated(),
                    "/md/other/": getNavOther(),
                    "/md/about/": getNavAboutMe()
                }
            }
        }
    }
};

/**
 * 快速开始
 */
function getNavReadGuide() {
    return [
        {
            title: "快速开始",
            collapsable: false,
            // 左栏显示菜单的级数
            sidebarDepth: 2,
            children: [
                "guide.md"
            ]
        }
    ]
}

/**
 * Redis
 */
function getNavStudyNotesRedis() {
    return [
        {
            title: "Redis",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-04-30-1-Redis入门.md",
                "2020-04-30-2-Redis常见应用场景.md",
                "2020-05-01-Redis性能测试、jedis连接原理、弱事务.md",
                "2020-05-02-Redis高可用.md"
            ]
        }
    ]
}

/**
 * JVM
 */
function getNavStudyNotesJVM() {
    return [
        {
            title: "JVM",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-05-04-JVM组成结构.md",
                "2020-05-05-1-JVM中的对象.md",
                "2020-05-05-2-JVM垃圾回收算法和垃圾回收器.md",
                "2020-05-06-1-JVM的执行子系统.md",
                "2020-05-06-2-JVM性能优化.md"
            ]
        }
    ]
}

/**
 * 并发编程
 */
function getNavStudyNotesConcurrent() {
    return [
        {
            title: "并发编程",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-05-08-1-线程基础、线程之间的共享和协作.md",
                "2020-05-08-2-Java线程的并发工具类.md",
                "2020-05-09-Java显式锁.md",
                "2020-05-10-1-并发容器.md",
                "2020-05-10-2-并发下Map常见面试题及参考答案.md",
                "2020-05-11-Java线程池.md",
                "2020-05-12-1-并发安全和死锁.md",
                "2020-05-12-2-实现一个并发任务执行框架.md"
            ]
        }
    ]
}

/**
 * Zookeeper
 */
function getNavStudyNotesZookeeper() {
    return [
        {
            title: "Zookeeper",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-05-20-ZooKeeper入门.md",
                "2020-05-22-ZooKeeper Java客户端.md",
                "2020-05-24-ZooKeeper集群解析.md",
                "2020-05-25-ZooKeeper分布式锁的实现.md"
            ]
        }
    ]
}

/**
 * 消息中间件
 */
function getNavStudyNotesMessageOrientedMiddleware() {
    return [
        {
            title: "RabbitMQ",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "rabbitmq/2020-06-08-1-Linux单机安装RabbitMQ.md",
                "rabbitmq/2020-06-08-2-RabbitMQ入门.md"
            ]
        },
        // {
        //     title: "RocketMQ",
        //     collapsable: false,
        //     sidebarDepth: 0,
        //     children: [
        //
        //     ]
        // }
    ]
}

/**
 * Nginx
 */
function getNavStudyNotesNginx() {
    return [
        {
            title: "Nginx",
            collapsable: false,
            sidebarDepth: 3,
            children: [
                "nginx+keepalived高可用.md"
            ]
        }
    ]
}

/**
 * Docker
 */
function getNavStudyNotesDocker() {
    return [
        {
            title: "Docker",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2021-07-07-揭开Docker的面纱.md",
                "2021-07-09-CentOS7安装Docker初体验.md",
                "2021-07-12-Docker基本操作.md",
                "2021-07-14-DockerFile构建镜像.md",
                "2021-07-16-Docker使用maven插件打包SpringBoot项目.md",
                "2021-07-19-Docker搭建MySQL并挂载数据.md",
                "2021-07-21-Docker搭建Redis5.0并挂载数据.md",
                "2021-07-26-Docker编排利器DockerCompose.md"
            ]
        }
    ]
}

/**
 * Mybatis源码
 */
function getNavSourceCodeMybatis() {
    return [
        {
            title: "Mybatis",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-05-14-MyBatis源码概述.md",
                "2020-05-15-1-MyBatis日志模块分析.md",
                "2020-05-15-2-MyBatis数据源模块分析.md",
                "2020-05-16-1-MyBatis缓存模块分析.md",
                "2020-05-16-2-MyBatis反射模块分析.md",
                "2020-05-16-3-MyBatis流程概述.md",
                "2020-05-17-1-MyBatis流程（第一阶段）.md",
                "2020-05-17-2-MyBatis流程（第二阶段）.md",
                "2020-05-18-MyBatis流程（第三阶段）.md",
                "2020-05-19-Mybatis Spring集成原理分析.md"
            ]
        }
    ]
}

/**
 * 软件安装
 */
function getNavDeploySoftwareInstallation() {
    return [
        {
            title: "软件安装",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2021-08-15-基于Gitea搭建属于自己的Git服务.md",
                "2019-07-25-Linux(CentOS7)下Nginx安装.md",
                "2019-08-02-Linux(CentOS7)下安装jdk1.8.md",
                "2019-08-02-Linux(CentOS7)下配置多个tomcat.md",
                "2019-09-07-Linux(CentOS7)下rpm安装MySQL8.0.16.md",
                "2019-11-02-Linux(CentOS7)安装MinIO.md",
                "2019-11-02-Linux(CentOS7)安装Redis5.0.md",
                "2019-11-11-Linux(CentOS7)下二进制安装MySQL5.7.26.md"
            ]
        }
    ]
}

/**
 * 网站相关
 */
function getNavDeployWebsiteRelated() {
    return [
        {
            title: "Hexo博客",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2019-07-06-1-基于Linux搭建Hexo.md",
                "2019-07-06-2-Hexo通用问题集锦.md"
            ]
        },
        {
            title: "域名设置",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2021-04-22-使用Let's Encrypt实现网站https化.md",
                "2021-08-19-Let's Encrypt泛域名使用和Nginx配置拆分.md"
            ]
        },
        {
            title: "写作工具",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2021-08-12-Typora+PicGo+LskyPro打造舒适写作环境.md"
            ]
        },
        {
            title: "网站建设",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2021-05-27-域名更换为itwxe.com.md",
                "2021-11-22-一文明白CDN加速是个啥.md"
            ]
        },
    ]
}

/**
 * 杂记
 */
function getNavOther() {
    return [
        {
            title: "杂记",
            collapsable: false,
            sidebarDepth: 0,
            children: [
                "2020-03-05-win10开启ftp服务.md",
                "2020-10-28-SSH客户端真香组合之PuTTY和WinSCP.md"
            ]
        }
    ]
}

/**
 * 关于
 */
function getNavAboutMe() {
    return [
        {
            title: "",
            collapsable: false,
            sidebarDepth: 2,
            children: [
                "/md/about/me.md"
            ]
        }
    ]
}