export class RelationMetadata {

    target: Function;
    propertyName: string;
    targetCollection: any;
    embedded: boolean;
    eager: boolean;
    cascade: boolean;
    type: string;

    constructor(
        target: Function,
        propertyName: string,
        targetCollection: any,
        embedded: boolean,
        eager: boolean,
        cascade: boolean,
        type: string,
    ) {
        this.target = target;
        this.propertyName = propertyName;
        this.targetCollection = targetCollection;
        this.embedded = embedded;
        this.eager = eager;
        this.cascade = cascade;
        this.type = type;
    }
}
