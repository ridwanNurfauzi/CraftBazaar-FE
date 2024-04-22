<template>
    <div
        class="w-40 h-56 border bg-gray-50 rounded-lg group overflow-hidden transition-all flex flex-col hover:shadow-md">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="w-full h-40 flex">
                <div class="w-32 h-32 rounded-full bg-white m-auto border overflow-hidden">
                    <img src="/images/person.png" v-if="!seller.photo"
                        class="w-full h-full object-cover object-center bg-gray-500 opacity-80 group-hover:opacity-70 group-hover:scale-110 transition-all"
                        alt="Tidak ada foto profil.">
                    <img :src="`${API_URL}/public/images/profiles/seller/${seller.photo}`" v-else
                        class="w-full h-full object-cover object-center group-hover:opacity-75 group-hover:scale-110 transition-all"
                        alt="Foto profil.">
                </div>
            </div>
            <div>
                <h1
                    class="text-center font-medium text-ellipsis text-nowrap text-gray-800 group-hover:text-gray-600 transition-all overflow-hidden">
                    {{ seller.name ?? '' }}
                </h1>
            </div>
            <div class="mx-4 my-1">
                <p class="text-sm">
                    {{ seller?.subscriptions?.length ?? 0 }} Pelanggan
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useConfigStore } from "@/stores/_config";
import { mapState } from "pinia";

export default {
    props: ['seller'],
    computed: {
        ...mapState(useConfigStore, ['API_URL'])
    }
}
</script>