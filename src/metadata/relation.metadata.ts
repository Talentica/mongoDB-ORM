export class RelationMetadata {

    target: Function;
    propertyName: string;
    targetCollection: string;
    relatedClass: Function;
    embedded: boolean;
    eager: boolean;
    cascade: boolean;
    type: Object;

    constructor(
        target: Function,
        propertyName: string,
        targetCollection: string,
        relatedClass: Function,
        embedded: boolean,
        eager: boolean,
        cascade: boolean,
        type: Object,
    ) {
        this.target = target;
        this.propertyName = propertyName;
        this.targetCollection = targetCollection;
        this.relatedClass = relatedClass;
        this.embedded = embedded;
        this.eager = eager;
        this.cascade = cascade;
        this.type = type;
    }
}
