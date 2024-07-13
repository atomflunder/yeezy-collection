import type { CollectionItem } from "~/types";

import { Buffer } from "buffer";

export function encodeItems(items: CollectionItem[]): string {
    return (
        Buffer.from(
            items.map((i) => `${i.item.id}-${i.size},`).join(""),
            "binary"
        )
            .toString("base64")
            // The replaces are needed for the Base64URL encoding/decoding, /+= break URLs.
            .replace("+", "-")
            .replace("/", "_")
            .replace("=", "%3d")
    );
}

export async function decodeItems(str: string): Promise<CollectionItem[]> {
    str = str.replace("-", "+").replace("_", "/").replace("%3d", "=");

    const { data: apiResponse } = await useFetch("/api/yeezys");
    const allItems = apiResponse.value?.items;

    return Buffer.from(str, "base64")
        .toString("binary")
        .split(",")
        .map((i) => {
            const [rawItem, size] = i.split("-");

            if (!rawItem || !size) {
                return undefined;
            }

            const item = allItems?.find((i) => i.id.toString() === rawItem);

            if (item && allSizes.includes(size)) {
                return {
                    item,
                    size,
                };
            }
        })
        .filter((i) => i !== undefined);
}

