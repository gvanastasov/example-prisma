const PrismaClient = require("@prisma/client");

const prisma = new PrismaClient.PrismaClient();

async function clearAllTables() {
    const tables = [
        PrismaClient.Prisma.ModelName.User,
        PrismaClient.Prisma.ModelName.Post,
    ];
    try {
        await prisma.$executeRaw("PRAGMA foreign_keys = OFF;");

        await Promise.all(tables.map(x => prisma.$executeRaw(`DELETE FROM ${x};`)));

        await prisma.$executeRaw("PRAGMA foreign_keys = ON;");

        console.log("All tables cleared successfully.");
    } catch (error) {
        console.error("Error clearing tables:", error);
    } finally {
        await prisma.$disconnect();
    }
}

clearAllTables();