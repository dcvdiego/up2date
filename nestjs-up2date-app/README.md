## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## IMPORTANT

Due to sensitive data I have added ormconfig.json in the .gitignore file, but this is used for migrations.

To replicate you must enter this code:

```json
  [{
    "name": "dev",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": ADD YOUR PASSWORD HERE,
    "database": "up2date",
    "entities": ["dist/**/entities/*{.ts,.js}"],
    "synchronize": true,
    "migrations": ["dist/migrations/*{.ts,.js}"],
    "cli": {
      "migrationsDir": "src/migrations"
    }
  },
  {
    "name": "prod",
    "type": "mysql",
    "host": "mysqldb",
    "port": 3306,
    "username": "root",
    "password": ADD YOUR PASSWORD HERE,
    "database": "up2date",
    "entities": ["dist/**/entities/*{.ts,.js}"],
    "synchronize": true,
    "migrations": ["dist/migrations/*{.ts,.js}"],
    "cli": {
      "migrationsDir": "src/migrations"
    }
  }
]
```

For the mysql database you must create a new one and then set the password yourself
