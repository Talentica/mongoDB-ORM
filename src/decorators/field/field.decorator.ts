import { FieldOptions } from './field.options';
import { FieldMetadata } from '../../metadata/field.metadata';
import { defaultMetadataStorage } from '../../metadata/metadata.storage';

/**
 * This decorator is used to mark class properties as document fields.
 */
export function field(options: FieldOptions) {
    return (object: Object, propertyName: string) => {
        const metadata = new FieldMetadata(object.constructor, propertyName, options.type);
        defaultMetadataStorage.addFieldMetadata(metadata);
    };
}
