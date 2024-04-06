import axios from 'axios';
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue-cookies';
import { useConfigStore } from "./_config";


declare global {
    interface Window {
        $cookies: VueCookies;
    }
}

export const useUserAuthStore = defineStore('user_auth', {
    state() {
        const userData: any = null;

        return {
            userData,
            loggedIn: false
        };
    },
    getters: {
        _config: () => useConfigStore()
    },
    actions: {
        async login(data: any) {
            try {
                const res = await axios.post(
                    `${this._config.API_URL}/user/login`,
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
                    `${this._config.API_URL}/user/register`,
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
                if (!window.$cookies.isKey('userToken')) {
                    this.$state.loggedIn = false;
                    return false;
                }
                const res = await axios.get(
                    `${this._config.API_URL}/user/profile`,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('userToken')}`
                        }
                    }
                );

                if (res.data.success) {
                    this.$state.userData = res.data.data;
                    this.$state.loggedIn = true;
                    return true;
                } else {
                    this.$state.loggedIn = false;
                    return false;
                }
            } catch (error) {
                this.$state.loggedIn = false;
                return false;
            }
        },
        async updateProfile(fData: any, id: any) {
            try {
                if (!window.$cookies.isKey('userToken')) {
                    this.$state.loggedIn = false;
                    return false;
                }
                const res = await axios.put(
                    `${this._config.API_URL}/user/profile/${id}`,
                    fData,
                    {
                        headers: {
                            "Authorization": `Bearer ${window.$cookies.get('userToken')}`
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
                this.$state.loggedIn = false;
                return window.$cookies.remove('userToken');
            } catch (error) {
                return false;
            }
        }
    }
});
