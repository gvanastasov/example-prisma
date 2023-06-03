# **Example Prisma**

Example application showcasing the capabilities of Prisma ORM and schema management. Prisma saves you time by simplifying DB queries, management, and design, providing a native interface for your application. It offers powerful features such as schema management, migrations, and modeling.

Key terms:
1. Prisma Migrate - is used schema management for your db.
2. Prisma Client - is used for query interaction with the db.
3. Prisma Studio - is used for visual interaction/edit of the db.

## **Prerequisites**

Before getting started, ensure that you have the following prerequisites installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- sqlite3

## **Workflow**

1. Install express.
2. Install prisma.
3. Optional: Install prisma extension to your IDE if avaiable (example in VSCode), helps with highlights and syntax for the prisma schema file.
4. Configure prisma (greenfield project aka. from scratch)
   - adding schema config: generator, datasource, models
5. Create db init migration step
6. Create ui for demo
7. Create experimentation scripts
8. Inspect Prisma Studio
9. Added json schema generator as secondary output from prisma.schema, which is then used (post transformation) into [swagger docs merging strategy](./plugins/swagger.js).

```sh
npx prisma migrate dev --name init
```
Note: this will automatically run the prisma generators too, unless we add a --skip-generate flag. By default prisma-client is generated inside '.\node_modules\@prisma\client'. This will be ignored from git and not pushed to remote. So remember to invoke the following when before you start the project (or switch branches with schema differences, to get the most up-to-date client).:

```sh
npx prisma generate
```

## **Features**

- prisma migrations - schema management, migrations, modeling etc.
- prisma seeding - script for seeding the database
- prisma clearing tables - script for clearing the tables inside the database
- prisma renaming columns - a 4 step process:
   1. Add new (renamed) column with same type and constraints - schema update
   2. Run custom script to transfer column data - data duplication
   3. Drop old column - schema update
   4. Update all references
- prisma backup - creates a db backup.
- prisma json schema generator and transformer to OA3 for swagger

## **Usage**

1. Start the app
```sh
npm run start
```
2. Access the application's UI by visiting http://localhost:3000/.

To try out the built-in UI from prisma (Prisma Studio):
```sh
npx prisma studio
```

To clear db manually via script:
```sh
npm run db:clear
```

To seed db manually via script - seeding is done via fakerjs:
```sh
npm run db:seed
```
## **License**
This project is licensed under the [MIT License](./LICENSE).

## **Acknowledgements**
- Prisma - https://www.prisma.io/
- Express - https://expressjs.com/