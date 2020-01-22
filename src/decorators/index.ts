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

// Add new property : Override (extend) the constructor
export function document<T extends { new(...args: any[]) }>(constructor: T) {
    collection.name = constructor.name;
    console.log(collection);
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

export function foo() {
    console.log('I am foo at decorators');
}

export function foo2() {
    console.log('I am foo2 at decorators');
}
