<template>
    <div class="flex-1 flex flex-col bg-[url('/images/bg1.jpg')] bg-cover bg-center sm:py-12">
        <div
            class="m-0 my-auto sm:mx-auto sm:w-[540px] flex-grow sm:flex-grow-0 flex flex-col bg-gray-50 bg-opacity-[.65] p-8 sm:rounded-xl shadow-lg backdrop-blur-sm">
            <div class="flex flex-col my-auto">
                <div>
                    <h1 class="text-center text-2xl font-semibold">Register Pengguna</h1>
                </div>
                <div>
                    <form method="post" @submit="performRegister()" @submit.prevent>
                        <div class="">
                            <div class="flex">
                                <div class="mx-auto">
                                    <div
                                        class="rounded-full h-44 w-44 bg-gray-400 shadow-lg mt-5 bg-[url('/images/person.png')] bg-cover bg-center overflow-hidden">
                                        <div class="w-full h-full bg-opacity-45 bg-white">
                                            <div v-if="photoExist" class="w-full h-full bg-cover bg-center">
                                                <img v-if="photoExist" :src="photo"
                                                    class="min-h-full min-w-full object-cover bg-gray-400"
                                                    alt="Profile photo">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex -mt-8 pe-0">
                                        <div class="ms-auto">
                                            <button type="button" @click="deletePhoto()" title="Hapus foto"
                                                class="py-2 px-3 me-1 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <button type="button" @click="addPhoto()" title="Tambah foto"
                                                class="py-2 px-3 me-1 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200">
                                                <i class="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <input type="file" name="photo" id="photo" accept="image/png, image/jpeg"
                                        @change="changePhoto()" class="hidden">
                                </div>
                            </div>
                            <div class="flex-1">
                                <div>
                                    <div class="flex flex-col my-5">
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input type="text" name="email" id="email" v-model="email"
                                            class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan Email . . ." autocomplete="on" />
                                        <p v-if="!!validation.email" class="mt-2 text-sm text-red-700">
                                            {{ validation.email }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col my-5">
                                        <label for="firstname" class="block mb-2 text-sm font-medium text-gray-900">
                                            Nama depan</label>
                                        <input type="text" name="firstname" id="firstname"
                                            class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan nama depan . . ." />
                                        <p v-if="!!validation.firstname" class="mt-2 text-sm text-red-700">
                                            {{ validation.firstname }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col my-5">
                                        <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900">Nama
                                            belakang</label>
                                        <input type="text" name="lastname" id="lastname"
                                            class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan nama belakang . . ." />
                                        <p v-if="!!validation.lastname" class="mt-2 text-sm text-red-700">
                                            {{ validation.lastname }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col my-5">
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                                            Password</label>
                                        <input type="password" name="password" id="password" v-model="password"
                                            class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan password . . ." />
                                        <p v-if="!!validation.password" class="mt-2 text-sm text-red-700">
                                            {{ validation.password }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col my-5">
                                        <label for="confirm_password"
                                            class="block mb-2 text-sm font-medium text-gray-900">
                                            Konfirmasi password</label>
                                        <input type="password" name="confirm_password" id="confirm_password"
                                            class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Ketik ulang password . . ." />
                                        <p v-if="!!validation.confirm_password" class="mt-2 text-sm text-red-700">
                                            {{ validation.confirm_password }}
                                        </p>
                                    </div>
                                    <div class="my-5">
                                        <RouterLink :to="{ name: 'user.login' }">
                                            <span class="text-blue-700 hover:underline">Sudah punya akun?</span>
                                        </RouterLink>
                                    </div>
                                    <div class="my-5 flex flex-row">
                                        <div class="ms-auto">
                                            <input type="reset" value="Reset" @click="deletePhoto()"
                                                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" />
                                            <input type="submit" value="Daftar"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" />
                                        </div>
                                    </div>
                                </div>
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
import Swal from "sweetalert2";

export default {
    components: {
        RouterLink
    },
    data() {
        return {
            email: '',
            password: '',
            photoExist: false,
            photo: '',
            m: this.$route.meta,
            validation: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                confirm_password: '',
            }
        };
    },
    methods: {
        ...mapActions(useUserAuthStore, ['register', 'login']),
        addPhoto() {
            document.forms[0]['photo'].click();
        },
        changePhoto() {
            if (!!document.forms[0]['photo'].files[0]) {
                this.photo = URL.createObjectURL(document.forms[0]['photo'].files[0]);
            } else {
                this.photo = '';
            }
            this.photoExist = !!this.photo;
        },
        deletePhoto() {
            const f = document.forms[0]['photo'];

            if (!!f.value) {
                try {
                    f.value = '';
                }
                catch (err) { }
                if (f.value) {
                    var form = document.createElement('form'),
                        parentNode = f.parentNode, ref = f.nextSibling;
                    form.appendChild(f);
                    form.reset();
                    parentNode.insertBefore(f, ref);
                }
            }
            this.photoExist = false;
        },

        async performRegister() {
            try {
                const fData = new FormData(document.forms[0]);
                const data = await this.register(fData);
                // console.log(data);

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
                    const loginData = await this.login({
                        email: this.email,
                        password: this.password
                    });
                    console.log(loginData);

                    if (loginData?.success) {
                        this.$cookies.set('userToken', loginData?.token);
                        this.$router.push({ name: 'user.home' });
                    } else {
                        Swal.fire({
                            title: 'Mohon Maaf',
                            text: 'Terjadi kesalahan.',
                            icon: 'error'
                        });
                    }
                    // this.$cookies.set('userToken', data?.token);
                    // this.$router.push({ name: 'user.home' });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Mohon Maaf',
                    text: 'Terjadi kesalahan.',
                    icon: 'error'
                });
            }
        }
    }
}
</script>
