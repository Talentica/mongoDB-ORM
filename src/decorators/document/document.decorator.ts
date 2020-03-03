import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { FieldMetadata } from '../../metadata/field.metadata';
import * as mongoose from 'mongoose';
import { RelationMetadata } from '../../metadata/relation.metadata';
import {
    insertRelatedProps,
    prepareData,
    Promises,
    prepareDataArray,
} from './document.helper';

export function document(options: DocumentOptions) {
    return (target: Function) => {
        const MongooseModel = createModel(target, options.name);
        const repo = Object.create(MongooseModel);

        repo.create = async (data: Object): Promise<mongoose.Document> => {
            const dataCopy = Object.assign({}, data);
            const promises = insertRelatedProps(dataCopy, target);
            const preparedData = await prepareData(dataCopy, promises);
            return MongooseModel.create(preparedData);
        };

        repo.insertMany = async (
            data: Object[],
        ): Promise<mongoose.Document[]> => {
            const dataCopy = data.map((item) => Object.assign({}, item));
            const promisesArray: Promises[] = []; // refactor
            dataCopy.forEach((item) => {
                const promises = insertRelatedProps(item, target);
                promisesArray.push(promises);
            });
            const preparedData = await prepareDataArray(
                dataCopy,
                promisesArray,
            );
            return MongooseModel.insertMany(preparedData);
        };

        repo.findTest = (obj?: any) => {
            // koushik
            const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                target,
            );
            return relationMetadatas.forEach(
                async (relationMetadata: RelationMetadata) => {
                    if (relationMetadata.embedded) {
                        return MongooseModel.find(obj);
                    }
                    if (relationMetadata.eager && !relationMetadata.embedded) {
                        // TODO get data from other collection and display with the current collection
                        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                            relationMetadata.relatedClass,
                        );

                        const relatedCollectionRepo = collectionMetadata.repo;

                        const collectionData = await MongooseModel.find(obj);
                        collectionData.map(async (item) => {
                            console.log(
                                'relatedCollectionData  --->>> ',
                                await relatedCollectionRepo.find(),
                            );
                            // const relatedCollectionData: mongoose.Document[] = await relatedCollectionRepo.findById(
                            //     item[relationMetadata.targetCollection]._id,
                            // );
                            // collectionData[
                            //     relationMetadata.targetCollection
                            // ] = relatedCollectionData;
                        });
                        return collectionData;
                    }
                },
            );
        };

        repo.delete = () => {
            // jeetu
        };

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
