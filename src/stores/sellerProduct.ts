import axios, { type AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useSellerProductStore = defineStore('seller_product', {
    state() {
        const products: any = null;
        const product: any = null;

        return {
            products,
            product
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchProductById(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('sellerToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`
                    }
                }

                const res = await axios.get(
                    `${this._config.API_URL}/seller/products/${id}`,
                    config
                );

                if (res.data.success) {
                    this.$state.product = res.data;
                    return res.data;
                }
                else {
                    this.$state.product = null;
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchProducts() {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('sellerToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`
                    }
                }

                const res = await axios.get(
                    `${this._config.API_URL}/seller/products`,
                    config
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
        async addProducts(data: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('sellerToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.post(
                    `${this._config.API_URL}/seller/products`,
                    data,
                    config
                );

                if (res.data.success) {
                    return res.data;
                }
                else {
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async updateProduct(data: any, id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('sellerToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`,
                        "Content-Type": 'multipart/form-data'
                    }
                }

                const res = await axios.put(
                    `${this._config.API_URL}/seller/products/${id}`,
                    data,
                    config
                );

                if (res.data.success) {
                    return res.data;
                }
                else {
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async deleteProducts(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('sellerToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`
                    }
                }

                const res = await axios.delete(
                    `${this._config.API_URL}/seller/products/${id}`,
                    config
                );

                if (res.data.success) {
                    return res.data;
                }
                else {
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
