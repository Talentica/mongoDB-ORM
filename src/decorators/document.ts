/**
 * The class decorator is applied to the constructor of the class
 * and can be used to observe, modify, or replace a class definition.
 *
 * If the class decorator returns a value, it will replace the class
 * declaration with the provided constructor function.
 */

// class decorator
// export function document(constructor: Function) {
//   return constructor;
// }

// override the constructo: add new property
export function document<T extends { new (...args: any[]) }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

// export function document<T extends { new (...args: any[]) }>(constructor: T) {
//   return class extends constructor {
//     save() {
//       console.log("Save the document");
//     }
//   };
// }
