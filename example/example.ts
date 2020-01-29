import { connect } from 'src/main';
import { Person } from './models/person.model';

connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(c => {
    console.log('done');
});
