<template>
    <div class="flex-1 flex flex-col">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">
                    Kategori {{ $route.params.name ?? '' }}
                </h1>
            </div>
            <div v-if="products?.data" class="flex flex-wrap justify-center m-4">
                {{ products?.data }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useUserCategoryStore } from "@/stores/userCategory";

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useUserCategoryStore, ['fetchProductsByCategories']),
    },
    computed: {
        ...mapState(useUserCategoryStore, ['products']),
    },
    async mounted() {
        await this.fetchProductsByCategories(this.$route.params.name.toString() ?? '');
    }
}
</script>
