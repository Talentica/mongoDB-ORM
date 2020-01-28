import { defaultMetadataStorage } from './metadata/metadata.storage';
import { FieldMetadata } from './metadata/field.metadata';
export * from './decorators/document/document.decorator';
export * from './decorators/field/field.decorator';

export function createCollection(mongoose: any, documents: Function[]) {
    if (documents && documents.length) {
        documents.forEach((document) => {
            const [collectionMetadata] = defaultMetadataStorage.findCollectionMetadatasForClass(document);
            const fieldMetadatas = defaultMetadataStorage.findFieldMetadatasForClass(document);

            const fieldData = {};
            fieldMetadatas.forEach((fieldMetadata: FieldMetadata) => {
                fieldData[fieldMetadata.propertyName] = fieldMetadata.type;
            });

            console.log(fieldData);
            const schema = new mongoose.Schema(fieldData);
            console.log(schema);
            const model = mongoose.model(collectionMetadata.name, schema);
            console.log(model);
        });
        console.log('Created...!');
    }
}
