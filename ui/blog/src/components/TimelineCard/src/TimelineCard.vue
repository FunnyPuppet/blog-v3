<script setup lang="ts">
import { computed } from 'vue'

defineEmits(["toDetailPage"])

const props = defineProps({
    detail: {
        type: Object,
        default: () => ({})
    }
})

const typeName = computed(() => {
    switch (props.detail.type) {
        case 1:
            return "文章"
        case 2:
            return "说说"
        default:
            return "未知"
    }
})
</script>

<template>
    <div class="c-box card-box">
        <span>{{ detail.pubTime }} 发布了{{ typeName }}</span>
        <div class="c-box-card">
            <h4 @click="$emit('toDetailPage', detail.type, detail.tId)">{{ detail.title }}</h4>
        </div>
    </div>
</template>

<style scoped lang="scss">
.c-box {
    height: 6rem;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 1rem;

    &-card {
        color: var(--font-color);
        margin-top: 1rem;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
    }

    &-card>h4:hover {
        color: var(--primary);
        cursor: pointer;
    }
}
</style>