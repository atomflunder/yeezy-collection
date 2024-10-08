<template>
    <HeaderButtons>
        <template v-slot:actionButtons>
            <UButton
                :icon="
                    isCopyButtonClicked
                        ? 'i-mdi-clipboard-check-multiple-outline'
                        : 'i-mdi-clipboard-multiple-outline'
                "
                :label="
                    isCopyButtonClicked ? 'Copied to your Clipboard!' : 'Share'
                "
                @click="copyShareUrl()"
                variant="link"
            />
            <UButton
                v-if="!isCopyButtonClicked"
                icon="i-mdi-pencil"
                label="Your Collection"
                to="/"
                variant="link"
            />
        </template>
    </HeaderButtons>

    <div v-if="!collection" class="p-4 text-xl">
        Could not find this collection, do you have the right link?
    </div>

    <div class="grid grid-cols-12 text-xl p-4" v-if="collection">
        <div class="2xl:col-span-6 col-span-12 text-left">
            {{ collection.title }}
        </div>
        <div class="2xl:col-span-6 col-span-12 2xl:text-right text-left">
            Retail Value: ${{
                collection.collectionItems
                    .map((i) => i.item.retailPrice)
                    .reduce((a, b) => b + a, 0)
            }}
            USD
        </div>
    </div>

    <div
        v-if="collection"
        v-for="(group, i) in collection.groupedItems"
        class="p-4"
        :key="i"
    >
        <UDivider :label="group[0].item.modelName" />
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <DisplayItem
                v-for="(collectionItem, j) in group"
                :collection-item="collectionItem"
                :key="j"
            />
        </div>
    </div>

    <footer class="p-4" v-if="collection?.createdAt">
        Collection Created:
        {{
            new Date(collection?.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            })
        }}
    </footer>
</template>

<script setup lang="ts">
import type { Collection } from "~/types";

definePageMeta({
    validate: async (route) => {
        return typeof route.params.id === "string";
    },
});

const routeId: string = useRoute().params.id as string;

if (!routeId) {
    await navigateTo("/");
}

const { data: collection } = await useFetch<Collection>(
    "/api/collection/" + routeId
);

let isCopyButtonClicked = ref(false);

async function copyShareUrl() {
    const url = useRequestURL();

    await navigator.clipboard.writeText(`${url}`);

    isCopyButtonClicked.value = true;

    setTimeout(() => {
        isCopyButtonClicked.value = false;
    }, 2000);
}
</script>

