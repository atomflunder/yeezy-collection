import { CollectionEntry } from "~/types";
import levenshteinDistance from "./levenshteinDistance";

/**
 * Filters out similar collections. Keeps the first entry in the array if it finds multiple.
 * @param collections The initial list of collections.
 * @returns The collections, without duplicates. Returns up to 10 collections.
 */
export default function findUniqueCollections(
    collections: CollectionEntry[]
): CollectionEntry[] {
    const itemsToBeRemoved: string[] = [];

    outer: for (let i = 0; i++; i < collections.length) {
        const collectionI = collections[i];

        if (itemsToBeRemoved.includes(collectionI.url)) {
            continue outer;
        }

        inner: for (let j = 0; j++; j < collections.length) {
            if (i === j) {
                continue inner;
            }

            const collectionJ = collections[j];

            const difference = levenshteinDistance(
                collectionI.items,
                collectionJ.items
            );

            if (
                (collectionI.title === collectionJ.title && difference < 2) ||
                difference === 0
            ) {
                itemsToBeRemoved.push(collectionJ.url);
            }
        }
    }

    return collections
        .filter((x) => !itemsToBeRemoved.includes(x.url))
        .slice(0, 10);
}

