<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import * as TimelineApi from "@/api/timeline/index"
import { TimelineCard } from "@/components/TimelineCard/index"

const loading = ref(true)
const router = useRouter()
const timelineList = ref<TimelineApi.Timeline[]>([])

const getList = async () => {
    loading.value = true
    try {
        const res = await TimelineApi.getTimelineList()
        timelineList.value = res
    } finally {
        loading.value = false
    }
}

const toDetailPage = (type: number | undefined, id: number | undefined) => {
    if (type === 1) {
        router.push(`/article/${id}`)
    } else if (type === 2) {
        alert("功能开发中...")
    }
}

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="timeline-box">
        <el-skeleton v-if="loading" :loading="loading" animated :rows="4"></el-skeleton>
        <el-timeline v-else>
            <el-timeline-item v-for="item in timelineList" :timestamp="item.pubDate" placement="top">
                <TimelineCard v-for="detail in item.timelineList" :detail="detail" @toDetailPage="toDetailPage"></TimelineCard>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<style lang="scss" scoped>
.timeline-box {
    width: 50%;
    margin-top: 2rem;
    padding: 1rem;
}

@media screen and (max-width: 768px) {
    .timeline-box {
        width: 100%;
        padding: 0.5rem;
    }
    ul.el-timeline {
        margin-left: -2rem;
    }
}
</style>