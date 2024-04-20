<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="product && categories && sellerData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Detail Produk</h1>
        </div>

        <div class="mb-4 border-b border-gray-200">
            <ul class="flex flex-wrap justify-center -mb-px text-sm font-medium text-center" id="default-tab"
                data-tabs-toggle="#product-tab-content" role="tablist">
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" id="product-tab"
                        data-tabs-target="#product" type="button" role="tab" aria-controls="product"
                        aria-selected="false">Produk</button>
                </li>
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                        id="reviews-tab" data-tabs-target="#reviews" type="button" role="tab" aria-controls="reviews"
                        aria-selected="false">Ulasan</button>
                </li>
            </ul>
        </div>

        <div id="default-tab-content">
            <div class="hidden rounded-lg bg-gray-50" id="product" role="tabpanel" aria-labelledby="product-tab">
                <div v-if="product.data">
                    <div class="m-4" v-if="categories.data">
                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                                Nama Produk
                            </label>
                            <input type="text" :value="product.data.name" id="name" name="name"
                                placeholder="Nama produk . ." readonly
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>

                        <div class="mb-5" v-if="categories">
                            <label class="block mb-2 text-sm font-medium text-gray-900">
                                Gambar Produk
                            </label>

                            <div
                                class="bg-gray-50 border border-gray-300 h-44 flex justify-start align-top content-start flex-wrap overflow-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
                                <span v-for="(pImg) in product.data.product_images"
                                    class="bg-gray-200 overflow-hidden text-sm rounded m-1 font-medium hover:bg-gray-400 transition-all">
                                    <div class="overflow-hidden">
                                        <a :href="`${API_URL}/public/images/products/${pImg.filename}`" target="_blank">
                                            <img :src="`${API_URL}/public/images/products/${pImg.filename}`"
                                                class="aspect-square w-32 shrink-0 object-cover hover:scale-125 hover:opacity-75 transition-all"
                                                :alt="pImg.filename ?? ''">
                                        </a>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div class="mb-5" v-if="categories">
                            <p class="block mb-2 text-sm font-medium text-gray-900">
                                Kategori
                            </p>
                            <div class="flex flex-wrap overflow-auto">
                                <span v-for="category in product.data.categories"
                                    class="bg-gray-200 text-gray-700 text-sm px-2 py-0.5 rounded me-2 mb-2 font-medium hover:bg-gray-400 transition-all">
                                    {{ category.name }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-5">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900">
                                Deskripsi
                            </label>
                            <textarea name="description" id="description" cols="30" rows="7"
                                placeholder="Deskripsi produk . ." readonly
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">{{
        product.data.description ?? ''
    }}</textarea>
                        </div>
                        <div class="mb-5">
                            <label for="stock" class="block mb-2 text-sm font-medium text-gray-900">
                                Stok
                            </label>
                            <input type="text" readonly :value="product.data.stock" id="stock" name="stock" min="0"
                                placeholder="Jumlah stok produk . ."
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div class="mb-5">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">
                                Harga
                            </label>
                            <input :value="rupiah(product.data.price)" type="text" id="price" name="price"
                                placeholder="Harga produk . ." readonly
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div class="mb-5">
                            <label for="weight" class="block mb-2 text-sm font-medium text-gray-900">
                                Berat
                            </label>
                            <input type="text" readonly :value="product.data.weight + ' g'" id="weight" name="weight"
                                min="1" placeholder="Berat produk dalam gram"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div class="mb-5">
                            <label for="sold" class="block mb-2 text-sm font-medium text-gray-900">
                                Terjual
                            </label>
                            <input type="text" readonly :value="product.data.sold" id="sold" name="sold" min="1"
                                placeholder="Berat produk dalam gram"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div class="mb-10">
                            <button type="button"
                                @click="$router.push({ name: 'seller.productsEdit', params: { id: $route.params.id } })"
                                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                Ubah Produk
                            </button>
                            <button type="button" @click="performDeleteProduct($route.params.id)"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden rounded-lg bg-gray-50" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                <div v-if="product.data.reviews">
                    <div>
                        <div class="flex flex-wrap justify-center text-xl">
                            <span class="text-yellow-400 hover:text-yellow-300 transition-all"
                                v-html="rateToStar(averageRating(product.data.reviews))"></span>
                            <div class="text-slate-700 mx-3">
                                <span>
                                    {{ averageRating(product.data.reviews).toFixed(2) }}
                                </span>
                                <span>
                                    /
                                </span>
                                <span>
                                    {{ product?.data?.reviews.length ?? 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="product.data">

                        <div v-show="product.data.reviews.length"
                            class="px-3 py-1 rounded-xl border hover:shadow-lg flex flex-col my-4"
                            v-for="review in product.data.reviews">
                            <div class="w-full flex justify-start">
                                <div class="min-w-[3.5rem]">
                                    <span>
                                        <img v-if="!!review.user.photo"
                                            :src="`${API_URL}/public/images/profiles/user/${review.user.photo}`"
                                            class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                            alt="profile">
                                        <img v-else src="/images/person.png"
                                            class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                            alt="profile">
                                    </span>
                                </div>
                                <div>
                                    <div class="overflow-auto">
                                        <h1 class="font-medium text-gray-800 overflow-hidden">
                                            {{ review.user.firstname }}
                                            {{ review.user.lastname }}
                                        </h1>
                                    </div>
                                    <div class="text-sm text-slate-700">
                                        {{
        !!review.createdAt ?
            (
                new Date(review.createdAt).getFullYear() +
                '-' +
                (new Date(review.createdAt).getMonth() + 1) +
                '-' +
                new Date(review.createdAt).getDate()
                                        )
                                        : ''
                                        }}
                                    </div>
                                    <div>
                                        <span class="text-yellow-400 text-sm hover:text-yellow-300 transition-all"
                                            v-html="rateToStar(review.rating)">
                                        </span>
                                    </div>
                                    <div>
                                        <p>
                                            {{ review.text }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useSellerAuthStore } from "@/stores/sellerAuth";
import { useSellerCategoryStore } from "@/stores/sellerCategory";
import { useSellerProductStore } from "@/stores/sellerProduct";
import { useConfigStore } from "@/stores/_config";
import { initFlowbite, initDropdowns } from "flowbite";
import $ from "jquery";
import Swal from 'sweetalert2';

export default {
    components: {
        RouterLink
    },
    data(_vm) {
        return {};
    },
    methods: {
        $,
        ...mapActions(useSellerAuthStore, ['getProfile']),
        ...mapActions(useSellerCategoryStore, ['fetchCategories']),
        ...mapActions(useSellerProductStore, ['fetchProductById', 'deleteProducts', 'fetchProducts']),
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
                if (data.success) {
                    await Swal.fire({
                        icon: 'success',
                        text: 'Berhasil menghapus produk.'
                    });
                    this.$router.push({ name: 'seller.products' });
                }
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
        ...mapState(useSellerCategoryStore, ['categories']),
        ...mapState(useSellerProductStore, ['product']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchCategories();
        await this.fetchProductById(this.$route.params.id);

        initDropdowns();
        initFlowbite();
    },
}
</script>