export class CollectionMetadata {

    target: Function;
    name: string;

    constructor(
        target: Function,
        name: string,
    ) {
        this.target = target;
        this.name = name;
    }
}
