export class Repository<Entity> {

    private mongooseModel;

    constructor(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }

    find(): Entity[] {
        // do find
        return [];
    }

    save(entity: Entity): Entity {
        // do save
        return entity;
    }
}
