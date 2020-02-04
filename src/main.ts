import * as mongoose from 'mongoose';
export * from './decorators/document/document.decorator';
export * from './decorators/field/field.decorator';

export function createConnection(uris: string, options?: mongoose.ConnectionOptions) {
    options = options || { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(uris, options)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to database!');
    });
}