import { defineStore } from 'pinia'
import { store } from '../index'

interface AppState {
    logo: boolean
}

export const useAppStore = defineStore('app', {
    state: (): AppState => {
        return {
            logo: true, // logo
        }
    },
    getters: {
        logo(): boolean {
            return this.logo
        }
    },
    actions: {
        setLogo(logo: boolean) {
            this.logo = logo;
        }
    },
    persist: false
})

export const useAppStoreWithOut = () => {
    return useAppStore(store)
}
