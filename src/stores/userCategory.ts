import axios from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useUserCategoryStore = defineStore('user_category', {
    state() {
        const categories: any = null;

        return {
            categories
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchCategories() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/categories`
                );

                if (res.data.success) {
                    this.$state.categories = res.data;
                    return true;
                }
                else {
                    this.$state.categories = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
});
