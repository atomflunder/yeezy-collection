import type { DatabaseItem } from "~/types";

export const allSizes = [
    "4US",
    "4.5US",
    "5US",
    "5.5US",
    "6US",
    "6.5US",
    "7US",
    "7.5US",
    "8US",
    "8.5US",
    "9US",
    "9.5US",
    "10US",
    "10.5US",
    "11US",
    "11.5US",
    "12US",
    "12.5US",
    "13US",
    "13.5US",
    "14US",
    "14.5US",
    "15US",
    "15.5US",
    "16US",
];

export const fullSizes = [
    "4US",
    "5US",
    "6US",
    "7US",
    "8US",
    "9US",
    "10US",
    "11US",
    "12US",
    "13US",
    "14US",
    "15US",
    "16US",
];

export const podSizes = ["1", "2", "3"];

export function getSizes(item: DatabaseItem): string[] {
    const fullSizeModels = [
        "Yeezy Foam RNR",
        "Yeezy Slide",
        "Yeezy 450 Slide",
        "Yeezy Knit RNR Boot",
        "Yeezy NSLTD Boot",
    ];

    if (item.manufacturer === "YZY" && item.modelName === "Pods") {
        return podSizes;
    } else if (fullSizeModels.includes(item.modelName)) {
        return fullSizes;
    }

    return allSizes;
}

