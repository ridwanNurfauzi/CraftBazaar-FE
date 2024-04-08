<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">Kategori</h1>
            </div>
            <div class="flex flex-wrap justify-center m-4">
                <div class="m-3" v-for="category in categories?.data ?? []">
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
    components: {
        CategoryCard,
        RouterLink
    },
    methods: {
        ...mapActions(useUserCategoryStore, ['fetchCategories']),
    },
    computed: {
        ...mapState(useUserCategoryStore, ['categories']),
    },
    async mounted() {
        await this.fetchCategories();
    }
}
</script>
