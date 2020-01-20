import { field } from './decorators/field'

class User {
  @field('string')
  hello() {
    console.debug("hello");
  }
}

const u = new User()
u.hello()
