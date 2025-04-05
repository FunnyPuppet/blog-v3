<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
import { useDeviceStore } from '@/store/modules/device'

const deviceStore = storeToRefs(useDeviceStore())

const size = ref(5)

const albumHeight = computed(() => {
    let mod = 2
    if (deviceStore.isMobile.value) {
        mod = 1
    }

    return size.value % (mod * 2) === 0 ? ((size.value >> mod) * 10 + 1) : (((size.value >> mod) + 1) * 10 + 1)
})

const flexAg = computed(() => {
   return deviceStore.isMobile.value || size.value >= 4 ? 'space-between' : 'start' 
})

onMounted(() => {

})
</script>

<template>
    <div class="album-box" :style="{ height: albumHeight + 'rem', justifyContent: flexAg}">
        <div v-for=" in size" class="album-card">
            <el-image src="api/image/pkmxgm" style="height: 10rem; width: 100%; border-radius: 5px;"></el-image>
            <div class="album-card__mask">
                <span class="name">测试</span>
                <span class="desc">这是测试的介绍</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.album-box {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    padding: 1rem;

    margin-top: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &>div {
        height: 10rem;
        flex: 0 0 24%;
        border-radius: 5px;
    }
}

.album-card {
    position: relative;
    width: 100%;
    height: 10rem;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    &__mask {
        display: block;
        position: absolute;
        top: 0.8rem;
        left: 1rem;
        right: 1rem;
        bottom: 40%;
        border-radius: 5px;
        padding: 5px;
        z-index: 999;
        background: rgba(0, 0, 0, 0.2);

        .name {
            display: block;
            width: 100%;
            color: var(--global-clolor);
            font-size: 1.4rem;
            font-weight: bold;
        }

        .desc {
            display: block;
            width: 100%;
            color: var(--global-clolor);
            font-size: 1rem;
            font-weight: bold;
        }
    }
}

.album-card:hover {
    filter: saturate(2) drop-shadow(0 0 5px rgba(0, 0, 0, 0.66));
    transform: translateY(-5px);
}

@media screen and (max-width: 768px) {
    .album-box {
        width: 100%;

        &>div {
            flex: 0 0 48%;
        }
    }
}
</style>