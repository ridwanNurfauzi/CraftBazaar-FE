import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state() {
        return {
            API_URL: 'http://localhost:3000'
        };
    },
});
