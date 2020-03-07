import { User } from './models/user.model';
// import { Profile } from './models/profile.model';
import { createConnection, getRepository } from 'orm';

function getDbUrl() {
    let dbUrl = '';
    // dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    dbUrl =
        'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}

createConnection(getDbUrl());

const userRepo = getRepository<User>(User);

// const profile = new Profile();
// profile.age = 30;
// profile.home = 'Denver';

// const user = new User();
// user.name = 'Jaime';
// user.email = 'jaime@example.com';
// user.profile = profile;

/**
 * {name:'koushik'}
 * {email:'test@gmail.com'}
 * {name:'koushik',email:'test@gmail.com'}
 * {name:'koushik',email:'test@gmail.com',profile:1} // embedded:false
 * {name:'koushik',email:'test@gmail.com',profile:{age:'21',home:'test'}} //embedded:true
 */

const id = '5e5e89865029e1194599a935'; // TODO : pick an id from your db
// userRepo.findById2(id);
const findResult = userRepo.find({ name: 'Thor' });
const findOneResult = userRepo.findOne({ name: 'Thor' });
const findByIdResult = userRepo.findById('5e6085c8df69e22a00128091');

// console.log('Result --->>> ', result);
// findResult.then((data) => console.log('Dtata --->>> ', data));

// findOneResult.then((data) => console.log('Find One Result', data));

findByIdResult.then((data) => console.log('Find By Id Result', data));
