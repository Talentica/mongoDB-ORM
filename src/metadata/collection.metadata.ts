import * as mongoose from 'mongoose';

export class CollectionMetadata {
    target: Function;
    name: string;
    model: mongoose.Model<any>;
    repo;

    constructor(
        target: Function,
        name: string,
        model: mongoose.Model<any>,
        repo: any,
    ) {
        this.target = target;
        this.name = name;
        this.model = model;
        this.repo = repo;
    }
}
