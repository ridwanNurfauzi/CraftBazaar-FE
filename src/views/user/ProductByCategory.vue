<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">
                    Kategori {{ $route.params.name ?? '' }}
                </h1>
            </div>

            <div class="flex mx-4">
                <div class="ms-auto flex">
                    <div class="relative me-2">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i class="bi bi-search text-gray-500"></i>
                        </div>
                        <input type="text" id="simple-search" v-model="searchTxt"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="Cari . . ." />
                    </div>
                </div>
            </div>

            <div v-if="products?.data" class="flex flex-wrap justify-center m-4">
                <RouterLink v-for="data in getProducts"
                    :to="{ name: 'user.productBySlug', params: { slug: data.product?.slug ?? '' } }">
                    <div class="m-3">
                        <ProductCard :product="data.product"></ProductCard>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useUserCategoryStore } from "@/stores/userCategory";
import ProductCard from "@/components/user/ProductCard.vue";

export default {
    data(vm) {
        return {
            searchTxt: ''
        }
    },
    components: {
        RouterLink,
        ProductCard
    },
    methods: {
        ...mapActions(useUserCategoryStore, ['fetchProductsByCategories']),
    },
    computed: {
        ...mapState(useUserCategoryStore, ['products']),
        getProducts() {
            return (this.products?.data?.product_categories ?? []).filter((e: any) => {
                return (
                    (e.product?.name as string).toLowerCase().includes(this.searchTxt.toLowerCase()) ||
                    (e.product?.seller.name as string).toLowerCase().includes(this.searchTxt.toLowerCase())
                )
            }
            );
        }
    },
    async mounted() {
        await this.fetchProductsByCategories(this.$route.params.name.toString() ?? '');
    }
}
</script>
