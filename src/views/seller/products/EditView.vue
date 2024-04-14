<template>
    <div class="flex-1 flex flex-col flex-wrap" v-if="product && categories && sellerData">
        <div class="m-4">
            <h1 class="text-center font-medium text-lg">
                Ubah Produk
            </h1>
        </div>

        <div v-if="product.data">
            <div class="m-4">
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                        Nama Produk
                    </label>
                    <input type="text" v-model="name" id="name" name="name" placeholder="Nama produk . ."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div class="mb-5" v-if="categories">
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                        Gambar Produk
                    </label>

                    <div
                        class="bg-gray-50 border border-gray-300 h-44 flex justify-start align-top content-start flex-wrap overflow-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
                        <span class="text-gray-500" v-if="_productImages.length < 1">
                            Pilih gambar produk
                        </span>
                        <span v-else v-for="(pImg, i) in _pImg"
                            class="bg-gray-200 overflow-hidden text-sm rounded m-1 font-medium hover:bg-gray-400 transition-all">
                            <div class="overflow-hidden">
                                <img :src="pImg"
                                    class="aspect-square w-32 shrink-0 object-cover hover:scale-125 hover:opacity-75 transition-all"
                                    :alt="'gambar ' + i">
                            </div>
                            <div>
                                <button @click="deleteProductImage(i)"
                                    class="font-medium w-full py-1 text-red-600 hover:underline">hapus</button>
                            </div>
                        </span>
                    </div>
                    <div class="w-full flex justify-end">
                        <button type="button" @click="$('#pImgF').click()"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            tambah gambar
                        </button>
                        <input @change="addProductImage()" type="file" name="pImgF" id="pImgF" hidden>
                    </div>


                    <p class="mt-2 text-sm text-red-600">
                        {{ validation.product_images }}
                    </p>
                </div>

                <div class="mb-5" v-if="categories">
                    <p class="block mb-2 text-sm font-medium text-gray-900">
                        Kategori
                    </p>

                    <div data-dropdown-toggle="categoryDropdown"
                        class="bg-gray-50 border border-gray-300 h-16 flex justify-start align-top content-start flex-wrap overflow-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
                        <span class="text-gray-500" v-if="_categories.length < 1">
                            Pilih kategori
                        </span>
                        <span v-else v-for="category in _categories"
                            class="bg-gray-200 text-sm px-2 py-1 rounded m-1 font-medium hover:bg-gray-400 transition-all">
                            {{ category.name }}
                            <button @click="deleteCategory(category)"
                                class="font-bold hover:bg-gray-500 px-1">&times;</button>
                        </span>
                    </div>

                    <!-- Dropdown menu -->
                    <div id="categoryDropdown" v-if="categories.data"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownCategoryButton">
                            <li v-for="category in categories.data"
                                v-show="!_categories.map((e: any) => e.name).includes(category.name)">
                                <button @click="addCategories(category as never)"
                                    class="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                                    {{ category.name }}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <p class="mt-2 text-sm text-red-600">
                    </p>
                </div>
                <div class="mb-5">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">
                        Deskripsi
                    </label>
                    <textarea name="description" id="description" cols="30" rows="7"
                        placeholder="Masukkan Deskripsi produk . ." v-model="description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
                </div>
                <div class="mb-5">
                    <label for="stock" class="block mb-2 text-sm font-medium text-gray-900">
                        Stok
                    </label>
                    <input type="text" :value="product.data.stock" id="stock" name="stock" min="0"
                        placeholder="Masukkan Jumlah stok produk . ."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="mb-5">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900">
                        Harga
                    </label>
                    <input v-model="price" type="text" id="price" name="price" placeholder="Masukkan Harga produk . ."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="mb-5">
                    <label for="weight" class="block mb-2 text-sm font-medium text-gray-900">
                        Berat
                    </label>
                    <input type="text" v-model="weight" id="weight" name="weight" min="1"
                        placeholder="Berat produk dalam gram"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="mb-10">
                    <button type="button" @click="performUpdateProoduct($route.params.id)"
                        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        Ubah
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useSellerAuthStore } from "@/stores/sellerAuth";
import { useSellerCategoryStore } from "@/stores/sellerCategory";
import { useSellerProductStore } from "@/stores/sellerProduct";
import { useConfigStore } from "@/stores/_config";
import { initFlowbite, initDropdowns } from "flowbite";
import $ from "jquery";
import Swal from 'sweetalert2';

export default {
    components: {
        RouterLink
    },
    data(_vm) {
        const _categories: any = [];
        const _productImages: any = [];
        const _pImg: any = [];

        return {
            _categories,
            _productImages,
            _pImg,

            name: '',
            description: '',
            stock: '',
            price: '',
            weight: '',
            validation: {
                name: '',
                description: '',
                product_images: '',
                stock: '',
                price: '',
                weight: ''
            }
        };
    },
    methods: {
        $,
        ...mapActions(useSellerAuthStore, ['getProfile']),
        ...mapActions(useSellerCategoryStore, ['fetchCategories']),
        ...mapActions(useSellerProductStore, ['fetchProductById', 'updateProduct']),
        async performUpdateProoduct(id: any) {
            const fData = new FormData();
            try {
                fData.append('name', this.name);
                fData.append('description', this.description);
                fData.append('stock', this.stock);
                fData.append('price', this.price);
                fData.append('weight', this.weight);
                this._categories.forEach((e: any) => {
                    fData.append('categories', e.id);
                });
                this._productImages.forEach((e: any) => {
                    fData.append('product_images', e);
                });
            } catch (error) {
                console.log(error)
                await Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan.'
                });
            }
            finally {
                const response = await this.updateProduct(fData, id);

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
                    this.$router.push({ name: 'seller.products' });
                }
            }
        },
        addProductImage() {
            if (($('#pImgF')[0] as any).files[0]) {
                this._productImages.push(($('#pImgF')[0] as any).files[0]);
                this._pImg.push(URL.createObjectURL(($('#pImgF')[0] as any).files[0]));
            }
        },
        deleteProductImage(index: any) {
            this._productImages.splice(index, 1);
            this._pImg.splice(index, 1);
        },
        addCategories(data: never) {
            this._categories.push(data);
            console.log(this._categories)
        },
        deleteCategory(data: any) {
            this._categories = this._categories.filter((e: any) => e != data);
        },
        rupiah(number: number | bigint) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },
    computed: {
        ...mapState(useSellerAuthStore, ['sellerData']),
        ...mapState(useSellerCategoryStore, ['categories']),
        ...mapState(useSellerProductStore, ['product']),
        ...mapState(useConfigStore, ['API_URL'])
    },
    async mounted() {
        await this.getProfile();
        await this.fetchCategories();
        await this.fetchProductById(this.$route.params.id).then((e: any) => {
            if (e.success) {
                this.name = e.data.name;
                this.description = e.data.description;
                this.stock = e.data.stock;
                this.price = e.data.price;
                this.weight = e.data.weight;
                (e.data.categories as any[]).forEach(el => {
                    this._categories.push(el);
                });
                (e.data.product_images as any[]).forEach(async (el: any) => {
                    await fetch(`${this.API_URL}/public/images/products/${el.filename}`)
                        .then(x => x.blob())
                        .then((y: any) => {
                            const f = new File([y], el.filename);
                            this._productImages.push(f);
                            this._pImg.push(URL.createObjectURL(f));
                        });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Mohon maaf',
                    text: 'Terjadi kesalahan.'
                });
            }
        });

        initDropdowns();
        initFlowbite();
    },
}
</script>