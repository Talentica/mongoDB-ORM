import { document, field } from 'orm';

@document({ name: 'company' })
export class Company {

    @field({ type: 'Number', required: true })
    id: number;

    @field({ type: 'String', required: true })
    name: string;
}
