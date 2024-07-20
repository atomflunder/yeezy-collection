import { CollectionItem, DatabaseItem } from "~/types";

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
