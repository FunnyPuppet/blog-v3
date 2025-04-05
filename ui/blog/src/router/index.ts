import type { App } from "vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// 静态路由
const staticRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        meta: {
            name: "首页",
        },
        component: () => import("@/views/home/Home.vue"),
    },
    {
        path: "/article/:id",
        name: "ArticleDetail",
        meta: {
            name: "博客详情",
        },
        component: () => import("@/views/article/ArticleDetail.vue"),
    },
    {
        path: "/timeline",
        name: "Timeline",
        meta: {
            name: "时间轴",
        },
        component: () => import("@/views/timeline/Timeline.vue"),
    },
    {
        path: "/feeling",
        name: "Feeling",
        meta: {
            name: "心情",
        },
        component: () => import("@/views/feeling/Feeling.vue"),
    },
    {
        path: "/album",
        name: "Album",
        meta: {
            name: "相册",
        },
        component: () => import("@/views/album/Album.vue"),
    },
    {
        path: "/message",
        name: "Message",
        meta: {
            name: "留言",
        },
        component: () => import("@/views/message/Message.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: staticRoutes,
})

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}

export default router
