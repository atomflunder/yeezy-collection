import { CollectionItem } from "~/types";

/**
 * Groups collectionItems by their model and returns an array of arrays.
 * @param collectionItems The initial collectionItems.
 * @param models The models to group the items by.
 * @returns An array of arrays of collectionItems.
 */
export default function groupByModel(
    collectionItems: CollectionItem[],
    models: string[]
): CollectionItem[][] {
    const groupedItems: CollectionItem[][] = [];

    for (const group of models) {
        const foundItems = collectionItems.filter(
            (i) => i.item.modelName === group
        );

        if (foundItems.length > 0) {
            groupedItems.push(foundItems);
        }
    }

    return groupedItems;
}

