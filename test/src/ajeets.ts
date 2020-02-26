import { createConnection, getRepository } from 'orm';
// import { Teacher } from './models/teacher.model';
// import { Student } from './models/student.model';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';

function getDbUrl() {
    let dbUrl = '';
    dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    // dbUrl = 'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}

createConnection(getDbUrl());

const profile = new Profile();
profile.age = 30;
profile.home = 'New York';

const user = new User();
user.name = 'Penny';
user.email = 'penny@example.com';
user.profile = profile;

const userRepo = getRepository<User>(User);
userRepo.insertOne(user);
console.log(userRepo.find);

// const s = new Student();
// s.age = 20;
// s.name = 'Rio';

// const t = new Teacher();
// t.age = 30;
// t.name = 'Helsinki';
// t.student = s;

// const teacher = getRepository<Teacher>(Teacher);
// teacher.insertOne(t);

/**
 * The Object.assign() method copies all enumerable own properties
 * from one or more source objects to a target object.
 * It returns the target object.
 */
