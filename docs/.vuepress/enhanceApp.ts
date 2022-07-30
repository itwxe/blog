import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
    enhance({ router }) {
        router.beforeEach((to, from, next) => {
            // console.log("切换路由", to.fullPath, from.fullPath);
            // @ts-ignore
            const _hmt = window._hmt;
            // 触发百度的pv统计
            if (typeof _hmt != "undefined") {
                // 链接中存在#时为锚点链接，不触发pv
                if (to.path && !to.fullPath.includes("#")) {
                    _hmt.push(["_trackPageview", to.fullPath]);
                    // console.log("上报百度统计", to.fullPath);
                }
            }
            next();
        })
    },
})