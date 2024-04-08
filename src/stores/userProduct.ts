import axios, { type AxiosRequestConfig } from 'axios';
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
        const productsFromSubscriptions: any = null;
        const product: any = null;

        return {
            products,
            latestProducts,
            earliestProducts,
            popularProducts,
            productsFromSubscriptions,
            product
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchProductBySlug(slug: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('userToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/user/products/slug/${slug}`,
                    config
                );

                if (res.data.success) {
                    this.$state.product = res.data;
                    return true;
                }
                else {
                    this.$state.product = null;
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
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
        async fetchProductsFromSubscriptions() {
            try {
                const res = await axios.get(
                    `${this._config.API_URL}/user/sellers/subscriptions/products`,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                        }
                    }
                );


                if (res.data.success) {
                    this.$state.productsFromSubscriptions = res.data;
                    this.$state.products = res.data;
                    return true;
                }
                else {
                    this.$state.productsFromSubscriptions = [];
                    this.$state.products = [];
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async removePersonalReview(id: any) {
            try {
                const res = await axios.delete(
                    `${this._config.API_URL}/user/products/reviews/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                        }
                    }
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
        async addReview(data: any) {
            try {
                if (!window.$cookies.isKey('userToken')) {
                    return false;
                }
                const res = await axios.post(
                    `${this._config.API_URL}/user/products/reviews/post`,
                    data,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('userToken')}`,
                            "Content-Type": 'multipart/form-data'
                        }
                    }
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
