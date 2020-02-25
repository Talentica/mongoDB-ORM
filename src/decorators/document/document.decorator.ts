import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { FieldMetadata } from 'src/metadata/field.metadata';
import * as mongoose from 'mongoose';
import { RelationMetadata } from 'src/metadata/relation.metadata';

/**
 * This decorator is used to mark classes that they gonna be Collections.
 */
export function document(options: DocumentOptions) {
    return (target: Function) => {
        const MongooseModel = createModel(target, options.name);

        const repo = Object.assign({}, MongooseModel, {
            save: (x) => {
                /**
                 * hanlde onetoone save
                 * use metadata
                 */
                console.log('In Save, here: handle oneToOne save');
                MongooseModel.insertMany(x);
            },
        });

        const metaData = new CollectionMetadata(
            target,
            options.name,
            MongooseModel,
            repo,
        );
        defaultMetadataStorage.addCollectionMetadata(metaData);
    };
}

function createModel(constructor: Function, name: string) {
    const fieldMetadatas = defaultMetadataStorage.findFieldMetadatasForClass(
        constructor,
    );
    // console.log(fieldMetadatas);
    const fieldData = {};
    fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
        fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
    });

    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
        constructor,
    );
    // console.log(relationMetadatas);
    relationMetadatas.forEach((relationMetadata: RelationMetadata) => {
        fieldData[relationMetadata.propertyName] = {
            type: mongoose.Schema.Types.ObjectId,
            ref: relationMetadata.targetCollection,
        };
    });

    const schema = new mongoose.Schema(fieldData, { collection: name });
    return mongoose.model(name, schema);
}
