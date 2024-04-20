<template>
    <div class="flex-1 flex flex-col" v-if="!!product?.data">
        <div class="w-full xl:max-w-7xl xl:mx-auto">
            <div class="md:grid grid-cols-3 mx-4 gap-3">
                <div class="flex md:mx-10">
                    <div class="flex gap-4 snap-x snap-mandatory overflow-x-auto md:mt-8 md:mb-auto px-4">
                        <div class="snap-center shrink-0 py-4" v-for="image in product?.data?.product_images">
                            <div class="overflow-hidden rounded-lg transition-all hover:shadow-lg">
                                <a target="_blank" :href="`${API_URL}/public/images/products/${image?.filename}`">
                                    <img :src="`${API_URL}/public/images/products/${image?.filename}`"
                                        class="aspect-square w-screen md:w-44 lg:w-52 shrink-0 object-cover hover:scale-125 hover:opacity-75 transition-all"
                                        :alt="image?.filename">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:max-h-screen md:overflow-auto">
                    <h1 class="font-medium text-lg my-3">
                        {{ product.data?.name ?? '' }}
                    </h1>
                    <RouterLink :to="{ name: 'user.sellerByCode', params: { code: product.data?.seller?.code ?? '' } }">
                        <div class="text-slate-700 mb-4 hover:underline flex group">
                            <span class="me-2">
                                <img :src="`${API_URL}/public/images/profiles/seller/${product.data.seller.photo}`"
                                    v-if="!!product.data.seller.photo"
                                    class="w-8 h-8 object-cover object-center rounded-full hover:shadow border transition-all group-hover:opacity-75 group-hover:shadow-lg"
                                    alt="">
                                <img src="/images/person.png" v-else
                                    class="w-8 h-8 object-cover object-center rounded-full hover:shadow border transition-all group-hover:opacity-75 group-hover:shadow-lg bg-slate-300"
                                    alt="">
                            </span>
                            <span class="my-auto">
                                {{ product.data?.seller?.name ?? '' }}
                            </span>
                        </div>
                    </RouterLink>
                    <div class="my-3 flex" v-if="product.data?.categories.length > 0">
                        <div class="me-4">
                            <span class="text-sm">Kategori</span>
                        </div>
                        <div class="flex flex-wrap">
                            <RouterLink v-for="category in product.data?.categories"
                                :to="{ name: 'user.productByCategory', params: { name: category.name } }">
                                <span
                                    class="bg-gray-200 text-sm px-2 py-0.5 rounded me-2 mb-2 font-medium hover:bg-gray-400 transition-all">
                                    {{ category?.name }}
                                </span>
                            </RouterLink>
                        </div>
                    </div>
                    <div>
                        <p>
                            {{ product.data?.description ?? '' }}
                        </p>
                    </div>

                    <div class="my-4" v-if="product?.data?.reviews">
                        <div class="flex">
                            <span class="text-yellow-400 hover:text-yellow-300 transition-all"
                                v-html="rateToStar(averageRating ?? 0)"></span>
                            <div class="text-slate-700 mx-3">
                                <span>
                                    {{ averageRating.toFixed(2) }}
                                </span>
                                <span>
                                    /
                                </span>
                                <span>
                                    {{ product?.data?.reviews.length ?? 0 }}
                                </span>
                            </div>
                        </div>

                        <div v-if="product.data.personal_reviews">
                            <div class="pt-2" v-if="product.data.personal_reviews.length < 1">
                                <div class="mx-2">
                                    <div>
                                        <h1 class="text-center font-medium text-lg">Tambah ulasan</h1>
                                    </div>
                                    <div class="my-2 flex justify-center">
                                        <button @click="rating = 1"
                                            class="group text-2xl text-yellow-300 mx-0.5 hover:text-yellow-200">
                                            <i class="group-hover:hidden bi bi-star-fill" v-if="rating >= 1"></i>
                                            <i class="group-hover:hidden bi bi-star" v-else></i>
                                            <i class="hidden group-hover:block bi bi-star-fill"></i>
                                        </button>
                                        <button @click="rating = 2"
                                            class="group text-2xl text-yellow-300 mx-0.5 hover:text-yellow-200">
                                            <i class="group-hover:hidden bi bi-star-fill" v-if="rating >= 2"></i>
                                            <i class="group-hover:hidden bi bi-star" v-else></i>
                                            <i class="hidden group-hover:block bi bi-star-fill"></i>
                                        </button>
                                        <button @click="rating = 3"
                                            class="group text-2xl text-yellow-300 mx-0.5 hover:text-yellow-200">
                                            <i class="group-hover:hidden bi bi-star-fill" v-if="rating >= 3"></i>
                                            <i class="group-hover:hidden bi bi-star" v-else></i>
                                            <i class="hidden group-hover:block bi bi-star-fill"></i>
                                        </button>
                                        <button @click="rating = 4"
                                            class="group text-2xl text-yellow-300 mx-0.5 hover:text-yellow-200">
                                            <i class="group-hover:hidden bi bi-star-fill" v-if="rating >= 4"></i>
                                            <i class="group-hover:hidden bi bi-star" v-else></i>
                                            <i class="hidden group-hover:block bi bi-star-fill"></i>
                                        </button>
                                        <button @click="rating = 5"
                                            class="group text-2xl text-yellow-300 mx-0.5 hover:text-yellow-200">
                                            <i class="group-hover:hidden bi bi-star-fill" v-if="rating >= 5"></i>
                                            <i class="group-hover:hidden bi bi-star" v-else></i>
                                            <i class="hidden group-hover:block bi bi-star-fill"></i>
                                        </button>
                                    </div>
                                    <div class="my-2">
                                        <textarea name="review_text" id="review_text" rows="3"
                                            placeholder="Tambah teks (opsional)" v-model="review_text"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
                                    </div>
                                    <div class="flex justify-end">
                                        <button @click="performAddReview(product.data?.id)"
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                            Tambah
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mx-4">
                            <div class="mt-3 flex flex-col w-full" v-if="product.data.personal_reviews">
                                <div class="px-3 py-1 rounded-xl border hover:shadow-lg flex flex-col my-4"
                                    v-for="review in product.data.personal_reviews">
                                    <div class="w-full flex justify-start">
                                        <div class="min-w-[3.5rem]">
                                            <span>
                                                <img v-if="!!review.user.photo"
                                                    :src="`${API_URL}/public/images/profiles/user/${review.user.photo}`"
                                                    class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                                    alt="profile">
                                                <img v-else src="/images/person.png"
                                                    class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                                    alt="profile">
                                            </span>
                                        </div>
                                        <div class="w-full">
                                            <div class="flex w-full">
                                                <div class="overflow-auto">
                                                    <h1 class="font-medium text-gray-800 overflow-hidden">
                                                        {{ review.user.firstname }}
                                                        {{ review.user.lastname }}
                                                    </h1>
                                                </div>
                                                <div class="ms-auto">
                                                    <button @click="performRemovePersonalReview(review.id)"
                                                        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center m-1">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="text-sm text-slate-700">
                                                {{
        !!review.createdAt ?
            (
                new Date(review.createdAt).getFullYear() +
                '-' +
                (new Date(review.createdAt).getMonth() + 1) +
                '-' +
                new Date(review.createdAt).getDate()
            )
            : ''
    }}
                                            </div>
                                            <div>
                                                <span
                                                    class="text-yellow-400 text-sm hover:text-yellow-300 transition-all"
                                                    v-html="rateToStar(review.rating)">
                                                </span>
                                            </div>
                                            <div>
                                                <p>
                                                    {{ review.text }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr v-if="product.data.personal_reviews">

                            <div class="mt-3 flex flex-col w-full">
                                <div class="px-3 py-1 rounded-xl border hover:shadow-lg flex flex-col my-4"
                                    v-for="review in product.data.showed_reviews">
                                    <div class="w-full flex justify-start">
                                        <div class="min-w-[3.5rem]">
                                            <span>
                                                <img v-if="!!review.user.photo"
                                                    :src="`${API_URL}/public/images/profiles/user/${review.user.photo}`"
                                                    class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                                    alt="profile">
                                                <img v-else src="/images/person.png"
                                                    class="opacity-85 object-cover w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full"
                                                    alt="profile">
                                            </span>
                                        </div>
                                        <div>
                                            <div class="overflow-auto">
                                                <h1 class="font-medium text-gray-800 overflow-hidden">
                                                    {{ review.user.firstname }}
                                                    {{ review.user.lastname }}
                                                </h1>
                                            </div>
                                            <div class="text-sm text-slate-700">
                                                {{
        !!review.createdAt ?
            (
                new Date(review.createdAt).getFullYear() +
                '-' +
                (new Date(review.createdAt).getMonth() + 1) +
                '-' +
                new Date(review.createdAt).getDate()
            )
            : ''
    }}
                                            </div>
                                            <div>
                                                <span
                                                    class="text-yellow-400 text-sm hover:text-yellow-300 transition-all"
                                                    v-html="rateToStar(review.rating)">
                                                </span>
                                            </div>
                                            <div>
                                                <p>
                                                    {{ review.text }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="hidden md:block border p-4 mt-5 mb-auto rounded-xl shadow-lg">
                    <div class="my-2">
                        <h1 class="font-bold text-xl">
                            {{ rupiah(product.data?.price ?? 0).replace(',00', '') }}
                        </h1>
                    </div>
                    <div class="my-2">
                        Stok tersisa : {{ product.data?.stock ?? 0 }}
                    </div>
                    <div class="my-2">
                        Terjual : {{ product.data?.sold ?? 0 }}
                    </div>
                    <div class="my-2 flex">
                        <button @click="decrementQty"
                            class="py-2.5 px-5 me-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            -
                        </button>
                        <input type="number" @change="changeQty" min="1"
                            :max="product.data?.stock ?? !!product.data?.stock ? product.data?.stock+'' : '0'"
                            v-model="qty" name="qty" id="qty"
                            class="bg-gray-50 me-2 border w-20 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <button @click="incrementQty"
                            class="py-2.5 px-5 me-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            +
                        </button>
                    </div>
                    <div class="flex flex-col">
                        <button @click="performAddProductToCart({product_id: product.data.id, qty})"
                            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                            Tambah ke keranjang
                        </button>
                    </div>
                </div>
            </div>
            <div class="block md:hidden sticky bottom-0 bg-gray-50 border-t">
                <div class="flex flex-col justify-center align-middle content-center mx-4">
                    <div class="my-2">
                        <h1 class="font-bold text-xl">
                            {{ rupiah(product.data?.price ?? 0).replace(',00', '') }}
                        </h1>
                    </div>
                    <div class="my-2">
                        Stok tersisa : {{ product.data?.stock ?? 0 }}
                    </div>
                    <div class="my-2">
                        Terjual : {{ product.data?.sold ?? 0 }}
                    </div>
                    <div class="my-2 flex">
                        <button @click="decrementQty"
                            class="py-2.5 px-5 mx-auto font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            -
                        </button>
                        <input type="number" @change="changeQty" min="1" v-model="qty" name="qty1" id="qty1"
                            class="bg-gray-50 mx-auto border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <button @click="incrementQty"
                            class="py-2.5 px-5 mx-auto font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            +
                        </button>
                    </div>
                    <div class="flex flex-col">
                        <button @click="performAddProductToCart({product_id: product.data.id, qty})"
                            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2">
                            Tambah ke keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex-1 flex flex-col" v-else>
        <div class="w-full xl:max-w-7xl xl:mx-auto flex-1 flex">
            <div class="m-auto font-medium text-xl">
                Produk tidak ditemukan
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useConfigStore } from "@/stores/_config";
import { useUserProductStore } from "@/stores/userProduct";
import { useUserCartStore } from "@/stores/userCart";
import { useUserAuthStore } from "@/stores/userAuth";
import Swal from "sweetalert2";

export default {
    components: {
        RouterLink
    },
    data(vm) {
        return {
            rating: 0,
            review_text: '',
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
            qty: 1
        }
    },
    computed: {
        ...mapState(useUserProductStore, ['product']),
        ...mapState(useUserAuthStore, ['loggedIn']),
        ...mapState(useConfigStore, ['API_URL']),

        averageRating() {
            let data: any[] = JSON.parse(JSON.stringify(this.product?.data?.reviews))
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
    },
    async mounted() {
        await this.fetchProductBySlug(this.$route.params.slug ?? '')
    },
    methods: {
        ...mapActions(useUserProductStore, ['fetchProductBySlug', 'removePersonalReview', 'addReview']),
        ...mapActions(useUserCartStore, ['addProductToCart', 'fetchCartProduct']),
        async performAddProductToCart(data: { product_id: any, qty: any }) {
            if (this.loggedIn) {
                const response = await this.addProductToCart(data);
                if (!response) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan'
                    });
                }
                await this.fetchCartProduct();
            } else {
                Swal.fire({
                    title: 'Mohon maaf!',
                    text: 'Anda harus login terlebih dahulu.',
                    icon: 'warning'
                });
                this.$router.push({ name: 'user.login' });
            }
        },
        incrementQty() {
            if (this.product.data) {
                if (this.product.data.stock > this.qty)
                    this.qty++;
            }
        },
        decrementQty() {
            this.qty--;
            if (this.qty < 1) {
                this.qty = 1;
            }
        },
        changeQty() {
            if (isNaN(this.qty))
                this.qty = 1;
            if (this.qty < 1)
                this.qty = 1;
        },
        async performAddReview(product_id: any) {
            if (this.rating > 5)
                this.rating = 5;
            if (this.rating < 1)
                Swal.fire({
                    icon: 'warning',
                    text: 'Anda belum memasukkan rating'
                });
            else {
                const data = {
                    rating: this.rating,
                    text: this.review_text,
                    product_id
                };
                await this.addReview(data).then(async e => {
                    if (e) {
                        Swal.fire({
                            icon: 'success',
                            text: 'Ulasan berhasil ditambahkan'
                        });
                        await this.fetchProductBySlug(this.$route.params.slug ?? '');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Mohon maaf',
                            text: 'Terjadi kesalahan'
                        });
                    }
                });
            }
        },
        async performRemovePersonalReview(id: any) {
            await this.removePersonalReview(id).then(async e => {
                if (e) {
                    await this.fetchProductBySlug(this.$route.params.slug ?? '')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mohon maaf',
                        text: 'Terjadi kesalahan'
                    });
                }
            });
        },
        rupiah(number: number | bigint) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }
    },
}
</script>
