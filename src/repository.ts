export class Repository<Entity> {

    private mongooseModel;

    constructor(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }

    insertOne(entity: Entity): Entity {
        return entity;
    }

    insertMany(entities: Entity[]): Entity[] {
        return entities;
    }

    findTest(entity?: Partial<Entity>): any {
        // do find
        return;
    }

    save(entity: Entity): Entity {
        // do save
        return entity;
    }
}
