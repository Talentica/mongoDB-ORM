import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';
import { FieldMetadata } from 'src/metadata/field.metadata';
import * as mongoose from 'mongoose';

/**
 * This decorator is used to mark classes that they gonna be Collections.
 */
export function document(options: DocumentOptions) {
    return (target: Function) => {
        const model = createModel(target, options.name);
        const metaData = new CollectionMetadata(target, options.name, model);
        defaultMetadataStorage.addCollectionMetadata(metaData);
    };
}
// export function document(options: DocumentOptions) {
//     return function _document<T extends { new(...args: any[]) }>(constructor: T) {
//         const Model = createModel(constructor, options.name);
//         const metaData = new CollectionMetadata(constructor, options.name, Model);
//         defaultMetadataStorage.addCollectionMetadata(metaData);
//         return class extends constructor {
//             getModel = () => {
//                 return Model;
//             }
//         };
//     };
// }

function createModel(constructor: Function, name: string) {
    const fieldMetadatas = defaultMetadataStorage.findFieldMetadatasForClass(constructor);
    const fieldData = {};
    fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
        fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
    });
    const schema = new mongoose.Schema(fieldData, { collection: name });
    return mongoose.model(name, schema);
}
