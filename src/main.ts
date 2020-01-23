import { document, field } from './decorators';

@document
class Person {
  @field('string', true)
  firstname: string;

  @field('string', true)
  lastname: string;

  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

const p = new Person('A', 'B');
const p2 = new Person('C', 'D');
