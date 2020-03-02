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

const profile1 = new Profile();
profile1.age = 1;
profile1.home = 'Home 1';

const banking1 = new Banking();
banking1.account = '1';
banking1.branch = 'Branch 1';

const user1 = new User();
user1.name = 'Name 1';
user1.email = 'name1@example.com';
user1.profile = profile1;
user1.banking = banking1;

const profile2 = new Profile();
profile2.age = 2;
profile2.home = 'Home 2';

const banking2 = new Banking();
banking2.account = '2';
banking2.branch = 'Branch 2';

const user2 = new User();
user2.name = 'Name 2';
user2.email = 'name2@example.com';
user2.profile = profile2;
user2.banking = banking2;

const users = [user1, user2];

const userRepo = getRepository<User>(User);
userRepo.insertMany(users).then((r) => console.log(r, users));
