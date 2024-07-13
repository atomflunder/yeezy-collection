import type { DatabaseItem } from "~/types";
import items from "~/data/items.json";

export function getAllModels(): string[] {
    return [...new Set(getAllItems().map((i) => i.modelName))];
}

export function getItemById(id: string): DatabaseItem | undefined {
    const foundItems = getAllItems().filter((i) => i.id === id);

    if (foundItems.length !== 1) {
        return undefined;
    }

    return foundItems[0];
}

export function getAllItems(): DatabaseItem[] {
    return items.yeezys;
}

