import type { DatabaseItem } from "~/types";
import items from "~/data/items.json";

// Maybe a file is enough tbh, since we do not write anything.
// https://www.snkr.eu/adidas-yeezy-modelluebersicht/ (Color names are off a bit, but images are good)
// Maybe try to find .pngs though.

export function getAllModels(): string[] {
    return [...new Set(getAllItems().map((i) => i.modelName))];
}

export function getItemById(id: string): DatabaseItem | undefined {
    const foundItems = getAllItems().filter((i) => i.id === id);

    if (foundItems.length !== 1) {
        return undefined;
    }

    return foundItems[0];
}

export function getAllItems(): DatabaseItem[] {
    return items.yeezys;
}

/*
TODO:
https://stockx.com/yeezy/qntm/release-date?size_types=men

Done:
- 350
- 350 V2
- 350 V2 CMPCT
- 380
- 450
- 500
- 500 High
- 500 High Tactical Boots

Not Done Yet:
- 700
- 700 V2
- 700 V3
- 700 MNVN
- 750 + 750 Cleats (Black + Tan)
- 950
- 1050
- Desert Boots + Knit Runner Boot + Insulated Boot
- Foam Runners
- Knit Runners
- Powerphases
- Slides
- QNTMs

- All Nike Yeezys
- All YZY Yeezys
- All Yeezy Season Yeezys?
*/

