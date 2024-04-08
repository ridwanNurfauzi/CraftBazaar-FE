<template>
    <div class="flex-1 flex flex-col" v-if="seller?.data">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="mx-4 md:mx-16 my-3">
                <div class="hidden md:grid md:grid-cols-2">
                    <div class="md:col-span-1">
                        <div
                            class="mx-auto rounded-full h-44 w-44 bg-gray-400 shadow-lg bg-[url('/images/person.png')] bg-cover bg-center overflow-hidden">
                            <div class="w-full h-full bg-opacity-45 bg-white">
                                <div class="w-full h-full bg-cover bg-center">
                                    <img v-if="!!seller.data?.photo"
                                        :src="`${API_URL}/public/images/profiles/seller/${seller.data?.photo}`"
                                        class="min-h-full min-w-full object-cover bg-gray-400" alt="Profile photo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-1">
                        <div class="flex my-2">
                            <h1 class="font-medium text-xl pe-7">
                                {{ seller.data.name }}
                            </h1>
                            <div>
                                <button v-if="seller.data.subscribed" @click="performSubscribe(seller.data?.id ?? 0)"
                                    class="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                                    Batalkan langganan
                                </button>
                                <button v-else @click="performSubscribe(seller.data?.id ?? 0)"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2">
                                    Jadikan Langganan
                                </button>
                            </div>
                        </div>
                        <div class="flex my-4">
                            <h1 class="me-14 font-medium">
                                {{ seller.data.subscribers?.length }}
                                pelanggan
                            </h1>
                            <h1 class="me-14 font-medium">
                                {{ seller.data.products?.length }}
                                produk
                            </h1>
                        </div>
                        <div>
                            <h1>{{ seller.data.email }}</h1>
                        </div>
                    </div>
                </div>


                <div class="md:hidden">
                    <div>
                        <div
                            class="mx-auto rounded-full h-44 w-44 bg-gray-400 shadow-lg bg-[url('/images/person.png')] bg-cover bg-center overflow-hidden">
                            <div class="w-full h-full bg-opacity-45 bg-white">
                                <div class="w-full h-full bg-cover bg-center">
                                    <img v-if="!!seller.data?.photo"
                                        :src="`${API_URL}/public/images/profiles/seller/${seller.data?.photo}`"
                                        class="min-h-full min-w-full object-cover bg-gray-400" alt="Profile photo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-4">
                        <h1 class="font-medium text-xl text-center">{{ seller.data.name }}</h1>
                        <h1 class="text-center">{{ seller.data.email }}</h1>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <button v-if="seller.data.subscribed" @click="performSubscribe(seller.data?.id ?? 0)"
                            class="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            Batalkan langganan
                        </button>
                        <button v-else @click="performSubscribe(seller.data?.id ?? 0)"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2">
                            Jadikan Langganan
                        </button>
                    </div>
                    <div class="p-4 border-t border-b flex flex-wrap justify-around">
                        <h1 class="me-14 font-medium">
                            {{ seller.data.subscribers?.length }}
                            pelanggan
                        </h1>
                        <h1 class="me-14 font-medium">
                            {{ seller.data.products?.length }}
                            produk
                        </h1>
                    </div>
                </div>
            </div>

            <div class="mx-4">
                <div class="mb-4 border-b border-gray-200">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center justify-center" id="default-tab"
                        data-tabs-toggle="#default-tab-content" role="tablist">
                        <li class="me-2" role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="product-tab"
                                data-tabs-target="#product" type="button" role="tab" aria-controls="product"
                                aria-selected="false">Produk</button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                                id="description-tab" data-tabs-target="#description" type="button" role="tab"
                                aria-controls="description" aria-selected="false">Deskripsi</button>
                        </li>
                    </ul>
                </div>
                <div id="default-tab-content">
                    <div class="hidden rounded-lg bg-gray-50" id="product" role="tabpanel"
                        aria-labelledby="product-tab">
                        <div class="flex flex-wrap justify-center">
                            <div class="m-2" v-for="product in seller.data.products ?? []">
                                <RouterLink :to="{ name: 'user.productBySlug', params: { slug: product.slug } }">
                                    <ProductCard :product="product"></ProductCard>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden px-4 rounded-lg bg-gray-50" id="description" role="tabpanel"
                        aria-labelledby="description-tab">
                        <p>
                            {{ seller.data.description }}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="flex-1 flex flex-col" v-else>
        <div class="w-full xl:max-w-7xl xl:mx-auto flex-1 flex">
            <div class="m-auto font-medium text-xl">
                Penjual tidak ditemukan
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserSellerStore } from "@/stores/userSeller";
import { useUserAuthStore } from "@/stores/userAuth";
import { useConfigStore } from "@/stores/_config";
import { mapState, mapActions } from "pinia";
import { initFlowbite, initTabs } from "flowbite"
import ProductCard from "@/components/user/ProductCard.vue";
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

export default {
    components: {
        ProductCard,
        RouterLink
    },
    computed: {
        ...mapState(useUserSellerStore, ['seller']),
        ...mapState(useUserAuthStore, ['loggedIn']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    methods: {
        ...mapActions(useUserSellerStore, ['fetchSellerByCode', 'subscribe']),
        ...mapActions(useUserAuthStore, ['getProfile']),
        async performSubscribe(seller_id: any) {
            if (this.loggedIn)
                await this.subscribe(seller_id).then(async e => {
                    if (e) {
                        await this.fetchSellerByCode(this.$route.params.code)
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Mohon maaf',
                            text: 'Terjadi kesalahan'
                        });
                    }
                });
            else {
                await Swal.fire({
                    title: 'Mohon maaf!',
                    text: 'Anda harus login terlebih dahulu.',
                    icon: 'warning'
                });
                await this.$router.push({ name: 'user.login' });
            }
        }
    },
    async mounted() {
        await this.fetchSellerByCode(this.$route.params.code);
        await this.getProfile();
        initFlowbite();
        initTabs();
    },
}
</script>
