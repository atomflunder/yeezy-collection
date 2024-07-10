import type { DatabaseItem } from "~/types";

// TODO: Use an actual DB? Which one? SQLite is not ideal since it's not supported by Vercel. Supabase?

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
    return [
        {
            id: "1",
            color: "Enflame Amber",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-Boost-700-Enflame-Amber/Images/adidas-Yeezy-Boost-700-Enflame-Amber/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy Boost 700",
            displayName: "Adidas Yeezy Boost 700 Enflame Amber",
        },
        {
            id: "2",
            color: "Zebra",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Zebra/Images/adidas-Yeezy-Boost-350-V2-Zebra/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy Boost 350 V2",
            displayName: "Adidas Yeezy Boost 350 V2 Zebra",
        },
        {
            id: "3",
            color: "Carbon Blue",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-Boost-700-Carbon-Blue/Images/adidas-Yeezy-Boost-700-Carbon-Blue/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy Boost 700",
            displayName: "Adidas Yeezy Boost 700 Carbon Blue",
        },
        {
            id: "4",
            color: "Cream White",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Cream-White/Images/adidas-Yeezy-Boost-350-V2-Cream-White/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy Boost 350 V2",
            displayName: "Adidas Yeezy Boost 350 V2 Cream White",
        },
        {
            id: "5",
            color: "Resin",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-450-Resin/Images/adidas-Yeezy-450-Resin/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy 450",
            displayName: "Adidas Yeezy 450 Resin",
        },
        {
            id: "6",
            color: "Cloud White",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-450-Cloud-White/Images/adidas-Yeezy-450-Cloud-White/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy 450",
            displayName: "Adidas Yeezy 450 Cloud White",
        },
        {
            id: "7",
            color: "Utility Black",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-450-Utility-Black/Images/adidas-Yeezy-450-Utility-Black/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy 450",
            displayName: "Adidas Yeezy 450 Utility Black",
        },
        {
            id: "8",
            color: "Stone Teal",
            imageLink:
                "https://images.stockx.com/360/adidas-Yeezy-450-Stone-Teal/Images/adidas-Yeezy-450-Stone-Teal/Lv2/img01.jpg",
            manufacturer: "Adidas",
            modelName: "Yeezy 450",
            displayName: "Adidas Yeezy 450 Stone Teal",
        },
    ];
}

