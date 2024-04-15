import axios, { type AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useAdminAdminStore = defineStore('admin_admin', {
    state() {
        const admins: any = null;
        const admin: any = null;

        return {
            admins,
            admin
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async fetchAdmins() {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/admin/admins`,
                    config
                );

                if (res.data.success) {
                    this.$state.admins = res.data;
                    return res.data;
                }
                else {
                    this.$state.admins = null;
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async fetchAdminById(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.get(
                    `${this._config.API_URL}/admin/admins/${id}`,
                    config
                );

                if (res.data.success) {
                    this.$state.admin = res.data;
                    return res.data;
                }
                else {
                    this.$state.admin = null;
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async addAdmin(data: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.post(
                    `${this._config.API_URL}/admin/admins`,
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
        async updateAdmin(data: any, id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.put(
                    `${this._config.API_URL}/admin/admins/${id}`,
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
        async deleteAdmin(id: any) {
            try {
                let config: AxiosRequestConfig = {};
                if (window.$cookies.isKey('adminToken')) {
                    config.headers = {
                        "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                    }
                }
                const res = await axios.delete(
                    `${this._config.API_URL}/admin/admins/${id}`,
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
