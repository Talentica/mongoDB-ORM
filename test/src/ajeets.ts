import { createConnection, getRepository } from 'orm';
import { Teacher } from './models/teacher.model';
import { Student } from './models/student.model';

createConnection('mongodb://localhost:27017/orm-test');

const s = new Student();
s.id = 7;
s.name = 'student 7';

// const student = getRepository(Student);
// student.save([s]);

const t = new Teacher();
t.id = 7;
t.name = 'teacher 7';
t.student = s;

const teacher = getRepository(Teacher);
teacher.insertOne(t);
