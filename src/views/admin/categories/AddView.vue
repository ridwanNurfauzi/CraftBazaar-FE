<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="adminData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">Tambah Kategori</h1>
        </div>

        <div class="m-4">
            <div class="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                    Nama Kategori
                </label>
                <input type="text" id="name" name="name" placeholder="Masukkan nama kategori . ." v-model="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                <p class="mt-2 text-sm text-red-600">
                    {{ validation.name }}
                </p>
            </div>

            <div class="mb-10">
                <button type="button" @click="performAddCategory()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Tambahkan Kategori
                </button>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useAdminAuthStore } from "@/stores/adminAuth";
import { useAdminCategoryStore } from "@/stores/adminCategory";
import { useConfigStore } from "@/stores/_config";
import { initFlowbite, initDropdowns } from "flowbite";
import $ from "jquery";
import Swal from 'sweetalert2';

export default {
    components: {
        RouterLink
    },
    data(_vm) {
        const name: any = '';
        return {
            name,

            validation: {
                name: '',
            }
        };
    },
    methods: {
        $,
        ...mapActions(useAdminAuthStore, ['getProfile']),
        ...mapActions(useAdminCategoryStore, ['addCategory']),

        async performAddCategory() {
            const fData = new FormData();
            try {
                fData.append('name', this.name);
            } catch (error) {
                console.log(error)
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan.'
                });
            }
            finally {
                const response = await this.addCategory(fData);

                let validation = this.validation;
                Object.keys(this.validation).forEach(e => {
                    this.validation[e as keyof typeof validation] = '';
                });

                if ((!response?.success) && response?.vError) {
                    let vResult = response?.vResult?.errors;

                    Object.keys(this.validation).forEach(e => {
                        const err = vResult.filter((d: any) => d?.path == e);
                        if (err.length > 0) {
                            this.validation[e as keyof typeof validation] = err[0].msg;
                        }
                    });
                }
                else if (response?.success) {
                    await Swal.fire({
                        icon: 'success',
                        text: 'Berhasil menambah data.'
                    });
                    this.$router.push({ name: 'admin.categories' });
                }
            }
        }
    },
    computed: {
        ...mapState(useAdminAuthStore, ['adminData']),
        ...mapState(useAdminCategoryStore, ['categories']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.getProfile();

        initFlowbite();
        initDropdowns();
    },
}
</script>