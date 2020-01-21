import { field } from "./decorators/field";
import { document } from "./decorators/document";

@document
class Person {
  @field("string", true)
  fistname: string;

  @field("string", true)
  lastname: string;

  constructor(firstname: string, lastname: string) {
    this.fistname = firstname;
    this.lastname = lastname;
  }

  greet() {
    console.log(`hello, ${this.fistname} ${this.lastname}!`);
  }
}

const p: any = new Person("John", "Doe");
console.log(Person.toString());
p.greet();
// p.save();
// console.log(p.foo);
console.log(p.hello);
console.log(p.newProperty);
