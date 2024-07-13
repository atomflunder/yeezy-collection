<template>
    <UCard>
        <slot name="removeItemButton"></slot>

        <NuxtImg
            :src="collectionItem.item.imageLink"
            :alt="collectionItem.item.displayName"
            width="200px"
        />

        <div class="grid grid-cols-2 gap-2 p-4">
            <div class="col-span-12">
                {{ collectionItem.item.displayName }}
                <br />
            </div>
            <div class="col-span-6">
                Retail: ${{ collectionItem.item.retailPrice.toString() }} USD
            </div>
            <div class="col-span-6">Size: {{ collectionItem.size }}</div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

const props = defineProps<{
    collectionItem: CollectionItem;
}>();

console.log(props.collectionItem);
</script>

<style scoped></style>

