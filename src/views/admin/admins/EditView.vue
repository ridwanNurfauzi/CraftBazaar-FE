<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center font-medium text-lg">Ubah Profil Admin</h1>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-3 mx-4 md:mx-10">
                <div class="flex">
                    <div
                        class="mx-auto rounded-full h-44 w-44 bg-gray-400 shadow-lg mt-5 bg-[url('/images/person.png')] bg-cover bg-center">
                        <div class="w-full h-full bg-opacity-45 rounded-full bg-white overflow-hidden">
                            <div class="w-full h-full bg-cover bg-center">
                                <img v-if="!!photo" :src="`${photo}`"
                                    class="min-h-full min-w-full object-cover bg-gray-400" alt="Profile photo">
                            </div>
                        </div>
                        <div class="flex -mt-8 pe-0">
                            <div class="ms-auto">
                                <input type="file" name="photoF" id="photoF" @change="changePhoto" accept="image/*"
                                    hidden>
                                <button type="button" title="Hapus foto" @click="removePhoto"
                                    class="py-2 px-3 me-1 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <button type="button" title="Tambah foto" @click="addPhoto"
                                    class="py-2 px-3 me-1 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input type="text" id="email" v-model="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <p class="mt-2 text-sm text-red-600">
                            {{ validation.email }}
                        </p>
                    </div>
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                            Nama
                        </label>
                        <input type="text" id="name" v-model="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <p class="mt-2 text-sm text-red-600">
                            {{ validation.name }}
                        </p>
                    </div>
                    <div class="mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
                        <details>
                            <summary class="mb-2 font-medium text-gray-900 cursor-pointer">
                                Ubah Password
                            </summary>
                            <div>
                                <div class="mb-5">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input type="password" id="password" v-model="password"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <p class="mt-2 text-sm text-red-600">
                                        {{ validation.password }}
                                    </p>
                                </div>
                                <div class="mb-5">
                                    <label for="confirm" class="block mb-2 text-sm font-medium text-gray-900">
                                        Konfirmasi Password
                                    </label>
                                    <input type="password" id="confirm" v-model="confirm_password"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <p class="mt-2 text-sm text-red-600">
                                        {{ validation.confirm_password }}
                                    </p>
                                </div>
                            </div>
                        </details>
                    </div>
                    <div class="mb-5">
                        <button type="button" @click="performUpdateProfile()"
                            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Ubah
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useConfigStore } from "@/stores/_config";
import { useAdminAdminStore } from "@/stores/adminAdmin";
import Swal from "sweetalert2";

export default {
    components: {
        RouterLink
    },
    data(vm) {
        const photo: any = null
        const photoFile: any = null
        return {
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            photo,
            photoFile,
            validation: {
                email: '',
                name: '',
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        ...mapActions(useAdminAdminStore, ['fetchAdminById', 'updateAdmin']),
        changePhoto() {
            const files = (<HTMLInputElement>document.getElementById('photoF')).files as any;
            this.photoFile = files[0];
            this.photo = (URL.createObjectURL(this.photoFile));
        },
        addPhoto() {
            document.getElementById('photoF')?.click();
        },
        removePhoto() {
            this.photoFile = null;
            this.photo = null;
        },
        async performUpdateProfile() {
            const fData = new FormData();
            try {
                fData.append('email', this.email);
                fData.append('name', this.name);
                fData.append('password', this.password);
                fData.append('confirm_password', this.confirm_password);
                fData.append('photo', this.photoFile);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Gagal mengubah profil admin.'
                });
            }
            finally {
                const response = await this.updateAdmin(fData, this.$route.params.id);

                let validation = this.validation;
                Object.keys(this.validation).forEach(e => {
                    this.validation[e as keyof typeof validation] = '';
                });

                if ((!response?.success) && response?.vError) {
                    let vResult = response?.vResult?.errors;

                    Object.keys(this.validation).forEach(e => {
                        const err = vResult.filter((d: any) => d?.path == e);
                        if (err.length > 0) {
                            this.validation[e as keyof typeof validation] = err[0].msg;
                        }
                    });
                }
                if (response?.success) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Berhasil mengubah profil admin.'
                    });
                    this.$router.push({ name: 'admin.admins' });
                }
            }
        }
    },
    computed: {
        ...mapState(useAdminAdminStore, ['admin']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.fetchAdminById(this.$route.params.id).then(async () => {
            this.email = this.admin.data?.email ?? '';
            this.name = this.admin.data?.name ?? '';
            if (!!this.admin.data?.photo)
                await fetch(`${this.API_URL}/public/images/profiles/admin/${this.admin.data.photo}`)
                    .then(x => x.blob())
                    .then(y => {
                        this.photoFile = new File([y], `${this.admin.data.photo}`);
                        let url = URL.createObjectURL(y)
                        this.photo = url;
                    });
        });
    }
}
</script>
