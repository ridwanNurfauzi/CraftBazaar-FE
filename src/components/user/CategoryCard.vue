<template>
    <div
        class="w-48 h-32 border bg-gray-50 rounded-lg group overflow-hidden transition-all flex flex-col hover:shadow-md">
        <div class="flex-1 flex overflow-hidden">
            <div class="m-auto group-hover:opacity-75 group-hover:scale-110 transition-all mx-3">
                <h1 class="text-slate-800 font-bold text-center text-lg text-wrap break-words">
                    {{ category?.name ?? '' }}
                </h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['category']
}
</script>