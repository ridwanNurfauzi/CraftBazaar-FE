<template>
    <div class="flex-1 flex flex-col bg-[url('/images/bg1.jpg')] bg-cover bg-center">
        <div
            class="m-0 my-auto sm:mx-auto sm:w-[540px] flex-grow sm:flex-grow-0 flex flex-col bg-gray-50 bg-opacity-[.65] p-8 sm:rounded-xl shadow-lg backdrop-blur-sm">
            <div class="flex flex-col my-auto">
                <div>
                    <h1 class="text-center text-2xl font-semibold">Login Pengguna</h1>
                </div>
                <div class="my-2">
                    <form method="post" @submit.prevent="performLogin()">
                        <div class="flex flex-col my-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" name="email" id="email"
                                class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Masukkan Email . . ." autocomplete="on" />
                            <p v-if="!!validation.email" class="mt-2 text-sm text-red-700">
                                {{ validation.email }}
                            </p>
                        </div>
                        <div class="flex flex-col my-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password"
                                class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Masukkan Password . . ." />
                            <p v-if="!!validation.password" class="mt-2 text-sm text-red-700">
                                {{ validation.password }}
                            </p>
                        </div>
                        <div class="my-5">
                            <RouterLink :to="{ name: 'user.register' }">
                                <span class="text-blue-700 hover:underline">Belum punya akun?</span>
                            </RouterLink>
                        </div>
                        <div class="my-5 flex flex-row">
                            <div class="ms-auto">
                                <input type="reset" value="Reset"
                                    class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" />
                                <input type="submit" value="Masuk" @click="performLogin()"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useUserAuthStore } from "@/stores/userAuth";

export default {
    components: {
        RouterLink
    },
    data() {
        return {
            validation: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions(useUserAuthStore, ['login']),

        async performLogin() {
            const fData = new FormData(document.forms[0]);
            const data = await this.login(fData);

            let validation = this.validation;

            Object.keys(this.validation).forEach(e => {
                this.validation[e as keyof typeof validation] = '';
            });

            if ((!data?.success) && data?.vError) {
                let vResult = data?.vResult?.errors;

                Object.keys(this.validation).forEach(e => {
                    const err = vResult.filter((d: any) => d?.path == e);
                    if (err.length > 0) {
                        this.validation[e as keyof typeof validation] = err[0].msg;
                    }
                });
            }
            else if (data?.success) {
                this.$cookies.set('userToken', data?.token);
                this.$router.push({ name: 'user.home' });
            }
        }
    }
}
</script>
