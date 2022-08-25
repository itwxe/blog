import {defineUserConfig} from "vuepress";
import theme from "./theme";
import {searchPlugin} from "@vuepress/plugin-search";
import * as path from "path";

export default defineUserConfig({
    lang: "zh-CN",
    title: "IT技术小站",
    description: "Java程序猿一枚，博客主要分享自己的编程学习笔记、编程技巧、实用工具...等等，当然也会分享职场生活，人生经历。",
    base: "/",
    // 指定 vuepress build 的输出目录
    dest: "./dist",
    // 是否开启默认预加载 js
    shouldPrefetch: (file, type) => false,
    head: [
        // meta
        ["meta", { name: "robots", content: "all" }],
        ["meta", {name: "author", content: "IT王小二"}],
        [
            "meta",
            {
                "http-equiv": "Cache-Control",
                content: "no-cache, no-store, must-revalidate",
            },
        ],
        ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
        ["meta", { "http-equiv": "Expires", content: "0" }],
        [
            "meta",
            {
                name: "keywords",
                content:
                    "Java基础, JVM, 数据库, 并发编程, MySQL, Redis, MyBatis, Spring, SpringCloud, 系统设计, 分布式, 高可用, 高并发",
            },
        ],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}],
        // 添加百度统计
        [
            "script",
            {},
            `var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?6471cf570d32477fe3b1cc6b9b649d98";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();`,
        ],
    ],
    markdown: {
        code: {
            // 代码块禁用行号
            lineNumbers: false
        },
    },
    plugins: [
        searchPlugin({
            locales: {
                "/": {
                    placeholder: '搜索',
                },
            },
            maxSuggestions: 10,
            // 排除首页
            isSearchable: (page) => page.path !== "/",
            // 热键s打开搜索框输入搜索
            hotKeys: ["s", "/"],
            // 用于在页面的搜索索引中添加额外字段
            getExtraFields: () => [],
        }),
    ],
    // clientConfigFile: path.resolve(__dirname, './enhanceApp.ts'),
    theme,
});
