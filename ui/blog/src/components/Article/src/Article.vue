<script setup lang="ts">
import { ref, computed } from "vue"
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { useDeviceStore } from "@/store/modules/device"

const router = useRouter()

const deviceStore = useDeviceStore()
const isMobile = storeToRefs(deviceStore).isMobile

const props = defineProps({
    loading: Boolean,
    index: {
        type: Number,
        default: 0
    },
    articleInfo: {
        type: Object,
        default: () => { return {} }
    },
})

const fit = ref("cover")

const imageFlex = computed(() => { return isMobile.value ? "0 0 50%" : "0 0 40%" })
const contentFlex = computed(() => { return isMobile.value ? "0 0 50%" : "0 0 60%" })

const pcImage = computed(() => { 
    if (props.index % 2 == 0) {
        return {"border-radius": "5px 0 0 5px", "max-width": "100%", "height": "12rem", "margin-right": "1rem"}
    }

    return {"border-radius": "0 5px 5px 0", "max-width": "100%", "height": "12rem", "margin-left": "1rem"}
 })

const articleBoxDirection = computed(() => {
    if (isMobile.value) { 
        return "column"
    }
    return props.index % 2 == 0 ? "row" : "row-reverse"
})

const toArticleDetail = () => {
    router.push(`/article/${props.articleInfo.id}`);
}
</script>

<template>
    <div class="article-card">
        <el-skeleton v-if="loading" :loading="loading" animated :rows="4">
        </el-skeleton>
        <div v-else class="article-box" :style="{flexDirection: articleBoxDirection}">
            <div :style="{ flex: imageFlex }">
                <el-image v-if="!isMobile"
                    :style="pcImage" :src="articleInfo.imageUrl"
                    :fit="fit" lazy />
                <el-image v-else style="border-radius: 5px 5px 0 0; width: 100%; height: 10rem;" :src="articleInfo.imageUrl"
                    :fit="fit" lazy />
            </div>
            <div :style="{ flex: contentFlex }" class="article-content-box">
                <span class="fc article-title mt-10" :class="{'ml-10': isMobile || index % 2 == 1}" @click="toArticleDetail" style="font-weight: bold; font-size: 1.3rem;">{{ articleInfo.title }}</span>
                <span class="fc article-introduction" :class="{'ml-10': isMobile || index % 2 == 1}" :title="articleInfo.introduction">{{ articleInfo.introduction }}</span>
                <span class="fc" :class="{'ml-10': isMobile || index % 2 == 1}">标签: 
                    <span class="tag-box" v-for="tag in articleInfo.tagList">{{ tag }}</span>
                </span>
                <span class="fc mb-10" :class="{'ml-10': isMobile || index % 2 == 1}">发布时间: {{ articleInfo.pubTime }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-card {
    height: 12rem;
    background-color: var(--bg-color);
    border-radius: 5px;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
}

.article-skeleton {
    display: flex;
    justify-content: flex-start;
}

.as-title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.article-box {
    display: flex;
    justify-content: flex-start;
}

.article-content-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.article-title:hover {
    color: var(--primary);
    cursor: pointer;
}

.article-introduction {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  cursor: pointer;
}

.article-card:hover {
  animation: shakeX 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
    .article-card {
        height: 20rem;
    }

    .article-skeleton {
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
    }

    .article-box {
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
}

@keyframes shakeX {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}
</style>