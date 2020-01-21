import { document, field } from "./decorators";

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

  getFullName() {
    return `${this.fistname} ${this.lastname}`
  }
}

const p = new Person('A', 'B')
const p2 = new Person('C', 'D')
