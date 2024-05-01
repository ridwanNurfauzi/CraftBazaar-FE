<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="admins && adminData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Admin</h1>
        </div>
        <div class="my-4 mx-auto">
            <RouterLink
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                :to="{ name: 'admin.adminsAdd' }">
                <i class="bi bi-person-fill-add"></i>
                Tambah Admin
            </RouterLink>
        </div>
        <div class="m-4 w-full overflow-auto">
            <div class="overflow-x-auto" v-if="admins.data">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Dibuat pada
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Terakhir diubah
                            </th>
                            <th scope="col" class="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="admins.data.length > 0">
                        <tr class="bg-white border-b" v-for="admin in admins.data">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ admin.name }}
                            </th>

                            <td class="px-6 py-4">
                                {{ admin.email }}
                            </td>
                            <td class="px-6 py-4">
                                {{ !!admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('id-ID') : ''
                                }}
                            </td>
                            <td class="px-6 py-4">
                                {{ (!admin.updatedAt || admin.updatedAt != admin.createdAt) ?
        new Date(admin.updatedAt).toLocaleDateString('id-ID') : 'Belum diubah' }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex">
                                    <button type="button"
                                        @click="$router.push({ name: 'admin.adminsShow', params: { id: admin.id } })"
                                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Lihat
                                    </button>
                                    <button type="button"
                                        @click="$router.push({ name: 'admin.adminsEdit', params: { id: admin.id } })"
                                        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Ubah
                                    </button>
                                    <button type="button" @click="performDeleteAdmin(admin.id)"
                                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useAdminAuthStore } from "@/stores/adminAuth";
import { useAdminAdminStore } from "@/stores/adminAdmin";
import Swal from 'sweetalert2';

export default {
    components: {
        RouterLink
    },
    data(vm) {
        return {

        };
    },
    methods: {
        ...mapActions(useAdminAuthStore, ['getProfile']),
        ...mapActions(useAdminAdminStore, ['fetchAdmins', 'deleteAdmin']),
        async performDeleteAdmin(id: any) {
            if (this.adminData.id == id)
                return await Swal.fire({
                    icon: 'warning',
                    text: 'Anda sedang menggunakan akun ini.'
                });
            const response = await Swal.fire({
                icon: 'question',
                text: 'Apakah anda yakin ingin menghapus akun ini.',
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
                        text: 'Berhasil menghapus akun.'
                    });
                else
                    await Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan.'
                    });
                await this.fetchAdmins();
            }
        },
        rateToStar(val: number) {
            const starFill = '<i class="bi bi-star-fill"></i>';
            const starHalf = '<i class="bi bi-star-half"></i>';
            const star = '<i class="bi bi-star"></i>';
            let txtHTML = '';
            for (let i = 0; i <= 4; i++) {
                if (val - i >= 0.75) {
                    txtHTML += starFill;
                }
                else if (val - i > 0.25) {
                    txtHTML += starHalf;
                }
                else {
                    txtHTML += star;
                }
            }
            return txtHTML;
        },
        averageRating(reviews: any[]) {
            let data: any[] = reviews;
            let average = 0;
            if (data.length > 0) {
                let total = 0;
                data.forEach(e => {
                    total += e.rating;
                });
                average = total / data.length;
            }
            return average;
        },
        rupiah(number: number | bigint) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },
    computed: {
        ...mapState(useAdminAuthStore, ['adminData']),
        ...mapState(useAdminAdminStore, ['admins'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchAdmins();
    },
}
</script>