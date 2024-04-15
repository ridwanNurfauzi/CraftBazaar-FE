<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="categories && adminData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Kategori</h1>
        </div>
        <div class="my-4 mx-auto">
            <RouterLink
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                :to="{ name: 'admin.categoriesAdd' }">
                <i class="bi bi-plus"></i>
                Tambah Kategori
            </RouterLink>
        </div>
        <div class="m-4 w-full overflow-auto">
            <div class="overflow-x-auto" v-if="categories.data">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nama Kategori
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Jumlah Produk
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
                    <tbody v-if="categories.data.length > 0">
                        <tr class="bg-white border-b" v-for="category in categories.data">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ category.name }}
                            </th>

                            <td class="px-6 py-4">
                                <span v-if="category.product_categories">
                                    {{ category.product_categories.length }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                {{ !!category.createdAt ? new Date(category.createdAt).toLocaleDateString('id-ID') : ''
                                }}
                            </td>
                            <td class="px-6 py-4">
                                {{ (!category.updatedAt || category.updatedAt != category.createdAt) ?
        new Date(category.updatedAt).toLocaleDateString('id-ID') : 'Belum diubah' }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex">
                                    <button type="button"
                                        @click="$router.push({ name: 'admin.categoriesShow', params: { id: category.id } })"
                                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Lihat
                                    </button>
                                    <button type="button"
                                        @click="$router.push({ name: 'admin.categoriesEdit', params: { id: category.id } })"
                                        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Ubah
                                    </button>
                                    <button type="button" @click="performDeleteCategory(category.id)"
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
import { useAdminCategoryStore } from "@/stores/adminCategory";
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
        ...mapActions(useAdminCategoryStore, ['fetchCategories', 'deleteCategory']),
        async performDeleteCategory(id: any) {
            const response = await Swal.fire({
                icon: 'question',
                text: 'Apakah anda yakin ingin menghapus kategori ini.',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#67f'
            });
            if (response.isConfirmed) {
                const data = await this.deleteCategory(id);
                if (data.success)
                    await Swal.fire({
                        icon: 'success',
                        text: 'Berhasil menghapus kategori.'
                    });
                else
                    await Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan.'
                    });
                await this.fetchCategories();
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
        ...mapState(useAdminCategoryStore, ['categories'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchCategories();
    },
}
</script>