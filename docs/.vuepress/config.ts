import { defineUserConfig } from "vuepress";
import theme from "./theme";
import {searchPlugin} from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "zh-CN",
  title: "ITWXE",
  description: "Java程序猿一枚，博客主要分享自己的编程学习笔记、编程技巧、实用工具...等等，当然也会分享职场生活，人生经历。",
  base: "/",
  markdown: {
    code: {
      // 代码块禁用行号
      lineNumbers: false
    },
    linkify: false,
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
  theme,
});
