<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">Produk</h1>
            </div>
            <div class="flex mx-4">
                <div class="ms-auto">
                    <div>
                        <select v-model="sortMenu" id="sortMenu" @change="changeSortMenu()"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="latest">Terbaru</option>
                            <option value="popular">Terpopuler</option>
                            <option value="earliest">Terlama</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap m-4">
                <RouterLink v-for="product in products?.data ?? []"
                    :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                    <div class="m-3">
                        <ProductCard :product="product"></ProductCard>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useUserProductStore } from "@/stores/userProduct";
import ProductCard from "@/components/user/ProductCard.vue";

export default {
    data(vm) {
        return {
            sortMenu: 'latest'
        }
    },
    components: {
        ProductCard,
        RouterLink
    },
    methods: {
        ...mapActions(useUserProductStore, ['fetchProducts', 'fetchLatestProducts', 'fetchEarliestProducts', 'fetchPopularProducts']),
        async changeSortMenu() {
            switch (this.sortMenu) {
                case 'latest':
                    await this.fetchLatestProducts();
                    break;
                case 'popular':
                    await this.fetchPopularProducts();
                    break;
                case 'earliest':
                    await this.fetchEarliestProducts();
                    break;

                default:
                    await this.fetchProducts();
                    break;
            }
        }
    },
    computed: {
        ...mapState(useUserProductStore, ['products', 'latestProducts', 'earliestProducts', 'popularProducts']),
    },
    async mounted() {
        await this.changeSortMenu();
    },
}
</script>
