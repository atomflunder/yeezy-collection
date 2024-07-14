import { supabase } from "~/server/utils/supabase";

type RequestBody = {
    title: string;
    items: string[];
    sizes: string[];
    url: string[];
};

export default defineEventHandler(async (event) => {
    const body = await readBody<RequestBody>(event);

    console.log("received request to write to db ", body);

    const { error } = await supabase.from("collections").insert(body);

    if (error) {
        setResponseStatus(
            event,
            500,
            "Something went wrong inserting items into the database."
        );
        return;
    }

    return {
        message: "Success",
    };
});

