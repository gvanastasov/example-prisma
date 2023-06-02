const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @description when renaming columns, existing data will be discarded, therefore
 * we need to run a script that duplicates the data into a new column before we 
 * drop it. Creating reusable script for this might be tricky. For most cases a 
 * custom pre-migration script is good enough. One can consider this as a starting
 * template.
 * 
 * @remark
 *      - the new column must already be part the schema and must have the same
 *        data type, as well as constraints.
 *      - the new column must have a different name (case insensitive, which an
 *        sqlite3 constraint).
 * 
 */
async function transferLastNameColumn() {
    try {
        const users = await prisma.$queryRaw("SELECT id, LastName FROM User;");

        for (const user of users) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    lastName: user.LastName,
                },
            });
        }

        console.log("Data transfer completed successfully.");
    } catch (error) {
        console.error("Error performing data transfer:", error);
    } finally {
        await prisma.$disconnect();
    }
}

transferLastNameColumn();
