import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository } from 'orm';
import teacherRoutes from './routes/teacher.routes';
import studentRoutes from './routes/student.routes';
import { Teacher } from './models/teacher.model';

// createConnection('mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority');
// createConnection('mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority');
createConnection('mongodb://localhost:27017/orm-test');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/teachers', teacherRoutes);
// app.use('/students', studentRoutes);

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}!`);
// });

const t = new Teacher();
t.name = 'Koushik 2 ';

const repo = getRepository(Teacher);
repo.save([t]);
// repo.save([t]);
