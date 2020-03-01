import { createConnection, getRepository } from 'orm';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { Banking } from './models/bank_details.model';

function getDbUrl() {
    let dbUrl = '';
    dbUrl = 'mongodb://localhost:27017/fancy-orm';
    // dbUrl = 'mongodb+srv://satyendra-singh-talentica:@nonym0us@cluster0-3lp3s.mongodb.net/test?retryWrites=true&w=majority';
    // dbUrl = 'mongodb+srv://koushik:koushik@cluster0-br4jq.mongodb.net/test?retryWrites=true&w=majority';
    return dbUrl;
}

createConnection(getDbUrl());

const profile = new Profile();
profile.age = 33;
profile.home = 'Brooklyn';

const banking = new Banking();
banking.account = '1122334455';
banking.branch = 'NY';

const user = new User();
user.name = 'Peter';
user.email = 'peter@example.com';
user.profile = profile;
user.banking = banking;

const userRepo = getRepository<User>(User);
const { lastPromise, foo } = userRepo.insertOne(user) as any;
console.log(lastPromise, foo);
