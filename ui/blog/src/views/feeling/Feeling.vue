<script setup lang="ts">
import * as FeelingApi from '@/api/feeling/index'
import { FeelingCard } from '@/components/Feeling'
import { onMounted, ref } from 'vue';

const feelingList = ref([])

const getList = async () => {
    try {
        const res = await FeelingApi.getFeelingList()
        feelingList.value = res
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getList()  
})
</script>

<template>
    <div class="feeling-box">
        <FeelingCard v-for="info in feelingList" :feelingInfo="info"></FeelingCard>
    </div>
</template>

<style scoped lang="scss">
.feeling-box {
    width: 50%;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

@media screen and (max-width: 768px) {
    .feeling-box {
        width: 100%;
    }
}
</style>