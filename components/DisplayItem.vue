<template>
    <UCard>
        <slot name="removeItemButton"></slot>

        <div class="grid grid-cols-12 gap-2 p-4">
            <NuxtImg
                preload
                :src="'/' + collectionItem.item.id + '.png'"
                :alt="collectionItem.item.displayName"
                width="280px"
                class="col-span-12"
            />

            <div class="col-span-12">
                {{ collectionItem.item.displayName }}
                <br />
            </div>
            <div class="col-span-7">
                Retail: ${{ collectionItem.item.retailPrice.toString() }} USD
            </div>
            <div class="col-span-5">Size: {{ collectionItem.size }}</div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

defineProps<{
    collectionItem: CollectionItem;
}>();
</script>

