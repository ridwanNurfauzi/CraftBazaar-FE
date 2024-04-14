<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="products && sellerData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Produk</h1>
        </div>
        <div class="my-4 mx-auto">
            <RouterLink
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                :to="{ name: 'seller.productsAdd' }">
                <i class="bi bi-plus"></i>
                Tambah Produk
            </RouterLink>
        </div>
        <div class="m-4 w-full overflow-auto">
            <div class="overflow-x-auto" v-if="products.data">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nama Produk
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Kategori
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stok
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Harga
                            </th>
                            <th scope="col" class="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="products.data.length > 0">
                        <tr class="bg-white border-b" v-for="product in products.data">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ product.name }}
                            </th>
                            <td class="px-6 py-4">
                                <div class="flex flex-wrap overflow-auto">
                                    <span v-for="category in product.categories"
                                        class="bg-gray-200 text-gray-700 text-sm px-2 py-0.5 rounded me-2 mb-2 font-medium hover:bg-gray-400 transition-all">
                                        {{ category?.name }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex flex-wrap">
                                    <span class="text-yellow-400 hover:text-yellow-300 transition-all text-nowrap"
                                        v-html="rateToStar(averageRating(product.reviews))"></span>
                                    <span class="text-nowrap">
                                        {{ averageRating(product.reviews) }} /
                                        {{ product.reviews.length }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                {{ product.stock }}
                            </td>
                            <td class="px-6 py-4">
                                {{ rupiah(product.price) }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex">
                                    <button type="button"
                                        @click="$router.push({ name: 'seller.productsShow', params: { id: product.id } })"
                                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Lihat
                                    </button>
                                    <button type="button"
                                        @click="$router.push({ name: 'seller.productsEdit', params: { id: product.id } })"
                                        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Ubah
                                    </button>
                                    <button type="button" @click="performDeleteProduct(product.id)"
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
import { useSellerAuthStore } from "@/stores/sellerAuth";
import { useSellerProductStore } from "@/stores/sellerProduct";
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
        ...mapActions(useSellerAuthStore, ['getProfile']),
        ...mapActions(useSellerProductStore, ['fetchProducts', 'deleteProducts']),
        async performDeleteProduct(id: any) {
            const response = await Swal.fire({
                icon: 'question',
                text: 'Apakah anda yakin ingin menghapus produk ini.',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                confirmButtonText: 'Ya',
                confirmButtonColor: '#67f'
            });
            if (response.isConfirmed) {
                const data = await this.deleteProducts(id);
                if (data.success)
                    await Swal.fire({
                        icon: 'success',
                        text: 'Berhasil menghapus produk.'
                    });
                else
                    await Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan.'
                    });
                await this.fetchProducts();
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
        ...mapState(useSellerAuthStore, ['sellerData']),
        ...mapState(useSellerProductStore, ['products'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchProducts();
    },
}
</script>