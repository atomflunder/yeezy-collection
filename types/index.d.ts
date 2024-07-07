export type DatabaseItem = {
    id: string;
    displayName: string;
    imageLink: string;
    manufacturer: string;
    modelName: string;
    color: string;
};

export type CollectionItem = {
    item: DatabaseItem;
    size: string;
};

