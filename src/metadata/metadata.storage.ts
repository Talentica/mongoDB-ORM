import { CollectionMetadata } from './collection.metadata';
import { FieldMetadata } from './field.metadata';

/**
 * Stores all metadatas of all available types: collections, fields, relations, etc.
 */
export class MetadataStorage {

    private collectionMetadatas: CollectionMetadata[] = [];
    private fieldMetadatas: FieldMetadata[] = [];

    addCollectionMetadata(metadata: CollectionMetadata) {
        this.collectionMetadatas.push(metadata);
    }

    addFieldMetadata(metadata: FieldMetadata) {
        this.fieldMetadatas.push(metadata);
    }

    findCollectionMetadatasForClass(target: Function): CollectionMetadata[] {
        return this.collectionMetadatas.filter(metadata => metadata.target === target);
    }

    findFieldMetadatasForClass(target: Function): FieldMetadata[] {
        return this.fieldMetadatas.filter(metadata => metadata.target === target);
    }
}

export let defaultMetadataStorage = new MetadataStorage();
