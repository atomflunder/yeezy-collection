export type DatabaseItem = {
    id: string;
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

