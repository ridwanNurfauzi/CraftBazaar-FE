<template>
    <div class="w-80 h-32 grid grid-cols-11 bg-gray-50 rounded-lg group overflow-hidden transition-all hover:shadow-md"
        :class="{
            'border': !product.cart.selected,
            'border-2': product.cart.selected,
            'border-blue-400': product.cart.selected,
        }">
        <div class="col-span-1 flex flex-col justify-center">
            <input type="checkbox" class="mx-auto" :name="`${product.name}_select`" :id="`${product.name}_select`"
                :checked="product.cart.selected" @change="performSelectCartProduct(product.id)">
        </div>
        <div class="col-span-4 overflow-hidden">
            <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                <img :src="`${API_URL}/public/images/products/${product.product_images[0].filename}`"
                    class="w-full h-full object-cover object-center group-hover:opacity-75 transition-all" alt="">
            </RouterLink>
        </div>
        <div class="col-span-5 flex flex-col justify-evenly">
            <div class="px-2">
                <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                    <h1 class="font-medium text-ellipsis text-nowrap hover:underline text-gray-800 overflow-hidden">
                        {{ product.name }}
                    </h1>
                </RouterLink>
            </div>
            <div class="px-2">
                <RouterLink :to="{ name: 'user.sellerByCode', params: { code: product.seller.code } }">
                    <h1 class="text-sm text-gray-500 hover:underline text-ellipsis overflow-hidden text-nowrap">
                        {{ product.seller.name }}
                    </h1>
                </RouterLink>
            </div>
            <div class="px-2">
                <h1 class="text-gray-800 font-medium text-ellipsis overflow-hidden text-nowrap">
                    {{ rupiah(product.price ?? 0).replace(',00', '') }}
                </h1>
            </div>
            <div class="flex px-2">
                <h1 class="me-2">Qty</h1>
                <button @click="performDecrementCartProduct(product.id)"
                    class="border w-8 text-center font-bold py-1 hover:text-blue-500 hover:bg-gray-100">
                    -
                </button>
                <input type="text" :name="`${product.name}_qty`" :id="`${product.name}_qty`" :value="product.cart.qty"
                    class="border p-1 w-10" readonly>
                <button @click="performIncrementCartProduct(product.id)"
                    class="border w-8 text-center font-bold py-1 hover:text-blue-500 hover:bg-gray-100">
                    +
                </button>
            </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center">
            <button @click="performDeleteProductCart(product.id)"
                class="mx-auto text-xl text-gray-700 hover:text-red-600" title="Hapus dari keranjang">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useConfigStore } from "@/stores/_config";
import { useUserCartStore } from "@/stores/userCart";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";

export default {
    components: {
        RouterLink
    },
    props: ['product'],
    methods: {
        ...mapActions(useUserCartStore, ['fetchCartProduct', 'deleteProductCart', 'incrementCartProduct', 'decrementCartProduct', 'selectCartProduct']),
        async performSelectCartProduct(product_id: any) {
            const response = await this.selectCartProduct(product_id);
            if (!response) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan'
                });
            }
            await this.fetchCartProduct();
        },
        async performDecrementCartProduct(product_id: any) {
            const response = await this.decrementCartProduct(product_id);
            if (!response) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan'
                });
            }
            await this.fetchCartProduct();
        },
        async performIncrementCartProduct(product_id: any) {
            const response = await this.incrementCartProduct(product_id);
            if (!response) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan'
                });
            }
            await this.fetchCartProduct();
        },
        async performDeleteProductCart(product_id: any) {
            const response = await this.deleteProductCart(product_id);
            if (!response) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan'
                });
            }
            await this.fetchCartProduct();
        },

        rupiah(number: number | bigint) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },
    computed: {
        ...mapState(useConfigStore, ['API_URL']),
        ...mapState(useUserCartStore, ['cartProducts'])
    },
    mounted() {
        this.fetchCartProduct();
    },
}
</script>