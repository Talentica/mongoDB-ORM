// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import teacherRoutes from './routes/teacher.routes';
// import studentRoutes from './routes/student.routes';

import { createConnection, getRepository } from 'orm';
import { Teacher } from './models/teacher.model';
import { Student } from './models/student.model';

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

const s = new Student();
s.id = 5;
s.name = 'student 5';

// const student = getRepository(Student);
// student.save([s]);

const t = new Teacher();
t.id = 5;
t.name = 'teacher 5';
t.student = s;

const teacher = getRepository(Teacher);
teacher.save([t]);
