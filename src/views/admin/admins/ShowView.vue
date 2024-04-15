<template>
    <div class="flex-1 flex flex-col" v-if="admin">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center font-medium text-lg">Profil</h1>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-3 mx-4 md:mx-10">
                <div class="flex">
                    <div
                        class="mx-auto rounded-full h-44 w-44 bg-gray-400 shadow-lg mt-5 bg-[url('/images/person.png')] bg-cover bg-center overflow-hidden">
                        <div class="w-full h-full bg-opacity-45 bg-white">
                            <div class="w-full h-full bg-cover bg-center">
                                <img v-if="!!admin.data.photo"
                                    :src="`${API_URL}/public/images/profiles/admin/${admin.data.photo}`"
                                    class="min-h-full min-w-full object-cover bg-gray-400" alt="Profile photo">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input type="text" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="admin.data.email" readonly />
                    </div>
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                            Nama
                        </label>
                        <input type="text" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="admin.data.name" readonly />
                    </div>
                    <div class="mb-5">
                        <label for="createdAt" class="block mb-2 text-sm font-medium text-gray-900">
                            Dibuat Pada
                        </label>
                        <input type="text" id="createdAt"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="!!admin.data.createdAt ? new Date(admin.data.createdAt).toLocaleString('id-ID') : ''"
                            readonly />
                    </div>
                    <div class="mb-5">
                        <label for="updatedAt" class="block mb-2 text-sm font-medium text-gray-900">
                            Terakhir Diubah
                        </label>
                        <input type="text" id="updatedAt"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="(!admin.data.updatedAt || admin.data.updatedAt != admin.data.createdAt) ? new Date(admin.data.updatedAt).toLocaleString('id-ID') : 'Belum diubah'"
                            readonly />
                    </div>
                    <div class="mb-5">
                        <button type="button" @click="$router.push({ name: 'admin.adminsEdit' })"
                            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Ubah Profil
                        </button>
                        <button type="button" @click="performDeleteAdmin($route.params.id)"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useConfigStore } from "@/stores/_config";
import { useAdminAuthStore } from "@/stores/adminAuth";
import { useAdminAdminStore } from "@/stores/adminAdmin";
import Swal from "sweetalert2";

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useAdminAuthStore, ['getProfile']),
        ...mapActions(useAdminAdminStore, ['fetchAdminById', 'deleteAdmin']),
        async performDeleteAdmin(id: any) {
            if (this.adminData.id == id)
                return await Swal.fire({
                    icon: 'warning',
                    text: 'Anda sedang menggunakan akun ini.'
                });
            const response = await Swal.fire({
                icon: 'question',
                text: 'Apakah anda yakin ingin menghapus admin ini.',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#67f'
            });
            if (response.isConfirmed) {
                const data = await this.deleteAdmin(id);
                if (data.success)
                    await Swal.fire({
                        icon: 'success',
                        text: 'Berhasil menghapus admin.'
                    });
                else
                    await Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan.'
                    });
                await this.$router.push({ name: 'admin.admins' });
            }
        },
    },
    computed: {
        ...mapState(useAdminAdminStore, ['admin']),
        ...mapState(useAdminAuthStore, ['adminData']),
        ...mapState(useConfigStore, ['API_URL']),
    },
    async mounted() {
        await this.fetchAdminById(this.$route.params.id);
        await this.getProfile();
    }
}
</script>
