<script setup lang="ts">
import { ref, computed } from 'vue'
import { getWeatherName } from '@/constants/weather'

const props = defineProps({
    feelingInfo: {
        type: Object,
        default: () => { return {} }
    }
})
const titleName = ref(getWeatherName(props.feelingInfo.icon))
const hasImgae = computed(() => {
    return props.feelingInfo.images?.length > 0
})
</script>

<template>
    <div class="feeling-card">
        <div class="left-box">
            <el-avatar shape="square" src="src/assets/images/avatar.jpg" />
        </div>
        <div class="right-box">
            <span style="font-weight: bold; margin-bottom: 1rem;">{{ feelingInfo.userName }}</span>
            <span style="word-break: break-word; margin-bottom: 0.5rem;">{{ feelingInfo.content }}</span>
            <div class="image-box" v-if="hasImgae">
                <el-image v-for="imgUrl in feelingInfo.images" class="f-image" :src="imgUrl" :preview-src-list="feelingInfo.images"></el-image>
            </div>
            <div class="f-bottom">
                <span>{{ feelingInfo.timeAgo }}天前</span>
                <span class="iconfont" :class="feelingInfo.icon" style="cursor: pointer;" :title="titleName"></span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.feeling-card {
    display: flex;
    width: 100%;
    min-height: 8rem;
    background-color: var(--bg-color);
    color: var(--font-color);
    border-bottom: 1px solid var(--border-color);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.left-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 1rem;
}

.right-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
}

.image-box {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}

.f-image {
    flex: 0 0 30%;
}

.f-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
}

@media screen and (max-width: 768px) {
    .feeling-card {
        padding-right: 0;
    }

    .image-box {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
    }

    .f-image {
        flex: 0 0 40%;
    }
}
</style>