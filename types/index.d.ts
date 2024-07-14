export type DatabaseItem = {
    id: number;
    displayName: string;
    imageLink: string;
    manufacturer: string;
    modelName: string;
    color: string;
    retailPrice: number;
};

export type CollectionItem = {
    item: DatabaseItem;
    size: string;
};

export type CollectionEntry = {
    id: number;
    created_at: string;
    title: string;
    items: number[];
    url: string;
    sizes: string[];
};

type Collection = {
    collectionItems: CollectionItem[];
    groupedItems: CollectionItem[][];
    title: string;
    url: string;
    createdAt: string;
};

