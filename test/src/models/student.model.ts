import { document, field } from 'orm';

@document({ name: 'student' })
export class Student {

    @field({ type: 'String', required: true })
    name: string;

    @field({ type: 'Number', required: true })
    age: number;
}
