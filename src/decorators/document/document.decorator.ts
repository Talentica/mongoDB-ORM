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
            insertOne: (obj: any) => {
                const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                    target,
                );
                relationMetadatas.forEach((relationMetadata: RelationMetadata) => {
                    const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                        relationMetadata.relatedClass,
                    );
                    const relatedCollectionRepo = collectionMetadata.repo;
                    const t = obj[relationMetadata.propertyName];
                    relatedCollectionRepo.insertMany([t]).then(result => {
                        const [resultObj] = result;
                        obj[relationMetadata.propertyName] = resultObj;
                        MongooseModel.insertMany([obj]);
                    });
                });
                // MongooseModel.insertMany([obj]); // TODO
            },

            insertMany: (data: any[]) => {
                return MongooseModel.insertMany(data);
            },

            find: () => {
                // koushik
            },

            delete: () => {
                // jeetu
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
    const fieldData = {};
    fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
        fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
    });

    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
        constructor,
    );
    relationMetadatas.forEach((relationMetadata: RelationMetadata) => {
        fieldData[relationMetadata.propertyName] = relationMetadata.type;
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: relationMetadata.targetCollection,
        // };
    });

    const schema = new mongoose.Schema(fieldData, { collection: name });
    return mongoose.model(name, schema);
}
