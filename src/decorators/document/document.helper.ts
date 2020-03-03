import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { RelationMetadata } from 'src/metadata/relation.metadata';
import { Document } from 'mongoose';

export interface Promises {
    [property: string]: Promise<Document[]>;
}

export function insertRelatedProps(data: Object, target: Function) {
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

        promises[property] = relatedCollectionRepo.create(data[property]);
    });
    return promises;
}

export function prepareData(data: Object, promises: Promises): Promise<Object> {
    const dataCopy = Object.assign({}, data);
    const size = Object.keys(promises).length;

    return new Promise((resolve) => {
        if (!Object.keys(promises).length) {
            resolve(dataCopy);
        } // TODO else needed or not?
        Object.keys(promises).forEach(async (property, index) => {
            const result = await promises[property];
            dataCopy[property] = result;
            if (index === size - 1) {
                resolve(dataCopy);
            }
        });
    });
}

export function prepareDataArray(
    data: Object[],
    promisesArray: Promises[],
): Promise<Object[]> {
    const dataCopy = data.map((item) => Object.assign({}, item));
    const size1 = promisesArray.length;

    return new Promise((resolve) => {
        if (!size1) {
            resolve(dataCopy);
        } // TODO else needed or not?
        promisesArray.forEach((promises, index) => {
            const size2 = Object.keys(promises).length;

            if (index === size1 - 1 && !size2) {
                resolve(dataCopy);
            } // TODO else needed or not?

            Object.keys(promises).forEach(async (property, propIndex) => {
                const result = await promises[property];
                dataCopy[index][property] = result;

                if (index === size1 - 1 && propIndex === size2 - 1) {
                    resolve(dataCopy);
                }
            });
        });
    });
}
