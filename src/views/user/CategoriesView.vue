<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">Kategori</h1>
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

            <div class="flex flex-wrap justify-center m-4">
                <div class="m-3" v-for="category in getCategories">
                    <RouterLink :to="{ name: 'user.productByCategory', params: { name: category.name } }">
                        <CategoryCard :category="category"></CategoryCard>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import CategoryCard from "@/components/user/CategoryCard.vue";
import { useUserCategoryStore } from "@/stores/userCategory";

export default {
    data(vm) {
        return {
            searchTxt: ''
        }
    },
    components: {
        CategoryCard,
        RouterLink
    },
    methods: {
        ...mapActions(useUserCategoryStore, ['fetchCategories']),
    },
    computed: {
        ...mapState(useUserCategoryStore, ['categories']),
        getCategories() {
            return (this.categories?.data ?? []).filter((e: any) => {
                return (e.name as string).toLowerCase().includes(this.searchTxt.toLowerCase());
            });
        }
    },
    async mounted() {
        await this.fetchCategories();
    }
}
</script>
