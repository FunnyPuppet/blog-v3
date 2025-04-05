<script setup lang="ts">
import { ref } from "vue"
import { MessageCard } from "@/components/MessageCard/index"

const msgCardRef = ref<InstanceType<typeof MessageCard>>()
</script>

<template>
    <div class="message-box">
        <el-divider></el-divider>
        <MessageCard @submit="(data: Object) => {console.log(data); msgCardRef?.reset()}" ref="msgCardRef"></MessageCard>
        <el-divider content-position="left">留言</el-divider>
        <span style="color: var(--font-color);">留言内容展示, 开发中</span>
    </div>
</template>
<style lang="scss" scoped>
.message-box {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.5rem 0 0.5rem;
}

@media screen and (max-width: 768px) {
    .message-box {
        width: 100%;
   }
}
</style>