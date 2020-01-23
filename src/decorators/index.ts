import * as mongoose from 'mongoose';
import { Collection, TypeConstructor } from './interfaces';
import '../database';

let collection: Collection = {
    name: '',
    fields: [],
};

export function document<T extends { new (...args: any[]) }>(constructor: T) {
    collection.name = constructor.name;
    createCollection();
    resetCollection();
    return class extends constructor {};
}

export function field(type: TypeConstructor, required: boolean) {
    return (target: any, name: string) => {
        collection.fields.push({
            name,
            type,
            required,
        });
    };
}

function createCollection() {
    console.log('Creating collection: ', collection);
    const Model = createModel();
    Model.createCollection().then((collection: any) => {
        console.log('Created collection: ', collection.name);
    });
}

function createModel() {
    const name = collection.name;
    const schema = createSchema();
    return mongoose.model(name, schema);
}

function createSchema() {
    const definition = {};
    collection.fields.forEach((field) => {
        definition[field.name] = field.type;
    });
    return new mongoose.Schema(definition);
}

function resetCollection() {
    collection = {
        name: '',
        fields: [],
    };
}
