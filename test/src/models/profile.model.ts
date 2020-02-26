import { document, field } from 'orm';

@document({ name: 'profile' })
export class Profile {

    @field({ type: 'Number', required: true })
    age: number;

    @field({ type: 'String', required: true })
    home: string;
}
