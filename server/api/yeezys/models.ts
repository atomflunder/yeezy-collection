import { supabase } from "~/server/utils/supabase";
import { DatabaseItem } from "~/types";

export default defineEventHandler(async (event) => {
    let { data, error } = await supabase
        .from("yeezys")
        .select("modelName")
        .returns<DatabaseItem[]>();

    if (!data || error) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching items."
        );
        return;
    }

    const models = [...new Set(data.map((d) => d.modelName))];

    return {
        item: models,
    };
});

