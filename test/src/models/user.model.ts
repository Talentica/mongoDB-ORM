import { document, field, oneToOne } from 'orm';
import { Profile } from './profile.model';
import { Banking } from './bank_details.model';

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
        embedded: true,
        type: 'Object',
    })
    profile: Profile;

    @oneToOne({
        targetCollection: 'banking',
        relatedClass: Banking,
        cascade: true,
        eager: true,
        embedded: true,
        type: 'Object',
    })
    banking: Banking;
}
