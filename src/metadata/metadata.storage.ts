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

    findCollectionMetadatasForClasses(classes: Function[]): CollectionMetadata[] {
        return this.collectionMetadatas.filter(metadata => classes.indexOf(metadata.target) !== -1);
    }

    findFieldMetadatasForClasses(classes: Function[]): FieldMetadata[] {
        return this.fieldMetadatas.filter(metadata => classes.indexOf(metadata.target) !== -1);
    }
}

export let defaultMetadataStorage = new MetadataStorage();
