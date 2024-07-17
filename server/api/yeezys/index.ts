import { supabase } from "~/server/utils/supabase";
import { DatabaseItem } from "~/types";

export default defineEventHandler(async (event) => {
    let { data, error } = await supabase
        .from("yeezys")
        .select("*")
        .returns<DatabaseItem[]>();

    const models = await $fetch("/api/yeezys/models");

    if (!data || error || !models) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the data."
        );
        return;
    }

    data.sort((a, b) => {
        if (
            models.items.indexOf(a.modelName) >
            models.items.indexOf(b.modelName)
        ) {
            return 1;
        } else {
            return -1;
        }
    });

    return {
        items: data,
    };
});

