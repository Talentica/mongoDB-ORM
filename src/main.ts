import { defaultMetadataStorage } from './metadata/metadata.storage';
import { FieldMetadata } from './metadata/field.metadata';
import * as mongoose from 'mongoose';
export * from './decorators/document/document.decorator';
export * from './decorators/field/field.decorator';

import mongodb = require('mongodb');

export async function connect(uris: string, options: any): Promise<mongoose.Mongoose>;
export async function connect(uris: string, callback: (err: mongodb.MongoError) => void): Promise<mongoose.Mongoose>;
export async function connect(uris: string, options: any, callback: (err: mongodb.MongoError) => void): Promise<mongoose.Mongoose>;

export async function connect(uris: string, options?: any, callback?: (err: mongodb.MongoError) => void): Promise<mongoose.Mongoose> {
    let mongooseConnect = mongoose.connect(uris, options, callback);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected...!');
    });
    console.log(defaultMetadataStorage.getAllCollectionMetadata());
    return mongooseConnect;
}



function createCollection(documents: Function[]) {
    if (documents && documents.length) {
        documents.forEach((document) => {
            const [collectionMetadata] = defaultMetadataStorage.findCollectionMetadatasForClass(document);
            const fieldMetadatas = defaultMetadataStorage.findFieldMetadatasForClass(document);

            const fieldData = {};
            fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
                fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
            });
            const schema = new mongoose.Schema(fieldData);
            const model = mongoose.model(collectionMetadata.name, schema);
            model.createCollection().then((collection: any) => {
                console.log('Created collection: ', collection.name);
            });
        });
    }
}
