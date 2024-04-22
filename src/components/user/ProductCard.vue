<template>
    <div
        class="w-40 h-72 border bg-gray-50 rounded-lg group overflow-hidden transition-all flex flex-col hover:shadow-md">
        <div class="w-40 h-40 transition-all overflow-hidden">
            <img :src="`${API_URL}/public/images/products/${product?.product_images[0]?.filename ?? '/images/image.png'}`"
                class="w-full h-full bg-gray-200 object-cover group-hover:scale-[1.2] group-hover:opacity-80 transition-all"
                alt="img">
        </div>
        <div class="px-2">
            <h1 class="font-medium text-ellipsis text-nowrap text-gray-800 overflow-hidden">
                {{ product?.name ?? '' }}
            </h1>
        </div>
        <div class="px-2">
            <span class="text-sm text-gray-500 text-ellipsis overflow-hidden text-nowrap">
                {{ product?.seller?.name ?? '' }}
            </span>
        </div>
        <div class="px-2 text-sm" v-if="product?.reviews">
            <span class="text-yellow-400 group-hover:text-yellow-300 transition-all" v-html="rateToStar(averageRating)">
            </span>
            <span class="text-gray-700 mx-2">
                {{ averageRating.toFixed(2) }}
            </span>
        </div>
        <div class="px-2">
            <span class="text-gray-800 font-medium">
                {{ rupiah(product?.price).replace(',00', '') }}
            </span>
        </div>
        <div class="px-2">
            <span class="text-gray-700 text-sm">
                Stok: {{ product?.stock ?? 0 }}
            </span>
        </div>
        <div class="px-2">
            <span class="text-gray-700 text-sm">
                Terjual: {{ product?.sold ?? 0 }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useConfigStore } from "@/stores/_config";

export default {
    data(vm) {
        return {
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
        }
    },
    props: ['product'],
    methods: {
        rupiah(number: number | bigint) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },
    computed: {
        ...mapState(useConfigStore, ['API_URL']),
        averageRating() {
            let data: any[] = JSON.parse(JSON.stringify(this.product?.reviews))
            let average = 0;
            if (data.length > 0) {
                let total = 0;
                data.forEach(e => {
                    total += e.rating;
                });
                average = total / data.length;
            }
            return average;
        }
    }
}
</script>