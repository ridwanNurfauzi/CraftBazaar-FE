<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="adminData && category">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Detail Kategori</h1>
        </div>

        <div class="m-4" v-if="category.data">
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                    Nama Kategori
                </label>
                <input type="text" :value="category.data.name" id="name" name="name" placeholder="Nama kategori . ."
                    readonly
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div class="mb-5">
                <label for="totalProducts" class="block mb-2 text-sm font-medium text-gray-900">
                    Jumlah Produk
                </label>
                <input type="text" id="totalProducts" name="totalProducts" placeholder="Jumlah produk pada kategori . ."
                    :value="category.data.product_categories.length" readonly
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div class="mb-5">
                <label for="createdAt" class="block mb-2 text-sm font-medium text-gray-900">
                    Dibuat Pada
                </label>
                <input type="text" id="createdAt" name="createdAt" placeholder="Dibuat Pada . ."
                    :value="!!category.data.createdAt ? new Date(category.data.createdAt).toLocaleString('id-ID') : ''"
                    readonly
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div class="mb-5">
                <label for="updatedAt" class="block mb-2 text-sm font-medium text-gray-900">
                    Terakhir diubah
                </label>
                <input type="text" id="updatedAt" name="updatedAt" placeholder="Terakhir diubah . ."
                    :value="(!category.data.updatedAt || category.data.updatedAt != category.data.createdAt) ? new Date(category.data.updatedAt).toLocaleString('id-ID') : 'Belum diubah'"
                    readonly
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div class="mb-10">
                <button type="button"
                    @click="$router.push({ name: 'admin.categoriesEdit', params: { id: $route.params.id } })"
                    class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Ubah Kategori
                </button>
                <button type="button" @click="performDeleteCategory($route.params.id)"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Hapus
                </button>
            </div>
        </div>

        <div v-else>
            <h1 class="font-medium text-center mt-40">kategori tidak ditemukan</h1>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useAdminAuthStore } from "@/stores/adminAuth";
import { useAdminCategoryStore } from "@/stores/adminCategory";
import { useConfigStore } from "@/stores/_config";
import { initFlowbite, initDropdowns } from "flowbite";
import $ from "jquery";
import Swal from 'sweetalert2';

export default {
    components: {
        RouterLink
    },
    methods: {
        $,
        ...mapActions(useAdminAuthStore, ['getProfile']),
        ...mapActions(useAdminCategoryStore, ['fetchCategoryById', 'deleteCategory']),
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
                await this.$router.push({ name: 'admin.categories' });
            }
        },
    },
    computed: {
        ...mapState(useAdminAuthStore, ['adminData']),
        ...mapState(useAdminCategoryStore, ['category']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchCategoryById(this.$route.params.id);

        initFlowbite();
        initDropdowns();
    },
}
</script>