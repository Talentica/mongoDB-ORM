import { document, field, oneToOne } from 'orm';
import { Profile } from './profile.model';

@document({ name: 'user' })
export class User {

    @field({ type: 'String', required: true })
    name: string;

    @field({ type: 'String', required: true })
    email: string;

    @oneToOne({
        targetCollection: 'profile',
        relatedClass: Profile,
        cascade: true,
        eager: true,
        embedded: false,
        type: 'Object',
    })
    profile: Profile;
}
