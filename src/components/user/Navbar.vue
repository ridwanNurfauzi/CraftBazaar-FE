<template>
    <div>
        <nav class="bg-white border-gray-200">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 px-2">
                <a href="#" class="flex items-center space-x-0 rtl:space-x-reverse">
                    <img src="/favicon.ico" class="h-8 me-1" alt="CraftBazaar" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap">CraftBazaar</span>
                </a>
                <div class="flex items-center space-x-1 rtl:space-x-reverse" v-if="loggedIn">
                    <button @click="$router.push({ name: 'user.cart' })"
                        class="py-.5 px-2 rounded-lg me-5 hover:bg-gray-300 group transition-all"
                        :class="{ 'bg-gray-300': ($route.name == 'user.cart') }">
                        <div v-if="cartProducts && cartProducts.data && (cartProducts.data ?? []).length > 0"
                            class="sticky -mb-4 -mt-1 bg-yellow-400 bg-opacity-75 rounded-lg px-1 ms-3 -me-5 text-sm">
                            {{ (cartProducts.data ?? []).length }}
                        </div>
                        <i class="bi bi-cart-fill text-gray-700 text-lg"></i>
                    </button>
                    <button id="dropdownProfileButton" data-dropdown-toggle="profileDropdown"
                        class="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center inline-flex items-center overflow-hidden"
                        type="button">
                        <img :src="`${API_URL}/public/images/profiles/user/${userData.photo}`"
                            class="opacity-85 object-cover w-8 h-8" alt="profile" v-if="!!userData.photo">
                        <img src="/images/person.png" class="opacity-85 object-cover w-8 h-8" alt="profile" v-else>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="profileDropdown"
                        class="z-10 hidden border bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownProfileButton">
                            <li>
                                <h1
                                    class="overflow-hidden text-ellipsis text-nowrap font-normal mb-1 mx-4 text-gray-900">
                                    {{ userData.firstname }}
                                    {{ userData.lastname }}
                                </h1>
                                <h1
                                    class="overflow-hidden text-ellipsis text-nowrap font-semibold mb-1 mx-4 text-gray-900">
                                    {{ userData.email }}
                                </h1>
                            </li>
                            <hr>
                            <li>
                                <RouterLink :to="{ name: 'user.profile' }" class="block px-4 py-2 hover:bg-gray-100">
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
                <div class="flex items-center space-x-1 rtl:space-x-reverse" v-else>
                    <button id="dropdownLoginButton" data-dropdown-toggle="loginDropdown"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                        type="button">
                        Login
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <!-- Dropdown login menu -->
                    <div id="loginDropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownLoginButton">
                            <li>
                                <RouterLink :to="{ name: 'user.login' }">
                                    <span class="block px-4 py-2 hover:bg-gray-100">
                                        Sebagai pembeli
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'seller.login' }">
                                    <span class="block px-4 py-2 hover:bg-gray-100">
                                        Sebagai penjual
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <button id="dropdownRegisterButton" data-dropdown-toggle="registerDropdown"
                        class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                        type="button">
                        Register
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <!-- Dropdown register menu -->
                    <div id="registerDropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownRegisterButton">
                            <li>
                                <RouterLink :to="{ name: 'user.register' }">
                                    <span class="block px-4 py-2 hover:bg-gray-100">
                                        Sebagai pembeli
                                    </span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'seller.register' }">
                                    <span class="block px-4 py-2 hover:bg-gray-100">
                                        Sebagai penjual
                                    </span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>

        <nav class="bg-gray-100">
            <div class="max-w-screen-xl px-4 py-2 mx-auto">
                <div class="flex items-center">
                    <ul
                        class="mx-auto px-4 overflow-x-auto flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <RouterLink :to="{ name: 'user.home' }">
                                <span class="text-gray-900 hover:underline">Beranda</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'user.products' }">
                                <span class="text-gray-900 hover:underline">Produk</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'user.categories' }">
                                <span class="text-gray-900 hover:underline">kategori</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { RouterLink } from 'vue-router'
import { initFlowbite, initDropdowns } from "flowbite"
import { mapState, mapActions } from "pinia";
import { useUserAuthStore } from '@/stores/userAuth';
import { useConfigStore } from "@/stores/_config";
import { useUserCartStore } from '@/stores/userCart';

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useUserAuthStore, ['getProfile', 'logout']),
        ...mapActions(useUserCartStore, ['fetchCartProduct']),
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
    async mounted() {
        await this.getProfile()
            .then(async e => {
                if (e) await this.fetchCartProduct();
            });

        initFlowbite();
        initDropdowns();
    },
    computed: {
        ...mapState(useUserAuthStore, ['loggedIn', 'userData']),
        ...mapState(useUserCartStore, ['cartProducts']),
        ...mapState(useConfigStore, ['API_URL']),
    }
}
</script>