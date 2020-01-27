import { DocumentOptions } from './document.options';
import { CollectionMetadata } from '../../metadata/collection.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';

/**
 * This decorator is used to mark classes that they gonna be Collections.
 */
export function Document(options: DocumentOptions) {
    console.log('In Document decorator');
    return (target: Function) => {
        const metadata = new CollectionMetadata(target, options.name);
        defaultMetadataStorage.addCollectionMetadata(metadata);
    };
}
