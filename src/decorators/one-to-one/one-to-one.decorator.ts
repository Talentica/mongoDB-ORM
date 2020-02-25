import { OneToOneOptions } from './one-to-one.options';
import { RelationMetadata } from '../../metadata/relation.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';

export function OneToOne(options: OneToOneOptions) {
    return (object: Object, propertyName: string) => {
        const metadata = new RelationMetadata(
            object.constructor,
            propertyName,
            options.targetCollection,
            options.embedded,
            options.eager,
            options.cascade,
            options.type,
        );

        defaultMetadataStorage.addRelationMetadata(metadata);
    };
}
