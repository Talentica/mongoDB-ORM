export type TypeConstructor = StringConstructor | NumberConstructor;

export interface Field {
    name: string;
    type: TypeConstructor;
    required: boolean;
}

export interface Collection {
    name: string;
    fields: Field[];
}
