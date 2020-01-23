import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/morm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
