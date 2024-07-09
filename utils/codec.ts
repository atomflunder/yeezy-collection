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
            const [rawItem, rawSize] = i.split("-");

            if (!rawItem || !rawSize) {
                return undefined;
            }

            const item = getItemById(rawItem);
            const size = `${rawSize}US`;

            if (item && allSizes.includes(size)) {
                return {
                    item,
                    size,
                };
            }
        })
        .filter((i) => i !== undefined);
}

