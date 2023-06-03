const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient();

/**
 * @description naive clearing of tables, this needs update every time we add new tables,
 * reasong being the use of tag functions, where we cannot use interpolation of values
 * as it will break the args of the tag function.
 * 
 */
async function clearAllTables() {
    try {
        await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;

        await prisma.$executeRaw`DELETE FROM User;`;
        await prisma.$executeRaw`DELETE FROM Post;`;

        await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

        console.log("All tables cleared successfully.");
    } catch (error) {
        console.error("Error clearing tables:", error);
    } finally {
        await prisma.$disconnect();
    }
}

clearAllTables();