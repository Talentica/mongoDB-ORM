/**
 * The class decorator is applied to the constructor of the class
 * and can be used to observe, modify, or replace a class definition.
 *
 * If the class decorator returns a value, it will replace the class
 * declaration with the provided constructor function.
 */

interface Field {
    name: string;
    required: boolean;
}

interface Collection {
    name: string;
    fields: Field[];
}

const collection: Collection = {
    name: '',
    fields: [],
};

export function document<T extends { new(...args: any[]) }>(constructor: T) {
    collection.name = constructor.name;
    return class extends constructor {
        newProperty = 'new property';
    };
}

export function field(type: string, required: boolean) {
    return (target: any, propertyKey: string) => {
        collection.fields.push({
            name: propertyKey,
            required,
        });
    };
}
