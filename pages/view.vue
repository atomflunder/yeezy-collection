<template>
    <HeaderButtons :items="decodedItems" :title="title" parent-page="/view" />

    <div class="grid grid-cols-12 text-xl p-4">
        <div class="2xl:col-span-6 col-span-12 text-left">
            {{ title }}
        </div>
        <div class="2xl:col-span-6 col-span-12 2xl:text-right text-left">
            Retail Value: ${{
                decodedItems
                    .map((i) => i.item.retailPrice)
                    .reduce((a, b) => b + a, 0)
            }}
            USD
        </div>
    </div>

    <div v-for="(group, i) in groupedItems" class="p-4" :key="i">
        <UDivider :label="group[0].item.modelName" />
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <DisplayItem
                v-for="(collectionItem, j) in group"
                :collection-item="collectionItem"
                :key="j"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";

// This site will allow you to view your/others' collections.

const query = useRoute().query;
const title: string = ((query.title as string) || "Untitled Collection").slice(
    0,
    60
);

// TODO: Proper query validation?
if (!query.items) {
    await navigateTo("/");
}

// TODO: Add a approximate value for the recent price on StockX?

const decodedItems = await decodeItems(query.items as string);
const { data: apiResponse } = await useFetch("/api/yeezys/models");
const groups = apiResponse.value?.item || [];

const groupedItems: CollectionItem[][] = [];

for (const group of groups) {
    const foundItems = decodedItems.filter((i) => i.item.modelName === group);

    if (foundItems.length > 0) {
        groupedItems.push(foundItems);
    }
}
</script>

<style scoped></style>

