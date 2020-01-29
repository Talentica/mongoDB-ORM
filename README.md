# mongoDB-ORM

## Installation

```bash
$ npm install
```

## Running the app

test folder in the main folder contains a test project. Use the below steps to run the app :

```
cd mongoDB-ORM/
npm run build
npm link

cd test/
npm link orm
npm run start:dev
```

## Other commands :

```bash
# development
$ npm start

# development - watch mode
$ npm run start:dev

# lint
$ npm run lint

# build
$ npm run build

# test
$ npm run test

# test - watch mode
$ npm run test:watch

# coverage
$ npm run test:cov
```

## Tasks

-   Add mongoose: done
-   Connect to mongodb: done
-   Create collection through decorator: done
-   Users should be able to use methods like 'save', 'findOne' etc
-   Get the work reviewed

## Backlog

-   /decorators/ create decorator for creating @document and @field
-   /services/
