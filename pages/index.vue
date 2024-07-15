<template>
    <HeaderButtons>
        <template v-slot:actionButtons>
            <UButton
                icon="i-mdi-eye-arrow-right"
                :label="isCopied ? 'Copied to your Clipboard' : 'Generate'"
                @click="writeToDb"
                target="_blank"
                variant="link"
                :loading="isLoadingView"
                loading-icon="i-mdi-loading"
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

    <UModal v-model="isModalOpen" :ui="{ container: 'items-center' }">
        <UCard>
            <template #header>
                <div v-if="currentlySelectedYeezy" class="h-6 text-left">
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
                </div>
            </template>

            <span v-if="currentlySelectedYeezy !== undefined">
                <NuxtImg
                    :src="'/' + currentlySelectedYeezy.id + '.png'"
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
                        <NuxtImg
                            :src="'/' + collectionItem.id + '.png'"
                            class="h-9 w-12"
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

        <UCard v-if="collectionItems.length === 0">
            1. Give your collection a title.
            <br />
            2. Add new Yeezys by clicking the "+" Button at the bottom-left.
            <br />
            3. Click on the Generate Button in the Header to share your
            collection with the world!
        </UCard>

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

let isLoadingView = ref(false);

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

let isCopied = ref(false);

async function writeToDb() {
    const fullSitePath = useRequestURL();

    await navigator.clipboard.writeText(`${fullSitePath}${url.value.slice(1)}`);

    isLoadingView.value = true;

    const title = collectionTitle.value.slice(0, 60);

    const body = {
        title: title || "Untitled Collection",
        items: collectionItems.map((i) => i.item.id).slice(0, 200),
        sizes: collectionItems.map((i) => i.size).slice(0, 200),
        url: url.value,
    };

    await $fetch("/api/collection/insert", {
        method: "POST",
        body,
    });

    await navigateTo(url.value, { open: { target: "_blank" } });

    url.value = "/view/" + crypto.randomUUID();

    isLoadingView.value = false;

    isCopied.value = true;

    setTimeout(() => {
        isCopied.value = false;
    }, 2000);
}
</script>

