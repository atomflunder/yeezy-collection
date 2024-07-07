import type { CollectionItem } from "~/types";

export function getDisplayName(shoe: CollectionItem): string {
    return `${shoe.item.manufacturer} ${shoe.item.modelName} ${shoe.item.color} - ${shoe.size}`;
}
