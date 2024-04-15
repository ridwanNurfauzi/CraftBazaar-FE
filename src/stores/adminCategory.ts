import axios, { type AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useAdminCategoryStore = defineStore('admin_category', {
    state() {
        const categories: any = null;
        const category: any = null;

        return {
            categories,
            category
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchCategories() {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/admin/categories`,
                    config
                );

                if (res.data.success) {
                    this.$state.categories = res.data;
                    return res.data;
                }
                else {
                    this.$state.categories = null;
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchCategoryById(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/admin/categories/${id}`,
                    config
                );

                if (res.data.success) {
                    this.$state.category = res.data;
                    return res.data;
                }
                else {
                    this.$state.category = null;
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async addCategory(data: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.post(
                    `${this._config.API_URL}/admin/categories`,
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
        async updateCategory(data: any, id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.put(
                    `${this._config.API_URL}/admin/categories/${id}`,
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
        async deleteCategory(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.delete(
                    `${this._config.API_URL}/admin/categories/${id}`,
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
