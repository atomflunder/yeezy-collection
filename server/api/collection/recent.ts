import filterDuplicateCollections from "~/server/utils/filterDuplicateCollections";
import { CollectionEntry } from "~/types";

export default defineEventHandler(async (event) => {
    let { data: collectionData, error: collectionError } = await supabase
        .from("collections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50)
        .returns<CollectionEntry[]>();

    if (collectionError) {
        setResponseStatus(
            event,
            500,
            "An Error occurred while reading the database."
        );
        return {
            collectionData: [],
        };
    }

    if (!collectionData) {
        return {
            collectionData: [],
        };
    }

    collectionData = filterDuplicateCollections(collectionData);

    return {
        collectionData,
    };
});

