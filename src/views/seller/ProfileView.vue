<template>
    <div class="flex-1 flex flex-col" v-if="!!sellerData.code">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="m-4">
                <h1 class="text-center font-medium text-lg">Profil</h1>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-3 mx-4 md:mx-10">
                <div class="flex">
                    <div
                        class="mx-auto rounded-full h-44 w-44 bg-gray-400 shadow-lg mt-5 bg-[url('/images/person.png')] bg-cover bg-center overflow-hidden">
                        <div class="w-full h-full bg-opacity-45 bg-white">
                            <div class="w-full h-full bg-cover bg-center">
                                <img v-if="!!sellerData.photo"
                                    :src="`${API_URL}/public/images/profiles/seller/${sellerData.photo}`"
                                    class="min-h-full min-w-full object-cover bg-gray-400" alt="Profile photo">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2">
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                            Nama
                        </label>
                        <input type="text" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            :value="sellerData.name" disabled />
                    </div>
                    <div class="mb-5 grid grid-cols-2 gap-3">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input type="text" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                :value="sellerData.email" disabled />
                        </div>
                        <div>
                            <label for="code" class="block mb-2 text-sm font-medium text-gray-900">
                                Kode
                            </label>
                            <input type="text" id="code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                :value="sellerData.code ?? ''" disabled />
                        </div>
                    </div>
                    <div class="mb-5">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">
                            Deskripsi
                        </label>
                        <textarea id="description" rows="5"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            disabled>{{ sellerData.description }}</textarea>
                    </div>
                    <div class="mb-5">
                        <button type="button" @click="$router.push({ name: 'seller.profileEdit' })"
                            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Ubah Profil
                        </button>
                        <button @click="performLogout()" type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useConfigStore } from "@/stores/_config";
import { useSellerAuthStore } from "@/stores/sellerAuth";
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
        ...mapState(useConfigStore, ['API_URL']),
    },
    async mounted() {
        await this.getProfile();
    }
}
</script>
