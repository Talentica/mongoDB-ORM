import { CollectionMetadata } from './collection.metadata';
import { FieldMetadata } from './field.metadata';
import { RelationMetadata } from './relation.metadata';

/**
 * Stores all metadatas of all available types: collections, fields, relations, etc.
 */
export class MetadataStorage {
    private collectionMetadataMap: {
        [target: string]: CollectionMetadata;
    } = {};
    private fieldMetadatas: FieldMetadata[] = [];
    private relationMetadatas: RelationMetadata[] = [];

    addCollectionMetadata(metadata: CollectionMetadata) {
        this.collectionMetadataMap[metadata.target.name] = metadata;
    }

    addFieldMetadata(metadata: FieldMetadata) {
        this.fieldMetadatas.push(metadata);
    }

    addRelationMetadata(metadata: RelationMetadata) {
        this.relationMetadatas.push(metadata);
    }

    findCollectionMetadatasForClass(target: Function): CollectionMetadata {
        return this.collectionMetadataMap[target.name];
    }

    findFieldMetadatasForClass(target: Function): FieldMetadata[] {
        return this.fieldMetadatas.filter(
            (metadata) => metadata.target === target,
        );
    }

    findRelationMetadatasForClass(target: Function): RelationMetadata[] {
        return this.relationMetadatas.filter(
            (metadata) => metadata.target === target,
        );
    }
}

export let defaultMetadataStorage = new MetadataStorage();
