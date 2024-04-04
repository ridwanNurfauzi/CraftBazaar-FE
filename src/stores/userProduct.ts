import axios from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useUserProductStore = defineStore('user_product', {
    state() {
        const products: any = null;
        const latestProducts: any = null;
        const earliestProducts: any = null;
        const popularProducts: any = null;
        const product: any = null;

        return {
            products,
            latestProducts,
            earliestProducts,
            popularProducts,
            product
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchProducts() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/products`
                );

                if (res.data.success) {
                    this.$state.products = res.data;
                    return true;
                }
                else {
                    this.$state.products = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchLatestProducts() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/products/latest`
                );

                if (res.data.success) {
                    this.$state.latestProducts = res.data;
                    this.$state.products = res.data;
                    return true;
                }
                else {
                    this.$state.latestProducts = [];
                    this.$state.products = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchEarliestProducts() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/products/earliest`
                );

                if (res.data.success) {
                    this.$state.earliestProducts = res.data;
                    this.$state.products = res.data;
                    return true;
                }
                else {
                    this.$state.earliestProducts = [];
                    this.$state.products = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchPopularProducts() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/products/popular`
                );

                if (res.data.success) {
                    this.$state.popularProducts = res.data;
                    this.$state.products = res.data;
                    return true;
                }
                else {
                    this.$state.popularProducts = [];
                    this.$state.products = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
});
