<template>
    <HeaderButtons>
        <template v-slot:actionButtons>
            <UButton
                icon="i-mdi-eye-arrow-right"
                label="Generate"
                :to="url"
                @click="writeToDb"
                target="_blank"
                variant="link"
            />
        </template>
    </HeaderButtons>

    <UInput
        v-model="collectionTitle"
        class="h-12 p-4"
        placeholder="The Title of your collection..."
        variant="outline"
        color="primary"
        size="lg"
    />

    <UModal v-model="isModalOpen">
        <UCard>
            <template #header>
                <div v-if="currentlySelectedYeezy" class="h-8 text-left"></div>

                {{
                    currentlySelectedYeezy
                        ? currentlySelectedYeezy.displayName
                        : "Add a new Yeezy"
                }}

                <UButton
                    @click="closeModal"
                    icon="i-heroicons-x-mark"
                    color="red"
                    class="rounded-full float-right"
                />
            </template>

            <span v-if="currentlySelectedYeezy !== undefined">
                <NuxtImg
                    :src="currentlySelectedYeezy.imageLink"
                    :alt="currentlySelectedYeezy.displayName"
                    width="200px"
                />
            </span>

            <USelectMenu
                v-model="currentlySelectedSize"
                :options="getSizes(currentlySelectedYeezy)"
                placeholder="Select Your Size"
                v-if="currentlySelectedYeezy !== undefined"
            >
            </USelectMenu>

            <UInputMenu
                v-model="currentlySelectedYeezy"
                :options="allItems"
                searchable
                placeholder="Search for Yeezys"
                :search-attributes="['displayName']"
            >
                <template #option="{ option: collectionItem }">
                    <span>
                        <UAvatar
                            :src="collectionItem.imageLink"
                            img-class="rounded-none h-9 w-12"
                            class="h-10 w-16"
                        />
                        {{ collectionItem.displayName }}
                    </span>
                </template>

                <template #option-empty="{ query }">
                    <span>{{ query }} was not found.</span>
                </template>
            </UInputMenu>

            <template #footer>
                <UButton
                    v-if="
                        currentlySelectedYeezy !== undefined &&
                        currentlySelectedSize !== undefined
                    "
                    label="Add Yeezy to Collection"
                    @click="addYeezy"
                />
            </template>
        </UCard>
    </UModal>

    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 p-4">
        <DisplayItem
            v-for="(collectionItem, i) in collectionItems"
            :collection-item="collectionItem"
        >
            <template v-slot:removeItemButton>
                <UButton
                    @click="removeItem(i)"
                    icon="i-heroicons-x-mark"
                    color="red"
                    class="rounded-full float-right"
                />
            </template>
        </DisplayItem>

        <div v-if="collectionItems.length === 0">
            <UCard>
                1. Give your collection a title.
                <br />
                2. Add new Yeezys by clicking the "+" Button at the bottom-left.
                <br />
                3. Click on Share/View to share your collection with the world!
            </UCard>
        </div>

        <UButton
            @click="openModal"
            icon="i-heroicons-plus"
            class="rounded-full fixed bottom-4 left-4"
            size="xl"
        />
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from "~/stores/itemStore";
import type { DatabaseItem } from "~/types";
import { getSizes } from "~/utils/sizes";

const { data: apiResponse } = await useFetch("/api/yeezys");
const allItems = apiResponse.value?.items;

const currentlySelectedYeezy: Ref<DatabaseItem | undefined> = ref();
const currentlySelectedSize: Ref<string | undefined> = ref();

const { collectionItems, addItem, removeItem } = useItemStore();
const collectionTitle: Ref<string> = ref("");

let isModalOpen = ref(false);

function openModal() {
    isModalOpen.value = true;

    currentlySelectedSize.value = undefined;
    currentlySelectedYeezy.value = undefined;
}

function closeModal() {
    isModalOpen.value = false;
}

function addYeezy() {
    if (currentlySelectedSize.value && currentlySelectedYeezy.value) {
        addItem({
            item: currentlySelectedYeezy.value,
            size: currentlySelectedSize.value,
        });
        closeModal();
    }
}

let url = ref("/view/" + crypto.randomUUID());

async function writeToDb() {
    const title = collectionTitle.value.slice(0, 60);

    const body = {
        title: title || "Untitled Collection",
        items: collectionItems.map((i) => i.item.id),
        sizes: collectionItems.map((i) => i.size),
        url: url.value,
    };

    console.log("Writing to db: ", body);

    await $fetch("/api/collection/insert", {
        method: "POST",
        body,
    });

    url.value = "/view/" + crypto.randomUUID();
}
</script>

