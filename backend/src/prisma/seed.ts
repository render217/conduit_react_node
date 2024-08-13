import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import fs from "node:fs";
const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash("test@123", 10);

    // Generate 10 users
    const users = await Promise.all(
        Array.from({ length: 10 }).map(() => {
            return prisma.user.create({
                data: {
                    username: faker.internet.userName(),
                    email: faker.internet.email(
                        faker.name.firstName().toLowerCase(),
                        faker.name.lastName().toLowerCase(),
                        "gmail.com"
                    ),
                    password: passwordHash,
                    bio: faker.lorem.sentence(),
                    image: faker.image.avatar(),
                },
            });
        })
    );

    //
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");
    console.log("saved user to users.json");
    // Generate 5 articles for each user with related tags and comments
    await Promise.all(
        users.map(async (user) => {
            for (let i = 0; i < 5; i++) {
                const article = await prisma.article.create({
                    data: {
                        title: faker.lorem.sentence(),
                        slug: faker.lorem.slug(),
                        description: faker.lorem.paragraph(),
                        body: faker.lorem.paragraphs(3),
                        authorId: user.id,
                        tags: {
                            create: [
                                { content: faker.lorem.word() },
                                { content: faker.lorem.word() },
                            ],
                        },
                    },
                    include: {
                        tags: true,
                    },
                });

                // Create 3 comments for each article
                await prisma.comment.createMany({
                    data: Array.from({ length: 3 }).map(() => ({
                        body: faker.lorem.sentence(),
                        authorId:
                            users[Math.floor(Math.random() * users.length)].id,
                        articleId: article.id,
                    })),
                });
            }
        })
    );

    console.log("Seeding completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
