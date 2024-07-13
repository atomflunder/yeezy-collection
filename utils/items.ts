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

// TODO: Add All Yeezy Season Yeezys: https://stockx.com/search/sneakers/release-date?s=yeezy+season&page=2
// Also double check if there aren't any missed Yeezys, some were 100% missing from the StockX categories.

