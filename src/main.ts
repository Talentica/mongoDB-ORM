import { document, field } from './decorators';

@document
class Users {
    @field(String, true)
    name: string;

    @field(Number, true)
    age: number;
}

@document
class Accounts {
    @field(Number, true)
    id: number;

    @field(String, true)
    name: string;
}

@document
class Products {
    @field(Number, true)
    id: number;

    @field(String, true)
    code: string;
}
