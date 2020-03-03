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

const userRepo = getRepository<User>(User);

// user 1
const p1 = new Profile();
p1.age = 33;
p1.home = 'Brooklyn';

const b1 = new Banking();
b1.account = '3300';
b1.branch = 'Brooklyn Branch';

const u1 = new User();
u1.name = 'Captain America';
u1.email = 'captain.america@example.com';
u1.profile = p1;
u1.banking = b1;

// user 2
const p2 = new Profile();
p2.age = 35;
p2.home = 'Manhattan';

const b2 = new Banking();
b2.account = '3500';
b2.branch = 'Manhattan Branch';

const u2 = new User();
u2.name = 'Iron Man';
u2.email = 'iron_man@example.com';
u2.profile = p2;
u2.banking = b2;

userRepo
    .insertMany([u1, u2])
    .then((res) => console.log('ajeets: insertMany', res));

// user 3
const p3 = new Profile();
p3.age = 40;
p3.home = 'Melbourne';

const b3 = new Banking();
b3.account = '4000';
b3.branch = 'Melbourne Branch';

const u3 = new User();
u3.name = 'Thor';
u3.email = 'thor@example.com';
u3.profile = p3;
u3.banking = b3;

userRepo.create(u3).then((res) => console.log('ajeets: create', res));
