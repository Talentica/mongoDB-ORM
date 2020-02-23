import * as mongoose from 'mongoose';

export class RelationMetadata {

    target: Function;
    fieldName: string;
    targetCollection: any;
    embedded: boolean;
    eager: boolean;
    cascade: boolean;
    type: string;

    constructor(
        target: Function,
        fieldName: string,
        targetCollection: any,
        embedded: boolean,
        eager: boolean,
        cascade: boolean,
        type: string,
    ) {
        this.target = target;
        this.fieldName = fieldName;
        this.targetCollection = targetCollection;
        this.embedded = embedded;
        this.eager = eager;
        this.cascade = cascade;
        this.type = type;
    }
}
