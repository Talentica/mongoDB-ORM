import * as express from 'express';
import * as bodyParser from 'body-parser';
import teacherRoutes from './routes/teacher.routes';
import studentRoutes from './routes/student.routes';
import { createConnection } from 'orm';

createConnection(getDbUrl());

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

function getDbUrl() {
    let dbUrl = '';
    dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    // dbUrl = 'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}
