# mongoDB-ORM

## Trello Board

https://trello.com/b/cBxDDfz3/mongodb-orm

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

# ORM Features

## Decorators

---

### Document (on class)

to mark classes as database collections

parameters

- name: collection name
- strict-save: persist properties decorated with field decorator

---

### Index (on class)

to create index on the collection

---

### Field

to mark class properties as document fields

parameters

- type: field data type
- default: to keep default values if not provided
etc

---

### Relationship decorators (on class properties)

#### OneToOne

to establish one-to-one relation between target collection with this collection, using this field

#### OneToMany

to establish one-to-many relation between target collection with this collection, using this field

#### ManyToOne

to establish many-to-one relation between target collection with this collection, using this field

#### ManyToMany

to establish many-to-many relation between target collection with this collection, using this field

parameters

- target: target collection name
- embed: nature of embedding. true | false | partial
- eager: get data for the relationship when getting data for this collection. true | false. false by default.
- deleteCascade: delete related data.  true | false. false by default.

#### Caution handles

- cyclic dependency
- use lean

---