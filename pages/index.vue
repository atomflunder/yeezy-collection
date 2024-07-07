<template>
    <HeaderButtons :items="collectionItems" :title="collectionTitle" />

    <!-- TODO: Make the input pop out more -->
    <UInput
        v-model="collectionTitle"
        class="h-12"
        placeholder="The Title of your collection"
    />

    <UModal v-model="isModalOpen">
        <UCard>
            <template #header>
                <UButton
                    @click="closeModal"
                    icon="i-heroicons-x-mark"
                    style="float: right"
                    color="red"
                />
            </template>

            <span v-if="currentlySelectedYeezy !== undefined">
                {{ currentlySelectedYeezy.displayName }}
                <NuxtImg
                    :src="currentlySelectedYeezy.imageLink"
                    :alt="currentlySelectedYeezy.displayName"
                    width="200px"
                />
            </span>

            <UInputMenu
                v-model="currentlySelectedSize"
                :options="allSizes"
                placeholder="Select Your Size"
                v-if="currentlySelectedYeezy !== undefined"
            >
            </UInputMenu>

            <UInputMenu
                v-model="currentlySelectedYeezy"
                :options="allItems"
                searchable
                placeholder="Search for Yeezys"
                :search-attributes="['item.displayName']"
            >
                <template #option="{ option: collectionItem }">
                    <span> {{ collectionItem.displayName }}</span>
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

    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
        <UCard v-for="(collectionItem, i) in collectionItems">
            <UButton
                @click="removeItem(i)"
                icon="i-heroicons-x-mark"
                color="red"
                class="rounded-full float-right"
            />

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

    <UButton
        @click="openModal"
        icon="i-heroicons-plus"
        class="rounded-full fixed bottom-4 left-4"
        size="xl"
    />
</template>

<script setup lang="ts">
import { useItemStore } from "~/stores/itemStore";
import type { DatabaseItem } from "~/types";

const allItems: DatabaseItem[] = getAllItems();

const currentlySelectedYeezy: Ref<DatabaseItem | undefined> = ref();
const currentlySelectedSize: Ref<string | undefined> = ref();

const { collectionItems, addItem, removeItem } = useItemStore();
const collectionTitle: Ref<string> = ref("Your Yeezy Collection");

let isModalOpen = ref(false);

// TODO: Improve UI (a lot)

// TODO: Transparent pictures of yeezys?

function openModal() {
    isModalOpen.value = true;

    // Only resetting the selected Yeezy, not the selected size.
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
</script>

<style scoped></style>

