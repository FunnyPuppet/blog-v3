// stores/theme.ts
import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {
    state: () => ({
        // 判断是否是手机设备
        isMobile: false,
    }),
    actions: {
        checkDevice() {
            const userAgent = navigator.userAgent
            const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

            // 根据屏幕宽度判断设备是否为手机
            const isSmallScreen = window.innerWidth <= 768

            // 判断是否是手机设备，优先判断宽度
            this.isMobile = isMobile || isSmallScreen
        },
        updateDeviceOnResize() {
            this.checkDevice()
        },
    },
    persist: true
})