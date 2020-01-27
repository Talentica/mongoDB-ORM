import * as mongoose from 'mongoose';
import { createCollection } from 'orm';
import { Person } from './models/person.model';

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // createCollection(mongoose, [Person]);

    const schema = new mongoose.Schema({
        name: String,
    });
    const model = mongoose.model('cat', schema);

    console.log('--------');
});
