import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { createConnection, getRepository } from 'orm';

function getDbUrl() {
    let dbUrl = '';
    dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    dbUrl =
        'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}

createConnection(getDbUrl());

// const profile = new Profile();
// profile.age = 30;
// profile.home = 'Denver';

// const user = new User();
// user.name = 'Jaime';
// user.email = 'jaime@example.com';
// user.profile = profile;

const userRepo = getRepository<User>(User);

/**
 * {name:'koushik'}
 * {email:'test@gmail.com'}
 * {name:'koushik',email:'test@gmail.com'}
 * {name:'koushik',email:'test@gmail.com',profile:1} // embedded:false
 * {name:'koushik',email:'test@gmail.com',profile:{age:'21',home:'test'}} //embedded:true
 */

const data = userRepo.findTest({ name: 'Jaime3' });

// const data1 = data.then((res) => { return res });

console.log('userRepo -->> ', userRepo);

setTimeout(() => console.log('Data --->>> ', data), 10000);

// userRepo.insertOne
