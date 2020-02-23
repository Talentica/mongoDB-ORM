export interface OneToOneOptions {
    fieldName?: string;
    targetCollection: any;
    embedded?: boolean;
    eager?: boolean;
    cascade?: boolean;
    type?: string;
}
