export function field(dataType: string) {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('I will make field of dataType', dataType)
    console.log('target: ', target)
    console.log('propertyKey: ', propertyKey)
    console.log('descriptor: ', descriptor)
  }
}
