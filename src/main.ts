import * as mongoose from 'mongoose';
import { defaultMetadataStorage } from './metadata/metadata.storage';
import { Repository } from './repository';
export * from './decorators/document/document.decorator';
export * from './decorators/field/field.decorator';
export * from './decorators/one-to-one/one-to-one.decorator';

export function createConnection(uris: string, options?: mongoose.ConnectionOptions) {
    options = options || { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(uris, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to database!');
    });
}

export function getRepository<Entity>(entityClass: Function): Repository<Entity> {
    const collectionMetadata = defaultMetadataStorage.findCollectionMetadatasForClass(entityClass);
    if (collectionMetadata && collectionMetadata.model) {
        return collectionMetadata.repo;
        // return new Repository(collectionMetadata.model);
    }
}
