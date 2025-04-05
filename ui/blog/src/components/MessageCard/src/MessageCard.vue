<script setup lang="ts">
import { reactive } from 'vue'

defineOptions({
   inheritAttrs: false, 
})

defineEmits(["submit"])

const reset = () => {
    data.name = "";
    data.email = "";
    data.message = ""; 
}

const data = reactive({
    name: "",
    email: "",
    message: ""
})

defineExpose({ reset })
</script>

<template>
    <div class="message-card-box">
        <div class="message-card-box-left">
            <input v-model="data.name" type="text" class="input-round" placeholder="输入昵称">
            <input v-model="data.email" type="text" class="input-round" placeholder="输入邮箱">
            <button class="btn-submit" @click="$emit('submit', data)">提交</button>
        </div>
        <div class="message-card-box-right">
            <textarea v-model="data.message" class="textarea-round" placeholder="请输入内容..."></textarea>
        </div>
    </div>
</template>

<style scoped lang="scss">
.message-card-box {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: start;

    &-left {
        flex: 1;
        height: 100%;
        min-width: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 0.5rem;

        .input-round {
            padding: 0.2rem;
            font-size: 1rem;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            background: var(--bg-color);
            outline: none;
            transition: 0.3s;
        }

        .input-round:focus {
            border-color: #3498db;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        }

        .btn-submit {
            background: linear-gradient(45deg, #1E90FF, #87CEFA);
            border: none;
            font-size: 1.2rem;
            color: var(--global-clolor);
            border-radius: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .btn-submit:hover {
            transform: scale(1.1);
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        }
    }

    &-right {
        flex: 4;
        max-width: calc(100% - 10rem);
        height: 100%;

        .textarea-round {
            width: calc(100% - 0.5rem);
            height: 7.7rem;
            font-size: 1rem;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            border-radius: 10px;
            outline: none;
            transition: 0.3s;
            resize: none;
        }

        .textarea-round:focus {
            border-color: #3498db;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        }
    }
}
</style>