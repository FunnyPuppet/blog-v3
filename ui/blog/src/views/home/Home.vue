<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Article } from "@/components/Article"
import * as ArticleApi from "@/api/article/index"
import BaseInfo from "@/components/BaseInfo/src/BaseInfo.vue"
import DigitalClock from "@/components/DigitalClock/src/DigitalClock.vue"
import { ElLoading } from 'element-plus'

const loading = ref(true)
const hasMore = ref(true)
const queryParams = {
    cursor: 0,
    count: 5
}

const articleList = ref<ArticleApi.IArticle[]>([])

const getList = async () => {
    loading.value = true
    const eLoading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    try {
        const res = await ArticleApi.getArticleList(queryParams)
        if (res.length > 0) {
            articleList.value.push(...res)
            queryParams.cursor = getMaxId(res)

            if (res.length < queryParams.count) {
                hasMore.value = false
            }
        } else {
            hasMore.value = false
        }
    } finally {
        eLoading.close()
        loading.value = false
    }
}

const getMaxId = (arr: any): number => {
    let maxId = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > maxId) {
            maxId = arr[i].id
        }
    }
    return maxId
}

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore.value) {
        if (!loading.value) {
            getList()
        }
    }
}

let throttleTimeout;
const throttledCheckScroll = () => {
    if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
            handleScroll()
            throttleTimeout = null
        }, 200)
    }
}

onMounted(() => {
    window.addEventListener("scroll", throttledCheckScroll)
})

onUnmounted(() => {
    window.removeEventListener("scroll", throttledCheckScroll)
})

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="home-box mt-10">
        <div class="article-list">
            <Article v-for="(article, index) in articleList" :key="index" :loading="loading" :articleInfo="article"
                :index></Article>
            <el-divider v-if="!hasMore" content-position="center">已到底部了</el-divider>
        </div>
        <div class="ot-info">
            <BaseInfo></BaseInfo>
            <div class="hs">
                <DigitalClock></DigitalClock>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.home-box {
    width: 60%;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.article-list {
    flex: 2;
}

.ot-info {
    flex: 1;
}

@media screen and (max-width: 768px) {
    .home-box {
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .ot-info {
        order: -1;
        flex: 0;
        margin-bottom: -15px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .article-list {
        flex: 0;
    }

    .hs {
        display: none;
    }
}
</style>