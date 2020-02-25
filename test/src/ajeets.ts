import { createConnection, getRepository } from 'orm';
import { Teacher } from './models/teacher.model';
import { Student } from './models/student.model';

createConnection('mongodb://localhost:27017/orm-test');

const s = new Student();
s.id = 8;
s.name = 'student 8';

// const student = getRepository(Student);
// student.save([s]);

const t = new Teacher();
t.id = 8;
t.name = 'teacher 8';
t.student = s;

const teacher = getRepository<Teacher>(Teacher);
teacher.insertOne(t);
