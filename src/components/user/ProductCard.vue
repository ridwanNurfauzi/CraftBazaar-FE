<template>
    <div
        class="w-40 h-72 border bg-gray-50 rounded-lg group overflow-hidden transition-all flex flex-col hover:shadow-md">
        <div class="w-40 h-40 transition-all overflow-hidden">
            <img :src="`/images/image.png`"
                class="w-full h-full bg-gray-200 object-cover group-hover:scale-[1.2] opacity-35 group-hover:opacity-20 transition-all"
                alt="img">
        </div>
        <div class="px-2">
            <h1 class="font-medium text-lg text-ellipsis text-nowrap text-gray-800 overflow-hidden">
                Ini judul 23456
                120121029021920
                7890
            </h1>
        </div>
        <div class="px-2">
            <span class="text-sm text-gray-500">Ini Nama seller</span>
        </div>
        <div class="px-2 text-sm">
            <span class="text-yellow-400 group-hover:text-yellow-300 transition-all">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
                <i class="bi bi-star"></i>
            </span>
            <span class="text-gray-700">
                3.5
            </span>
        </div>
        <div class="px-2">
            <span class="text-gray-800 font-medium">
                Rp. 12.000
            </span>
        </div>
        <div class="px-2">
            <span class="text-gray-700 text-sm">
                Stok: 7
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useConfigStore } from "@/stores/_config";

export default {
}
</script>