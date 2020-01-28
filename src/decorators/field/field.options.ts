import { FieldType } from './field.types';

export interface FieldOptions {

    /**
     * Field type. Must be one of the value from the FieldType class.
     */
    type: FieldType;

    required?: boolean;
}
