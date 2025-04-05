<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Main } from "@/layout/Main"
import Waves from "@/layout/Main/src/components/Waves.vue"
import { Footer } from "@/layout/Footer"
import { useThemeStore } from "@/store/modules/theme"
import { useDeviceStore } from "@/store/modules/device"
import { Moon, Sunrise } from "@element-plus/icons-vue"

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const deviceStore = useDeviceStore()

const isLight = ref(true)

const getPath = computed(() => route.path)

// 初始化主题的函数
const initTheme = () => {
    document.documentElement.setAttribute('data-theme', themeStore.theme)
    isLight.value = themeStore.theme === 'light' ? true : false
}

// 切换主题的函数
const changeTheme = () => {
    themeStore.toggleTheme()
    initTheme()
}

// 切换菜单的函数
const handleSelect = async (val: string) => {
    router.push(val)
    closeMenu()
}

const isOpen = ref(false)
const openMenu = () => (isOpen.value = true)
const closeMenu = () => (isOpen.value = false)

onMounted(() => {
    initTheme()
    deviceStore.checkDevice()

    // 监听窗口大小变化
    window.addEventListener('resize', deviceStore.updateDeviceOnResize)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
    window.removeEventListener('resize', deviceStore.updateDeviceOnResize)
})
</script>

<template>
    <div class="layout">
        <div class="head-bg">
            <div class="header-content">
                <div class="head-avatar">
                    <router-link to="/"><el-avatar class="el-avatar" src="src/assets/images/avatar.jpg" /></router-link>
                </div>
                <div class="mobile-menu">
                    <i class="iconfont icon-menu ml-10" @click="openMenu"></i>
                </div>
                <div class="right-container">
                    <div class="head-menu">
                        <el-menu mode="horizontal" :default-active="getPath" :ellipsis="false" menu-trigger="click"
                            @select="handleSelect">
                            <el-menu-item index="/"><i class="iconfont icon-home_light"></i> 主 页</el-menu-item>
                            <el-menu-item index="/timeline"><i class="iconfont icon-timeline"></i> 时 间
                                轴</el-menu-item>
                            <el-menu-item index="/feeling"><i class="iconfont icon-feeling"></i> 说 说</el-menu-item>
                            <!-- <el-menu-item index="/album"><i class="iconfont icon-photos"></i> 相 册</el-menu-item> -->
                            <el-menu-item index="/message"><i class="iconfont icon-message"></i> 留 言</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="head-theme">
                        <el-switch v-model="isLight" size="default" :active-icon="Sunrise" inline-prompt
                            :inactive-icon="Moon" @change="changeTheme" />
                    </div>
                </div>
            </div>
            <div>
                <Waves height="4rem"></Waves>
            </div>
        </div>
        <div class="main-box">
            <Main></Main>
        </div>
        <div>
            <Footer></Footer>
        </div>

        <div class="menu-overlay" @click="closeMenu" v-if="isOpen"></div>
        <div :class="['menu', { 'menu-open': isOpen }]">
            <div class="menu-close-box">
                <i @click="closeMenu" class="iconfont icon-close" style="font-size: 24px;"></i>
            </div>
            <el-menu :default-active="getPath" :ellipsis="false" menu-trigger="click" @select="handleSelect">
                <el-menu-item index="/"><i class="iconfont icon-home_light"></i> 主 页</el-menu-item>
                <el-menu-item index="/timeline"><i class="iconfont icon-timeline"></i> 时 间 轴</el-menu-item>
                <el-menu-item index="/feeling"><i class="iconfont icon-feeling"></i> 说 说</el-menu-item>
                <!-- <el-menu-item index="/album"><i class="iconfont icon-photos"></i> 相 册</el-menu-item> -->
                <el-menu-item index="/message"><i class="iconfont icon-message"></i> 留 言</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: 100%;
    overflow-y: auto;
}

:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover) {
    background-color: transparent;
}

.head-bg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 10rem;
    //background: url("@/assets/images/1.jpg") no-repeat center bottom;
    background-color: #FA8BFF;
    background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .head-avatar {
        margin-left: 1rem;
    }
}

.mobile-menu {
    display: none;
    color: var(--menu-color);
}

.menu-close-box {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    color: var(--font-color);
}

.right-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.head-menu {
    margin-right: 20px;
}

.head-theme {
    margin-right: 5px;
}

.iconfont {
    font-size: 1.2rem;
    margin-right: 8px;
}

.main-box {
    width: 100%;
    min-height: calc(100vh - 18rem);
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: var(--bg-color);
    padding-bottom: 2rem;
}

.menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background: var(--bg-color);
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    :deep(.el-menu-item) {
        color: var(--font-color);
    }
}

.menu-open {
    transform: translateX(0);
}

.menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
    .head-menu {
        display: none;
    }

    .head-avatar {
        display: none;
    }

    .mobile-menu {
        display: block;
    }
}
</style>