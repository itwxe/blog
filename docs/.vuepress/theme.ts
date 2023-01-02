import {hopeTheme} from "vuepress-theme-hope";
import {navbarConfig} from "./navbar";
import {sidebarConfig} from "./sidebar";

export default hopeTheme({
    // 主题基本选项开始==================================================================

    hostname: "https://itwxe.com",
    author: {
        name: "IT王小二",
        url: "https://itwxe.com",
    },

    // navbar
    navbar: navbarConfig,
    // sidebar
    sidebar: sidebarConfig,

    // 主题功能选项开始==================================================================

    // encrypt: {
    //   config: {
    //     "/guide/encrypt.html": ["1234"],
    //   },
    // },

    // 主题布局选项开始==================================================================

    // logo
    logo: "/favicon.ico",
    // 导航栏仓库地址
    repo: "itwxe/blog",
    // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
    pageInfo: ["Author", "Date", "Category", "Tag", "Original", "Word"],
    // 文章最后更新时间
    lastUpdated: true,
    // 页脚信息，可以输入HTMLString
    footer:
        "<a target=\"_blank\" rel=\"external nofollow noopener noreferrer\" href=\"https://beian.miit.gov.cn/\">" +
            "赣ICP备2021001966号-2" +
        "</a>",
    // 页脚版权信息
    copyright: "Copyright © 2019-present IT王小二",
    // 是否默认显示页脚
    displayFooter: true,
    // 项目所在分支
    docsBranch: "master",
    // 项目文档目录
    docsDir: "docs",

    // 主题外观选项开始==================================================================

    // 字体图标资源链接，支持 'iconfont' 和 'font-awesome' 关键字。
    iconAssets: "//at.alicdn.com/t/c/font_3627793_hj8693vb4t.css",
    iconPrefix: "iconfont icon-",
    // 是否开启纯净模式，启用此功能将禁用一些花哨的样式
    pure: true,

    // 插件开始========================================================================

    plugins: {
        // blog: {
        //   autoExcerpt: true,
        // },

        // 如果你不需要评论，可以直接删除 comment 配置，
        // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
        // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
        // comment: {
        //     /**
        //      * Using Giscus
        //      */
        //     // provider: "Giscus",
        //     // repo: "vuepress-theme-hope/giscus-discussions",
        //     // repoId: "R_kgDOG_Pt2A",
        //     // category: "Announcements",
        //     // categoryId: "DIC_kwDOG_Pt2M4COD69",
        //
        //     /**
        //      * Using Twikoo
        //      */
        //     // provider: "Twikoo",
        //     // envId: "https://twikoo.ccknbc.vercel.app",
        //
        //     /**
        //      * Using Waline
        //      */
        //     provider: "Waline",
        //     serverURL: "https://vuepress-theme-hope-comment.vercel.app",
        // },

        mdEnhance: {
            align: false,
            attrs: false,
            chart: false,
            codetabs: false,
            container: true,
            demo: false,
            echarts: false,
            figure: false,
            flowchart: false,
            gfm: false,
            imgLazyload: true,
            imgSize: true,
            imgMark: false,
            include: false,
            katex: false,
            mark: false,
            mermaid: false,
            // playground: {
            //     presets: ["ts", "vue"],
            // },
            presentation: {
                plugins: ["highlight", "math", "search", "notes", "zoom"],
            },
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({ tag }) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: { type: "tip" },
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: false,
            vPre: false,
            vuePlayground: false,
        },
    },
});
