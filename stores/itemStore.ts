import { defineStore } from "pinia";
import type { CollectionItem } from "~/types";

export const useItemStore = defineStore(
    "yeezyStore",
    () => {
        const collectionItems: Ref<CollectionItem[]> = ref([]);

        /**
         * Adds an item to the collection.
         * @param newItem The item to add.
         */
        function addItem(newItem: CollectionItem): void {
            collectionItems.value.push(newItem);
        }

        /**
         * Removes an item from the collection.
         * @param index The index of the item to remove.
         */
        function removeItem(index: number): void {
            collectionItems.value.splice(index, 1);
        }

        return { collectionItems, addItem, removeItem };
    },
    {
        persist: {
            storage: persistedState.localStorage,
        },
    }
);

