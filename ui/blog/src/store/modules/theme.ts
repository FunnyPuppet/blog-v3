// stores/theme.ts
import { defineStore } from 'pinia'

interface ThemeState {
  theme: 'light' | 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: 'light'
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
    },
    applyTheme() {
      const html = document.documentElement
      html.setAttribute('data-theme', this.theme)
    }
  },
  persist: true // 启用持久化
})