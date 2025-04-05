<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from "@/store/modules/theme"
import { MdPreview, MdCatalog } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import * as ArticleApi from "@/api/article/index"

const themeStore = storeToRefs(useThemeStore())
const route = useRoute()
const itemId = route.params.id
const scrollElement = document.documentElement

const mdState = reactive({
    id: "my-editor",
    text: "",
    title: "",
    tagList: [],
    pubTime: ""
})

// md预览主题
const previewTheme = "github"
// md代码主题
const codeTheme = "github"
// 整体主题 黑夜和白天
const theme = computed(() => { return themeStore.theme.value })

const getDetail = async (id: string) => {
    const res = await ArticleApi.getArticleDetail(id)
    mdState.text = res.content
    mdState.tagList = res.tagList
    mdState.pubTime = res.pubTime
    mdState.title = res.title
}

onMounted(() => {
    getDetail(itemId as string)
})
</script>

<template>
    <div class="detail-box">
        <div class="content-box">
            <div>
                <h1 class="fc">{{ mdState.title }}</h1>
                <div class="pt-info">
                    <span class="fc mr-r-1">发布时间: {{ mdState.pubTime }}</span>
                    <span class="fc">标签:
                        <span class="tag-box" v-for="tag in mdState.tagList">{{ tag }}</span>
                    </span>
                </div>
            </div>
            <el-divider border-style="dashed"></el-divider>
            <MdPreview class="md-preview-v3" v-model="mdState.text" :editorId="mdState.id" :preview-theme="previewTheme"
                :code-theme="codeTheme" :theme="theme"></MdPreview>
        </div>
        <div class="ch-box">
            <div class="catalog-box">
                <p class="catalog-header">目录</p>
                <hr />
                <MdCatalog v-model="mdState.text" :editorId="mdState.id" :scroll-element="scrollElement" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.detail-box {
    width: 60%;
    display: flex;
    justify-content: space-between;
}

.content-box {
    width: clamp(200px, 80%, 1000px);
    flex: 0 0 80%;
    margin-top: 1rem;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.ch-box {
    flex: 1 1 20%;
}

.catalog-box {
    width: clamp(200px, 15rem, 300px);
    min-height: 10rem;
    max-height: calc(100vh - 21rem);
    overflow: auto;
    cursor: pointer;
    margin-left: 1rem;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    margin-top: 1rem;
    padding: 1rem 0.5rem;
    position: fixed;

    &::-webkit-scrollbar {
        display: none;
    }
}

.catalog-header {
    font-size: 1.2rem;
    color: var(--font-color);
}

.md-editor {
    background-color: var(--bg-color);
}

.pt-info {
    display: flex;
}

@media screen and (max-width: 768px) {
    .detail-box {
        width: 100%;
        padding-left: 0.5rem;
    }

    .content-box {
        width: calc(100vw - 2rem);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .pt-info {
        flex-direction: column;

        & > span:nth-child(2) {
            margin-top: 0.5rem;
        }
    }

    .ch-box {
        display: none;
    }
}
</style>