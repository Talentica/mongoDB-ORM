import * as mongoose from 'mongoose';

export interface Repository<Entity> {
    create: (entity: Entity) => Promise<mongoose.Document>;
    intertMany: (entities: Entity[]) => Promise<mongoose.Document[]>;
    find: (entity: Entity) => mongoose.DocumentQuery<mongoose.Document[], mongoose.Document, {}>;
    findOne: (entity: Entity) => mongoose.DocumentQuery<mongoose.Document, mongoose.Document, {}>;
    findById2: (id: string) => mongoose.DocumentQuery<mongoose.Document, mongoose.Document, {}>;
    // find: (entity: Partial<Entity>) => any;
    save: (entity: Entity) => Entity;
    deleteOne: (obj: any) => mongoose.DocumentQuery<any, any, any>;
}
