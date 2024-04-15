<template>
    <div class="flex-1 flex align-middle justify-center content-center flex-wrap"
        v-if="admins && categories && adminData">
        <div v-if="categories.data"
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>{{ categories.data.length }}</h1>
            <h1>Kategori</h1>
        </div>
        <div v-if="admins.data"
            class="flex flex-col justify-center align-middle text-center p-6 rounded-lg m-5 w-36 border hover:shadow-lg transition-all text-lg font-medium">
            <h1>{{ admins.data.length }}</h1>
            <h1>Admin</h1>
        </div>
    </div>
    <div v-else></div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from "pinia";
import { useAdminAuthStore } from "@/stores/adminAuth";
import { useAdminCategoryStore } from "@/stores/adminCategory";
import { useAdminAdminStore } from "@/stores/adminAdmin";

export default {
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useAdminAuthStore, ['getProfile']),
        ...mapActions(useAdminCategoryStore, ['fetchCategories']),
        ...mapActions(useAdminAdminStore, ['fetchAdmins']),
    },
    computed: {
        ...mapState(useAdminAuthStore, ['adminData']),
        ...mapState(useAdminCategoryStore, ['categories']),
        ...mapState(useAdminAdminStore, ['admins']),
    },
    async mounted() {
        await this.getProfile();
        await this.fetchCategories();
        await this.fetchAdmins();
    },
}
</script>