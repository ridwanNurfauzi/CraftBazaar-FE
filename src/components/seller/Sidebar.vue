<template>
    <div v-if="sellerData">
        <nav class="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div class="px-3 py-3 lg:px-5 lg:pl-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar" type="button"
                            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                                </path>
                            </svg>
                        </button>
                        <a href="#" class="flex ms-2 md:me-16">
                            <img src="/favicon.ico" class="h-8 me-3" alt="CraftBazaar" />
                            <span class="self-center text-xl font-semibold whitespace-nowrap me-2">CraftBazaar</span>
                            <span class="self-center text-sm font-normal text-slate-700 whitespace-nowrap">Seller</span>
                        </a>
                    </div>
                    <div class="flex items-center">
                        <div class="flex items-center ms-3">
                            <button id="dropdownProfileButton" data-dropdown-toggle="profileDropdown"
                                class="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center inline-flex items-center overflow-hidden"
                                type="button">
                                <img :src="`${API_URL}/public/images/profiles/seller/${sellerData.photo}`"
                                    class="opacity-85 object-cover w-8 h-8" alt="profile" v-if="!!sellerData.photo">
                                <img src="/images/person.png" class="opacity-85 object-cover w-8 h-8" alt="profile"
                                    v-else>
                            </button>

                            <!-- Dropdown menu -->
                            <div id="profileDropdown"
                                class="z-10 hidden border bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownProfileButton">
                                    <li>
                                        <h1
                                            class="overflow-hidden text-ellipsis text-nowrap font-normal mb-1 mx-4 text-gray-900">
                                            {{ sellerData.name }}
                                        </h1>
                                        <h1
                                            class="overflow-hidden text-ellipsis text-nowrap font-semibold mb-1 mx-4 text-gray-900">
                                            {{ sellerData.email }}
                                        </h1>
                                    </li>
                                    <hr>
                                    <li>
                                        <RouterLink :to="{ name: 'seller.profile' }"
                                            class="block px-4 py-2 hover:bg-gray-100">
                                            Profil
                                        </RouterLink>
                                    </li>
                                    <hr>
                                    <li>
                                        <button @click="performLogout()"
                                            class="block px-4 py-2 hover:bg-gray-100 text-red-600 w-full text-left">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <aside id="logo-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
            aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
                <ul class="space-y-2 font-medium">
                    <li>
                        <RouterLink :to="{ name: 'seller.home' }"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-all"
                            :class="{ 'bg-gray-200': $route.name == 'seller.home' }">
                            <i
                                class="bi bi-house-door-fill text-xl text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                            <span class="ms-3">Beranda</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'seller.products' }"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-all"
                            :class="{
        'bg-gray-200': [
            'seller.products',
            'seller.productsAdd',
            'seller.productsEdit',
            'seller.productsShow'
        ].includes($route.name as string)
    }">
                            <i
                                class="bi bi-handbag-fill text-xl text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                            <span class="flex-1 ms-3 whitespace-nowrap">Produk</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'seller.profile' }"
                            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-all"
                            :class="{ 'bg-gray-200': ['seller.profile', 'seller.profileEdit'].includes($route.name as string) }">
                            <i
                                class="bi bi-person-fill text-xl text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                            <span class="flex-1 ms-3 whitespace-nowrap">Profil</span>
                        </RouterLink>
                    </li>
                    <li>
                        <button @click="performLogout()"
                            class="flex items-center p-2 w-full text-left text-gray-900 rounded-lg hover:bg-gray-100 group transition-all">
                            <i
                                class="bi bi-box-arrow-right text-xl text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                            <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>

        <div class="p-4 sm:ml-64 flex flex-col">
            <slot></slot>
        </div>
    </div>

    <div v-else></div>
</template>

<script lang="ts">
import { initFlowbite, initDropdowns } from "flowbite";
import { RouterLink } from "vue-router";
import { useSellerAuthStore } from "@/stores/sellerAuth";
import { useConfigStore } from "@/stores/_config";
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useSellerAuthStore, ['getProfile', 'logout']),
        async performLogout() {
            const { isConfirmed: confirmed } = await Swal.fire({
                title: 'Proses logout',
                text: 'Apakah anda yakin ingin melakukan logout?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Tidak',
                confirmButtonText: 'Ya'
            });

            if (confirmed) {
                let success = this.logout();
                if (success) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Anda telah melakukan logout.',
                        icon: "success"
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan.',
                        icon: "error"
                    });
                }
            }
        }
    },
    computed: {
        ...mapState(useSellerAuthStore, ['sellerData', 'sellerLoggedIn']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.getProfile();

        initFlowbite();
        initDropdowns();
    },
}
</script>