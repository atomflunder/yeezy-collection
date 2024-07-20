import { CollectionEntry } from "~/types";
import levenshteinDistance from "./levenshteinDistance";

export default function findUniqueCollections(
    collections: CollectionEntry[]
): CollectionEntry[] {
    const itemsToBeRemoved: string[] = [];

    outer: for (let i = collections.length; i--; i >= 0) {
        const collectionI = collections[i];

        if (itemsToBeRemoved.includes(collectionI.url)) {
            continue outer;
        }

        inner: for (let j = collections.length; j--; j >= 0) {
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

