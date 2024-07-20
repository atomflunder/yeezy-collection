import groupByModel from "~/server/utils/groupByModel";
import { supabase } from "~/server/utils/supabase";
import { CollectionEntry, CollectionItem, DatabaseItem } from "~/types";

// TODO: Add a approximate value for the recent price on StockX?

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        setResponseStatus(event, 400, "Bad Request");
        return;
    }

    let { data: collectionData, error: collectionError } = await supabase
        .from("collections")
        .select("*")
        .eq("url", "/view/" + id)
        .returns<CollectionEntry[]>();

    if (collectionError || !collectionData || collectionData.length !== 1) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the data. You may have an invalid ID."
        );
        return;
    }

    const collectionEntry: CollectionEntry = collectionData[0];

    if (collectionEntry.items.length !== collectionEntry.sizes.length) {
        setResponseStatus(event, 500, "Database entry is malformed.");
        return;
    }

    const yeezyData = await $fetch("/api/yeezys");

    if (!yeezyData) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the data."
        );
        return;
    }

    const collectionItems: CollectionItem[] = [];

    for (let i = 0; i < collectionEntry.items.length; i++) {
        const itemId = collectionEntry.items[i];
        const size = collectionEntry.sizes[i];

        const item = yeezyData.items.find((i) => i.id === itemId);

        if (item) {
            collectionItems.push({
                size,
                item,
            });
        }
    }

    const models = await $fetch("/api/yeezys/models");

    if (!models) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the model data."
        );
        return;
    }

    const groupedItems = groupByModel(collectionItems, models.items);

    return {
        createdAt: collectionEntry.created_at,
        collectionItems,
        groupedItems,
        title: collectionEntry.title,
        url: collectionEntry.url,
    };
});

