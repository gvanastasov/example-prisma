const PrismaClient = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient.PrismaClient();

function getFakeModel(type, args) {
    const strategy = {
        [PrismaClient.Prisma.ModelName.User]: getFakeUser,
        [PrismaClient.Prisma.ModelName.Post]: getFakePost,
    };

    return strategy[type] && strategy[type](args);
}

/**
 * @returns {PrismaClient.User}
 */
function getFakeUser() {
    return {
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        LastName: faker.person.lastName(),
        email: faker.internet.email(), 
    };
}

/**
 * @returns {PrismaClient.Post}
 */
function getFakePost({ authorId }) {
    return {
        authorId,
        content: faker.lorem.paragraphs({ min: 1, max: 5 }),
        title: faker.lorem.words({ min: 3, max: 7 }),
        created: faker.date.past({ years: 1 }),
        published: true,
    };
}

async function seed() {
    console.log("Seeding started...");

    try {
        for (let index = 0; index < 10; index++) {
            const user = await prisma.user.create({
                data: getFakeModel(PrismaClient.Prisma.ModelName.User),
            });

            let posts = Array.from(
                { length: 10 }, 
                getFakeModel(
                    PrismaClient.Prisma.ModelName.Post, 
                    { authorId: user.id }
                )
            );

            await prisma.post.create( {
                data: posts
            });
        }
        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

seed()
    .then(() => {
        process.exit(0);
    })
    .catch(() => {
        process.exit(1);
    });