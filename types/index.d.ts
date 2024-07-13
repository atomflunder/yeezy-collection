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

