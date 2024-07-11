<template>
    <HeaderButtons :items="decodedItems" :title="title" parent-page="/view" />

    <div class="text-xl p-4 text-center">
        {{ title }}
    </div>

    <div v-for="(group, i) in groupedItems" class="p-4">
        <UDivider :label="group[0].item.modelName" />
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <UCard v-for="(collectionItem, j) in group">
                <NuxtImg
                    :src="collectionItem.item.imageLink"
                    :alt="collectionItem.item.displayName"
                    width="200px"
                />

                <div>
                    {{ collectionItem.item.displayName }}
                    <br />
                    ({{ collectionItem.size }})
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types";
import { getAllModels } from "~/utils/items";

// This site will allow you to view your/others' collections.

const query = useRoute().query;
const title: string = (query.title as string) || "Untitled Collection";

// TODO: Proper query validation?
if (!query.items) {
    await navigateTo("/");
}

const decodedItems = decodeItems(query.items as string);
const groups = getAllModels();

const groupedItems: CollectionItem[][] = [];

for (const group of groups) {
    const foundItems = decodedItems.filter((i) => i.item.modelName === group);

    if (foundItems.length > 0) {
        groupedItems.push(foundItems);
    }
}
</script>

<style scoped></style>

