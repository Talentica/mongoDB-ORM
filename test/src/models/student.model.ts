import { document, field } from 'orm';

@document({ name: 'student' })
export class Student {

    @field({ type: 'Number', required: true })
    id: number;

    @field({ type: 'String', required: true })
    name: string;
}
