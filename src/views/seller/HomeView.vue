<template>
    <div class="flex-1 flex align-middle justify-center content-center flex-wrap" v-if="products && sellerData">
        <div v-if="sellerData.subscriber"
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>{{ sellerData.subscriber.length }}</h1>
            <h1>Pelanggan</h1>
        </div>
        <div v-if="products.data"
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>{{ products.data.length }}</h1>
            <h1>Produk</h1>
        </div>
        <div
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>0</h1>
            <h1>Pendapatan Bulan ini</h1>
        </div>
        <div
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>0</h1>
            <h1>Terjual Bulan ini</h1>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useSellerAuthStore } from "@/stores/sellerAuth";
import { useSellerProductStore } from "@/stores/sellerProduct";

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useSellerAuthStore, ['getProfile']),
        ...mapActions(useSellerProductStore, ['fetchProducts'])
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