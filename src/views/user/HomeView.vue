<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="w-full bg-[url('/images/main-bg.jpg')] bg-cover bg-center">
                <div
                    class="w-full h-[80vh] bg-gradient-to-b from-[#fff3] via-[#F9FAFBea] to-gray-50 sm:bg-gradient-to-r sm:from-[#fff3] sm:via-[#F9FAFBd9] sm:to-gray-50">
                    <div class="w-full h-full flex flex-row">
                        <div class="sm:m-auto"></div>
                        <div class="mt-auto my-auto mx-auto sm:m-auto">
                            <h1 class="my-4 font-bold text-3xl text-slate-800 text-center sm:text-left">CraftBazaar</h1>
                            <p class="text-slate-700 my-4 text-center sm:text-left">
                                Temukan kerajinan-kerajinan tangan yang menarik.
                            </p>
                            <p class="text-center sm:text-left" v-if="!loggedIn">
                                <button id="dropdownStartButton" data-dropdown-toggle="startDropdown"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                                    type="button">
                                    Masuk
                                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <!-- Dropdown start menu -->
                            <div id="startDropdown"
                                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownStartButton">
                                    <li>
                                        <RouterLink :to="{ name: 'user.login' }">
                                            <span class="block px-4 py-2 hover:bg-gray-100">
                                                Sebagai pembeli
                                            </span>
                                        </RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink :to="{ name: 'seller.login' }">
                                            <span class="block px-4 py-2 hover:bg-gray-100">
                                                Sebagai penjual
                                            </span>
                                        </RouterLink>
                                    </li>
                                </ul>
                            </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full bg-gray-50 p-4">
                <div class="w-full my-2" v-if="loggedIn">
                    <div class="font-semibold my-2 flex flex-row">
                        <div>
                            Produk Langganan
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto flex flex-row">
                        <div v-if="loggedIn && productsFromSubscriptions">
                            <div class="mx-auto flex flex-row py-2" v-if="productsFromSubscriptions.data?.length > 0">
                                <div class="mx-3" v-for="product in productsFromSubscriptions.data">
                                    <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                                        <ProductCard :product="product"></ProductCard>
                                    </RouterLink>
                                </div>
                            </div>
                            <div class="w-full overflow-x-auto " v-else>
                                <div class="mx-auto">
                                    <h1 class="font-semibold text-slate-700 text-xl">Anda Belum memiliki langganan</h1>
                                </div>
                            </div>
                        </div>
                        <div class="w-full overflow-x-auto flex flex-row" v-else>
                            <div class="mx-auto">
                                <h1 class="font-semibold text-slate-700 text-xl">Anda Belum memiliki langganan</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full bg-gray-50 p-4">
                <div class="w-full my-2">
                    <div class="font-semibold my-2 flex flex-row">
                        <div>
                            Terbaru
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto flex flex-row">
                        <div class="mx-auto flex flex-row py-2" v-if="!!latestProducts?.data">
                            <div class="mx-3" v-for="product in latestProducts?.data ?? []">
                                <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                                    <ProductCard :product="product"></ProductCard>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full bg-gray-50 p-4">
                <div class="w-full my-2">
                    <div class="font-semibold my-2 flex flex-row">
                        <div>
                            Terpopuler
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto flex flex-row">
                        <div class="mx-auto flex flex-row p-2" v-if="!!popularProducts?.data">
                            <div class="mx-3" v-for="product in popularProducts?.data ?? []">
                                <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                                    <ProductCard :product="product"></ProductCard>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full bg-gray-50 p-4">
                <div class="w-full my-2">
                    <div class="font-semibold my-2 flex flex-row">
                        <div>
                            Temukan Pelaku Kerajinan
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto flex flex-row">
                        <div class="mx-auto flex flex-row my-2">
                            <div class="mx-3" v-if="sellers && sellers.data" v-for="seller in sellers.data">
                                <RouterLink :to="{ name: 'user.sellerByCode', params: { code: seller.code } }">
                                    <SellerCard :seller="seller"></SellerCard>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full bg-gray-50 p-4">
                <div class="w-full my-2">
                    <div class="font-semibold my-2 flex flex-row">
                        <div>
                            Kategori
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto flex flex-row">
                        <div class="mx-auto flex flex-row my-2">
                            <div class="mx-3" v-for="category in categories?.data ?? []">
                                <RouterLink :to="{ name: 'user.productByCategory', params: { name: category.name } }">
                                    <CategoryCard :category="category"></CategoryCard>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { initFlowbite, initDropdowns } from "flowbite"
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useConfigStore } from "@/stores/_config";
import ProductCard from "@/components/user/ProductCard.vue";
import CategoryCard from "@/components/user/CategoryCard.vue";
import SellerCard from "@/components/user/SellerCard.vue";
import { useUserAuthStore } from "@/stores/userAuth";
import { useUserProductStore } from "@/stores/userProduct";
import { useUserSellerStore } from "@/stores/userSeller";
import { useUserCategoryStore } from "@/stores/userCategory";

export default {
    components: {
        ProductCard,
        CategoryCard,
        SellerCard,
        RouterLink
    },
    methods: {
        ...mapActions(useUserProductStore, ['fetchProducts', 'fetchLatestProducts', 'fetchEarliestProducts', 'fetchPopularProducts', 'fetchProductsFromSubscriptions']),
        ...mapActions(useUserCategoryStore, ['fetchCategories']),
        ...mapActions(useUserSellerStore, ['fetchSellers']),
        ...mapActions(useUserAuthStore, ['getProfile'])
    },
    computed: {
        ...mapState(useUserProductStore, ['products', 'latestProducts', 'earliestProducts', 'popularProducts', 'productsFromSubscriptions']),
        ...mapState(useUserSellerStore, ['sellers']),
        ...mapState(useUserCategoryStore, ['categories']),
        ...mapState(useUserAuthStore, ['userData', 'loggedIn']),

        ...mapState(useConfigStore, ['API_URL']),
    },
    async mounted() {
        initFlowbite();
        initDropdowns();

        await this.getProfile();
        await this.fetchProducts();
        await this.fetchLatestProducts();
        await this.fetchEarliestProducts();
        await this.fetchPopularProducts();
        await this.fetchCategories();
        await this.fetchSellers();
        if (!!this.$cookies.get('userToken'))
            await this.fetchProductsFromSubscriptions();
    }
}
</script>
