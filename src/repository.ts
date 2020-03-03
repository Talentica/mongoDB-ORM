import { Document, DocumentQuery } from 'mongoose';
// export class Repository<Entity> {

//     private mongooseModel;

//     constructor(mongooseModel) {
//         this.mongooseModel = mongooseModel;
//     }

//     insertOne(entity: Entity): Entity {
//         return entity;
//     }

//     insertMany(entities: Entity[]): Entity[] {
//         return entities;
//     }

//     findTest(entity?: Partial<Entity>): any {
//         // do find
//         return;
//     }

//     save(entity: Entity): Entity {
//         // do save
//         return entity;
//     }
// }

export interface Repository<Entity> {
    create: (entity: Entity) => Promise<Document>;
    intertMany: (entities: Entity[]) => Promise<Document[]>;
    find: (entity: Entity) => DocumentQuery<Document[], Document, {}>;
    findById2: (id: string) => DocumentQuery<Document, Document, {}>;
    findTest: (entity: Partial<Entity>) => any;
    save: (entity: Entity) => Entity;
}
