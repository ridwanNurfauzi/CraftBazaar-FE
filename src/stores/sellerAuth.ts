import axios from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";

declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useSellerAuthStore = defineStore('seller_auth', {
    state() {
        const sellerData: any = null;

        return {
            sellerData,
            sellerLoggedIn: false
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async login(data: any) {
            try {
                const res = await axios.post(
                    `${this._config.API_URL}/seller/login`,
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
        async register(data: any) {
            try {
                const res = await axios.post(
                    `${this._config.API_URL}/seller/register`,
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
                if (!window.$cookies.isKey('sellerToken')) {
                    this.$state.sellerLoggedIn = false;
                    return false;
                }
                const res = await axios.get(
                    `${this._config.API_URL}/seller/profile`,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`
                        }
                    }
                );

                if (res.data.success) {
                    this.$state.sellerData = res.data.data;
                    this.$state.sellerLoggedIn = true;
                    return true;
                } else {
                    this.$state.sellerLoggedIn = false;
                    return false;
                }
            } catch (error) {
                this.$state.sellerLoggedIn = false;
                return false;
            }
        },
        async updateProfile(fData: any, id: any) {
            try {
                if (!window.$cookies.isKey('sellerToken')) {
                    this.$state.sellerLoggedIn = false;
                    return false;
                }
                const res = await axios.put(
                    `${this._config.API_URL}/seller/profile/${id}`,
                    fData,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('sellerToken')}`
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
                this.$state.sellerLoggedIn = false;
                return window.$cookies.remove('sellerToken');
            } catch (error) {
                return false;
            }
        }
    }
});
