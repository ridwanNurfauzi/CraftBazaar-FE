<template>
    <div class="flex-1 flex flex-col" v-if="cartProducts">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center text-lg font-medium">Keranjang</h1>
            </div>
            <div class="m-4">
                Produk terpilih : {{ (cartProducts?.data ?? []).filter((e: any) => e.cart.selected).length }}
            </div>
            <div class="flex flex-wrap justify-center m-4">
                <div class="m-3" v-if="(cartProducts?.data ?? []).length > 0"
                    v-for="product in cartProducts?.data ?? []">
                    <CartProductCard :product="product"></CartProductCard>
                </div>
                <div class="mx-auto mt-10" v-else>
                    <h1>Tidak ada produk di keranjang.</h1>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useUserCartStore } from "@/stores/userCart";
import CartProductCard from "@/components/user/CartProductCard.vue";

export default {
    components: {
        CartProductCard,
        RouterLink
    },
    methods: {
        ...mapActions(useUserCartStore, ['fetchCartProduct'])
    },
    computed: {
        ...mapState(useUserCartStore, ['cartProducts'])
    },
    async mounted() {
        await this.fetchCartProduct();
    },
}
</script>
