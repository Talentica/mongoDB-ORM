import { OneToOneType } from './one-to-one.types';

export interface OneToOneOptions {
    fieldName?: string;
    targetCollection: string;
    relatedClass: Function;
    embedded?: boolean;
    eager?: boolean;
    cascade?: boolean;
    type: OneToOneType;
}
