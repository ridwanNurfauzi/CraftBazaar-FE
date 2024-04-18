import axios, { type AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useUserCartStore = defineStore('user_cart', {
    state() {
        const cartProducts: any = null;

        return {
            cartProducts,
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchCartProduct() {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                    }
                }

                const res = await axios.get(
                    `${this._config.API_URL}/user/carts`,
                    config
                );

                if (res.data.success) {
                    this.$state.cartProducts = res.data;
                    return true;
                }
                else {
                    this.$state.cartProducts = null;
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async addProductToCart(data: { product_id: any, qty: any }) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.post(
                    `${this._config.API_URL}/user/carts`,
                    data,
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
        },
        async selectCartProduct(product_id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.put(
                    `${this._config.API_URL}/user/carts/select/${product_id}`,
                    {},
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
        },
        async incrementCartProduct(product_id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.put(
                    `${this._config.API_URL}/user/carts/increment/${product_id}`,
                    {},
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
        },
        async decrementCartProduct(product_id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.put(
                    `${this._config.API_URL}/user/carts/decrement/${product_id}`,
                    {},
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
        },
        async deleteProductCart(product_id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                    }
                }

                const res = await axios.delete(
                    `${this._config.API_URL}/user/carts/${product_id}`,
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
