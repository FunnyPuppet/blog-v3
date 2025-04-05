<script setup lang="ts">

</script>

<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath"></component>
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath"></component>
    </router-view>
</template>

<style lang="sass" scoped>

</style>