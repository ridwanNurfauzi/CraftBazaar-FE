import axios from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";

declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useAdminAuthStore = defineStore('admin_auth', {
    state() {
        const adminData: any = null;

        return {
            adminData,
            adminLoggedIn: false
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async login(data: any) {
            try {
                const res = await axios.post(
                    `${this._config.API_URL}/admin/login`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                return res.data;
            } catch (error) {
                return false;
            }
        },
        async getProfile() {
            try {
                if (!window.$cookies.isKey('adminToken')) {
                    this.$state.adminLoggedIn = false;
                    return false;
                }
                const res = await axios.get(
                    `${this._config.API_URL}/admin/profile`,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                        }
                    }
                );

                if (res.data.success) {
                    this.$state.adminData = res.data.data;
                    this.$state.adminLoggedIn = true;
                    return res.data;
                } else {
                    this.$state.adminLoggedIn = false;
                    return res.data;
                }
            } catch (error) {
                this.$state.adminLoggedIn = false;
                return false;
            }
        },
        async updateProfile(fData: any, id: any) {
            try {
                if (!window.$cookies.isKey('adminToken')) {
                    this.$state.adminLoggedIn = false;
                    return false;
                }
                const res = await axios.put(
                    `${this._config.API_URL}/admin/profile/${id}`,
                    fData,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('adminToken')}`
                        }
                    }
                );

                if (res.data.success) {
                    return res.data;
                } else {
                    return res.data;
                }
            } catch (error) {
                return false;
            }
        },
        logout() {
            try {
                this.$state.adminLoggedIn = false;
                return window.$cookies.remove('adminToken');
            } catch (error) {
                return false;
            }
        }
    }
});
