import type { CollectionItem } from "~/types";
import { getItemById } from "./mockDB";
import { Buffer } from "buffer";

export function encodeItems(items: CollectionItem[]): string {
    return (
        Buffer.from(
            items
                .map((i) => `${i.item.id}-${i.size.replace("US", "")},`)
                .join(""),
            "binary"
        )
            .toString("base64")
            // The replaces are needed for the Base64URL encoding/decoding, /+= break URLs.
            .replace("+", "-")
            .replace("/", "_")
            .replace("=", "%3d")
    );
}

export function decodeItems(str: string): CollectionItem[] {
    str = str.replace("-", "+").replace("_", "/").replace("%3d", "=");

    return Buffer.from(str, "base64")
        .toString("binary")
        .split(",")
        .map((i) => {
            // TODO: Make it more failsafe, check if ID and size make sense.
            // For size: contains in allSizes.
            // For ID: just check if getItemById function returns something and implement the logic there.
            const item = getItemById(i.split("-")[0]);
            const size = i.split("-")[1];

            if (item && size) {
                return {
                    item,
                    size,
                };
            }
        })
        .filter((i) => i !== undefined);
}

