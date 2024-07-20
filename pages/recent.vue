<template>
    <HeaderButtons>
        <template v-slot:actionButtons>
            <UButton
                icon="i-mdi-pencil"
                label="Your Collection"
                to="/"
                variant="link"
            />
        </template>
    </HeaderButtons>

    <div class="text-xl p-4">
        <div class="text-left">Most recently created collections</div>
    </div>

    <div v-for="(collection, i) in collections?.collectionData" :key="i">
        <NuxtLink :to="collection.url">
            <UCard>
                <div class="grid grid-cols-12 gap-2 p-4">
                    <div class="2xl:col-span-6 col-span-12">
                        {{ collection.title }}
                    </div>
                    <div class="2xl:col-span-3 md:col-span-6 col-span-12">
                        {{ collection.items.length }} Items
                    </div>
                    <div class="2xl:col-span-3 md:col-span-6 col-span-12">
                        {{
                            new Date(collection.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                }
                            )
                        }}
                    </div>
                </div>
            </UCard>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { CollectionEntry } from "~/types";

const { data: collections } = await useFetch<{
    collectionData: CollectionEntry[];
}>("/api/collection/recent");
</script>

