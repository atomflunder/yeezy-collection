import { DatabaseItem } from "~/types";

/**
 * Sorts items by the index of their models.
 * If there is a tie, it will sort them alphabetically.
 * @param items The initial list of items.
 * @param models The models to sort the list by.
 * @returns The sorted list of items.
 */
export default function sortItems(
    items: DatabaseItem[],
    models: string[]
): DatabaseItem[] {
    return items.sort((a, b) => {
        if (models.indexOf(a.modelName) > models.indexOf(b.modelName)) {
            return 1;
        } else if (models.indexOf(a.modelName) < models.indexOf(b.modelName)) {
            return -1;
        } else {
            // If a tie occurs it's just alphabetically
            return a.displayName.localeCompare(b.displayName, "en-US", {
                numeric: true,
            });
        }
    });
}

