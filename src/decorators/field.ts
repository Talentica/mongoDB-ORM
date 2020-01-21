export function field(type: string, required: boolean) {
  return function(target: any, propertyKey: string) {
    console.log("-- create field --");
    console.log(type);
    console.log(required);
    console.log(target);
    console.log(propertyKey);
  };
}
