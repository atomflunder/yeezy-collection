<template>
    <UCard>
        <slot name="removeItemButton"></slot>

        <div class="grid grid-cols-12 gap-2 p-4">
            <NuxtImg
                preload
                :src="collectionItem.item.imageLink"
                :alt="collectionItem.item.displayName"
                width="280px"
                class="col-span-12"
            />

            <div class="col-span-12">
                {{ collectionItem.item.displayName }}
                <br />
            </div>
            <div class="col-span-9">
                Retail: ${{ collectionItem.item.retailPrice.toString() }} USD
            </div>
            <div class="col-span-3">Size: {{ collectionItem.size }}</div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

defineProps<{
    collectionItem: CollectionItem;
}>();
</script>

<style scoped></style>

