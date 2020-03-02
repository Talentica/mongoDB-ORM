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
profile.age = 11;
profile.home = 'Home 11';

const banking = new Banking();
banking.account = '11111';
banking.branch = 'Branch 11';

const user = new User();
user.name = 'Name 11';
user.email = 'name11@example.com';
user.profile = profile;
user.banking = banking;

const userRepo = getRepository<User>(User);
userRepo.create(user).then((r) => console.log(r, user));
