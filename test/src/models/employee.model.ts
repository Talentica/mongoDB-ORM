import { document, field } from 'orm';

@document({ name: 'employee' })
export class Employee {

    @field({ type: 'Number', required: true })
    id: number;

    @field({ type: 'String', required: true })
    name: string;
}
