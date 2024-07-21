import sortItems from "~/server/utils/sortItems";
import { supabase } from "~/server/utils/supabase";
import { DatabaseItem } from "~/types";

export default defineEventHandler(async (event) => {
    let { data, error } = await supabase
        .from("collections")
        .select("url")
        .returns<{ url: string }[]>();

    if (!data || error) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the data."
        );
        return;
    }

    const link = data[Math.floor(Math.random() * data.length)];

    return {
        link,
    };
});

