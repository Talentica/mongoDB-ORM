export class FieldMetadata {

    target: Function;
    propertyName: string;
    type: string;

    constructor(
        target: Function,
        propertyName: string,
        type: string,
    ) {
        this.target = target;
        this.propertyName = propertyName;
        this.type = type;
    }
}
