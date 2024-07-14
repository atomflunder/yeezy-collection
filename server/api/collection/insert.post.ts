import { supabase } from "~/server/utils/supabase";
import { isValidSize } from "~/utils/sizes";

type RequestBody = {
    title: string;
    items: number[];
    sizes: string[];
    url: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<RequestBody>(event);

    if (!body.title) {
        setResponseStatus(event, 400, "No title");
        return;
    }

    const bodyRegEx =
        "^/view/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$";

    if (!new RegExp(bodyRegEx).test(body.url)) {
        setResponseStatus(event, 400, "Invalid URL in body");
        return;
    }

    if (
        !body.items ||
        !body.sizes ||
        body.items.length !== body.sizes.length ||
        body.items.length === 0
    ) {
        setResponseStatus(event, 400, "Invalid Items/Sizes");
        return;
    }

    for (const size of body.sizes) {
        if (!isValidSize(size)) {
            setResponseStatus(event, 400, "Invalid Sizes");
            return;
        }
    }

    let { data: allIds, error: allIdsError } = await supabase
        .from("yeezys")
        .select("id")
        .returns<{ id: number }[]>();

    if (!allIds || allIdsError) {
        setResponseStatus(
            event,
            500,
            "Something went wrong while searching database"
        );
        return;
    }

    for (const item of body.items) {
        if (!allIds.map((i) => i.id).includes(item)) {
            setResponseStatus(event, 400, "Invalid Items");
            return;
        }
    }

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

