import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { RelationMetadata } from 'src/metadata/relation.metadata';
import { Document } from 'mongoose';

interface Promises {
    [property: string]: Promise<Document[]>;
}

export function insertRelatedProps(data: any, target: Function) {
    const promises: Promises = {};
    const relationMetadatas = defaultMetadataStorage.findRelationMetadatasForClass(
        target,
    );

    relationMetadatas.forEach(async (relationMetadata: RelationMetadata) => {
        const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(
            relationMetadata.relatedClass,
        );
        const relatedCollectionRepo = collectionMetadata.repo;
        const property = relationMetadata.propertyName;

        promises[property] = relatedCollectionRepo.insertMany([data[property]]);
    });
    return promises;
}

export function prepareData(data: any, promises: Promises): Promise<any> {
    const dataCopy = Object.assign({}, data);
    const size = Object.keys(promises).length;

    return new Promise((resolve) => {
        Object.keys(promises).forEach(async (property, index) => {
            const [result] = await promises[property];
            dataCopy[property] = result;

            if (index === size - 1) {
                resolve(dataCopy);
            }
        });
    });
}
