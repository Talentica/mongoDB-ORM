import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { FieldMetadata } from '../../metadata/field.metadata';
import { Document, DocumentQuery, Schema, model } from 'mongoose';
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

        repo.create = async (data: Object): Promise<Document> => {
            const dataCopy = Object.assign({}, data);
            const promises = insertRelatedProps(dataCopy, target);
            const preparedData = await prepareData(dataCopy, promises);
            return MongooseModel.create(preparedData);
        };

        repo.insertMany = async (data: Object[]): Promise<Document[]> => {
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

        repo.find = (data?: Object) => {
            return MongooseModel.find(data);
        };

        repo.findById2 = async (id: string) => {
            const promise: any = MongooseModel.findById(id);
            const user: any = await promise;
            const profileId = user.profile._id.toString();

            const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                target,
            );
            relationMetadatas.forEach(
                async (relationMetadata: RelationMetadata) => {
                    const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                        relationMetadata.relatedClass,
                    );
                    const relatedCollectionRepo = collectionMetadata.model;
                    const property = relationMetadata.propertyName;
                    if (property === 'profile') {
                        const t = await relatedCollectionRepo.findById(
                            profileId,
                        );
                        console.log(t);
                    }
                },
            );
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

        repo.deleteOne = (obj: any) => {
            const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                target,
            );

            relationMetadatas.forEach(
                async (relationMetadata: RelationMetadata) => {
                    if (relationMetadata.cascade === true) {
                        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                            relationMetadata.relatedClass,
                        );

                        const relatedCollectionRepo = collectionMetadata.model;
                        const propertyName = relationMetadata.propertyName;

                        const collectionData = await MongooseModel.find(obj);

                        collectionData.forEach((item) => {
                            relatedCollectionRepo
                                .deleteOne({
                                    _id: item[propertyName]._id,
                                })
                                .then((res) => console.log(res))
                                .catch((err) => console.log(err));
                        });

                        MongooseModel.deleteOne(obj)
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                    } else {
                    }
                },
            );
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
    });

    const schema = new Schema(fieldData, { collection: name });
    return model(name, schema);
}
