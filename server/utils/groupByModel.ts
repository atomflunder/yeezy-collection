import { CollectionItem } from "~/types";

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

