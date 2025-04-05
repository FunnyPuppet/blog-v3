<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 创建响应式时间对象
const state = ref({
    time: {
        hours: '00',
        minutes: '00',
        seconds: '00'
    },
    formattedDate: ''
})

// 补零函数
const padZero = (num) => num.toString().padStart(2, '0')

// 更新时间函数
const updateTime = () => {
    const now = new Date()

    // 更新时间
    state.value.time = {
        hours: padZero(now.getHours()),
        minutes: padZero(now.getMinutes()),
        seconds: padZero(now.getSeconds())
    }

    // 更新日期
    state.value.formattedDate = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    })
}

// 生命周期钩子
let timer = null
onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div class="digital-clock">
        <div class="date">{{ state.formattedDate }}</div>
        <div class="time">
            <span>{{ state.time.hours }}</span>:
            <span>{{ state.time.minutes }}</span>:
            <span>{{ state.time.seconds }}</span>
        </div>
    </div>
</template>

<style scoped>
.digital-clock {
    text-align: center;
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background: var(--bg-color);
    border-radius: 5px;
    box-shadow: 0 0 13px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--border-color);
    color: var(--font-color);
    max-width: 400px;
    margin: 20px auto;
}

.date {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #bdc3c7;
}

.time {
    font-size: 2.5em;
    font-weight: bold;
    letter-spacing: 2px;
}

.time span {
    display: inline-block;
    min-width: 0.8em;
    padding: 0 5px;
}
</style>