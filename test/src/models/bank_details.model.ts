import { document, field } from 'orm';

@document({ name: 'banking' })
export class Banking {
    @field({ type: 'String', required: true })
    account: string;

    @field({ type: 'String', required: true })
    branch: string;
}
