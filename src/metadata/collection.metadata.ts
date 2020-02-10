import * as mongoose from 'mongoose';

export class CollectionMetadata {

    target: Function;
    name: string;
    model: mongoose.Model<any>;

    constructor(
        target: Function,
        name: string,
        model: mongoose.Model<any>,
    ) {
        this.target = target;
        this.name = name;
        this.model = model;
    }
}
