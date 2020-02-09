import { document, field } from 'orm';

@document({ name: 'teacher' })
export class Teacher {

    @field({ type: 'Number', required: true })
    id: number;

    @field({ type: 'String', required: true })
    name: string;
}
