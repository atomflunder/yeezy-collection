import { supabase } from "~/server/utils/supabase";
import { DatabaseItem } from "~/types";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    if (!id) {
        setResponseStatus(event, 400, "Bad Request");
    }

    let { data, error } = await supabase
        .from("yeezys")
        .select("*")
        .eq("id", id)
        .returns<DatabaseItem[]>();

    if (error) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while fetching the data."
        );
        return;
    }

    if (!data || data.length !== 1) {
        setResponseStatus(event, 400, "Invalid ID");
        return;
    }

    return {
        item: data[0],
    };
});

