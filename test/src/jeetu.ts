import { createConnection, getRepository } from 'orm';
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

const userRepo = getRepository<User>(User);

const profile = new Profile();
profile.age = 30;
profile.home = 'New York';

const user = new User();
user.name = 'Penny1234';
user.email = 'penny@example.com';
user.profile = profile;

userRepo.create(user).then((r) => {
    userRepo.deleteOne({ name: 'Penny1234' }).then((res) => console.log('deleted', res, user));
});
