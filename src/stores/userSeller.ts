import axios, { type AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useUserSellerStore = defineStore('user_seller', {
    state() {
        const seller: any = null;
        const sellers: any = null;

        return {
            seller,
            sellers
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchSellers() {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/user/sellers`,
                    config
                );
                if (res.data.success) {
                    this.$state.sellers = res.data;
                    return true;
                } else {
                    this.$state.sellers = null;
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchSellerByCode(code: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/user/sellers/code/${code}`,
                    config
                );

                if (res.data.success) {
                    this.$state.seller = res.data;
                    return true;
                }
                else {
                    this.$state.seller = null;
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async subscribe(seller_id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }
                const res = await axios.post(
                    `${this._config.API_URL}/user/sellers/subscribe`,
                    { seller_id },
                    config
                );

                if (res.data.success) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
