# example-prisma

Example application showing prismajs orm and schema management capabilities. In short, prisma saves you time, by not having to think too much about DB queries, DB management, DB design and provides you native interface for your app. Few things to know about prisma:

1. Prisma Migrate - is used schema management for your db.
2. Prisma Client - is used for query interaction with the db.

## Steps

1. Install express.
2. Install prisma.
3. Optional: Install prisma extension to your IDE if avaiable (example in VSCode), helps with highlights and syntax for the prisma schema file.
4. Configure prisma (greenfield project aka. from scratch)
   - adding schema config: generator, datasource, models
5. Create db init migration step

```sh
npx prisma migrate dev --name init
```

Note: this will automatically run the prisma generators too, unless we add a --skip-generate flag. By default prisma-client is generated inside '.\node_modules\@prisma\client'. This will be ignored from git and not pushed to remote. So remember to invoke the following when before you start the project (or switch branches with schema differences, to get the most up-to-date client).:

```sh
npx prisma generate
```

## Features

- prisma migrations - schema management, migrations, modeling etc.
- prisma seeding - script for seeding the database
- prisma clearing tables - script for clearing the tables inside the database
- prisma renaming columns - a 4 step process:
   1. Add new (renamed) column with same type and constraints - schema update
   2. Run custom script to transfer column data - data duplication
   3. Drop old column - schema update
   4. Update all references

## start

```sh
npm run start
```
