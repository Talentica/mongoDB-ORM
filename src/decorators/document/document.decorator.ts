import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { FieldMetadata } from '../../metadata/field.metadata';
import * as mongoose from 'mongoose';
import { RelationMetadata } from '../../metadata/relation.metadata';
import { insertRelatedProps, prepareData, Promises, prepareDataArray } from './document.helper';

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

        repo.insertMany = async (data: Object[]): Promise<mongoose.Document[]> => {
            const dataCopy = data.map((item) => Object.assign({}, item));
            const promisesArray: Promises[] = []; // refactor
            dataCopy.forEach((item) => {
                const promises = insertRelatedProps(item, target);
                promisesArray.push(promises);
            });
            const preparedData = await prepareDataArray(dataCopy, promisesArray);
            return MongooseModel.insertMany(preparedData);
        };

        repo.find = async (obj?: any): Promise<mongoose.Document[]> => {
            // koushik
            return new Promise(async (resolve) => {
                const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                    target,
                );

                relationMetadatas.forEach(async (relationMetadata: RelationMetadata) => {
                    if (relationMetadata.embedded) {
                        return await MongooseModel.find(obj);
                    }
                    if (relationMetadata.eager && !relationMetadata.embedded) {
                        // TODO get data from other collection and display with the current collection
                        console.log('Test');
                        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                            relationMetadata.relatedClass,
                        );

                        const relatedCollectionRepo = collectionMetadata.model;

                        const collectionData = await MongooseModel.find(obj);

                        collectionData.map(async (item) => {
                            const relatedCollectionData: mongoose.Document[] = await relatedCollectionRepo.findById(
                                item[relationMetadata.targetCollection]._id,
                            );
                            collectionData[
                                relationMetadata.targetCollection
                            ] = relatedCollectionData;
                        });
                        resolve(collectionData);
                    }
                });
            });
        };

        repo.findOne = async (obj?: any): Promise<mongoose.Document> => {
            // koushik
            return new Promise(async (resolve) => {
                const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                    target,
                );

                relationMetadatas.forEach(async (relationMetadata: RelationMetadata) => {
                    if (relationMetadata.embedded) {
                        return await MongooseModel.findOne(obj);
                    }
                    if (relationMetadata.eager && !relationMetadata.embedded) {
                        // TODO get data from other collection and display with the current collection
                        console.log('Test');
                        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                            relationMetadata.relatedClass,
                        );

                        const relatedCollectionRepo = collectionMetadata.model;

                        const collectionData = await MongooseModel.findOne(obj);
                        const relatedCollectionData: mongoose.Document[] = await relatedCollectionRepo.findById(
                            collectionData[relationMetadata.targetCollection]._id,
                        );
                        collectionData[relationMetadata.targetCollection] = relatedCollectionData;
                        resolve(collectionData);
                    }
                });
            });
        };

        repo.findById = async (id: string): Promise<mongoose.Document> => {
            // koushik
            return new Promise(async (resolve) => {
                const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                    target,
                );

                relationMetadatas.forEach(async (relationMetadata: RelationMetadata) => {
                    if (relationMetadata.embedded) {
                        return await MongooseModel.findById(id);
                    }
                    if (relationMetadata.eager && !relationMetadata.embedded) {
                        // TODO get data from other collection and display with the current collection
                        console.log('Test');
                        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                            relationMetadata.relatedClass,
                        );

                        const relatedCollectionRepo = collectionMetadata.model;

                        const collectionData = await MongooseModel.findById(id);
                        const relatedCollectionData: mongoose.Document[] = await relatedCollectionRepo.findById(
                            collectionData[relationMetadata.targetCollection]._id,
                        );
                        collectionData[relationMetadata.targetCollection] = relatedCollectionData;
                        resolve(collectionData);
                    }
                });
            });
        };

        repo.deleteOne = async (obj: any) => {
            function deleteChildDocuments(): Promise<boolean> {
                return new Promise(async (resolve) => {
                    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                        target,
                    );
                    const size = relationMetadatas.length;
                    if (!size) {
                        resolve(false);
                    }

                    const parentDocuments = await MongooseModel.findOne(obj);

                    if (parentDocuments) {
                        console.log('found parent docs', parentDocuments);
                        relationMetadatas.forEach(
                            async (relationMetadata: RelationMetadata, index) => {
                                if (relationMetadata.cascade) {
                                    const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                                        relationMetadata.relatedClass,
                                    );

                                    const relatedCollectionModel = collectionMetadata.model;
                                    const propertyName = relationMetadata.propertyName;

                                    const result = await relatedCollectionModel.deleteOne({
                                        _id: parentDocuments[propertyName]._id,
                                    });
                                    console.log('deleted', result, propertyName);
                                }

                                if (index === size - 1) {
                                    resolve(true);
                                }
                            },
                        );
                    } else {
                        console.log('No parent docs found');
                        resolve(true);
                    }
                });
            }
            const deleted = await deleteChildDocuments();
            console.log('deleted children, returning', deleted);
            return MongooseModel.deleteOne(obj);
        };

        repo.deleteMany = async (obj: any) => {
            function execDelete(relatedCollectionModel, item, propertyName) {
                return new Promise(async (resolve, reject) => {
                    relatedCollectionModel
                        .deleteOne({
                            _id: item[propertyName]._id,
                        })
                        .then((res) => {
                            console.log('deleted', res, propertyName);
                            resolve();
                        })
                        .catch((err) => {
                            console.log('Some Error Occured!', err);
                            reject();
                        });
                });
            }

            function deleteChildDocuments(): Promise<boolean> {
                return new Promise(async (resolve) => {
                    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
                        target,
                    );

                    const size = relationMetadatas.length;
                    if (!size) {
                        resolve(false);
                    }

                    const parentDocuments = await MongooseModel.find(obj);
                    if (parentDocuments) {
                        console.log('found parent docs', parentDocuments);
                        relationMetadatas.forEach(
                            async (relationMetadata: RelationMetadata, index) => {
                                if (relationMetadata.cascade) {
                                    const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
                                        relationMetadata.relatedClass,
                                    );
                                    const relatedCollectionModel = collectionMetadata.model;
                                    const propertyName = relationMetadata.propertyName;

                                    let promises = [];
                                    parentDocuments.forEach((item) => {
                                        promises.push(
                                            execDelete(relatedCollectionModel, item, propertyName),
                                        );
                                    });

                                    await Promise.all(promises)
                                        .then((res) => {
                                            if (index === size - 1) resolve(true);
                                        })
                                        .catch((err) => console.log('Error Occured', err));
                                }
                            },
                        );
                    } else {
                        console.log('No parent docs found');
                        resolve(true);
                    }
                });
            }
            const deleted = await deleteChildDocuments();
            console.log('deleted children, returning', deleted);
            return MongooseModel.deleteMany(obj);
        };

        const metaData = new CollectionMetadata(target, options.name, MongooseModel, repo);
        defaultMetadataStorage.addCollectionMetadata(metaData);
    };
}

function createModel(constructor: Function, name: string) {
    const fieldMetadatas = defaultMetadataStorage.findFieldMetadatasForClass(constructor);
    const fieldData = {};
    fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
        fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
    });

    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(constructor);
    relationMetadatas.forEach((relationMetadata: RelationMetadata) => {
        fieldData[relationMetadata.propertyName] = relationMetadata.type;
    });

    const schema = new mongoose.Schema(fieldData, { collection: name });
    return mongoose.model(name, schema);
}
