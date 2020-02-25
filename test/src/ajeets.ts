import { createConnection, getRepository } from 'orm';
import { Teacher } from './models/teacher.model';
import { Student } from './models/student.model';

createConnection(getDbUrl());

const s = new Student();
s.id = 100;
s.name = 'Rio';

const t = new Teacher();
t.id = 200;
t.name = 'Helsinki';
t.student = s;

const teacher = getRepository<Teacher>(Teacher);
teacher.insertOne(t);

function getDbUrl() {
    let dbUrl = '';
    dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    // dbUrl = 'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}