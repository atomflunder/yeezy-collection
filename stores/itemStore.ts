import { defineStore } from "pinia";
import type { CollectionItem } from "~/types";

export const useItemStore = defineStore(
    "yeezyStore",
    () => {
        const collectionItems: Ref<CollectionItem[]> = ref([]);

        function addItem(newItem: CollectionItem): void {
            collectionItems.value.push(newItem);
        }

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

