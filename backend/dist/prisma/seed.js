"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_fs_1 = __importDefault(require("node:fs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHash = yield bcrypt_1.default.hash("test@123", 10);
        // Generate 10 users
        const users = yield Promise.all(Array.from({ length: 10 }).map(() => {
            return prisma.user.create({
                data: {
                    username: faker_1.faker.internet.userName(),
                    email: faker_1.faker.internet.email(faker_1.faker.name.firstName().toLowerCase(), faker_1.faker.name.lastName().toLowerCase(), "gmail.com"),
                    password: passwordHash,
                    bio: faker_1.faker.lorem.sentence(),
                    image: faker_1.faker.image.avatar(),
                },
            });
        }));
        //
        node_fs_1.default.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf-8");
        console.log("saved user to users.json");
        // Generate 5 articles for each user with related tags and comments
        yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 5; i++) {
                const article = yield prisma.article.create({
                    data: {
                        title: faker_1.faker.lorem.sentence(),
                        slug: faker_1.faker.lorem.slug(),
                        description: faker_1.faker.lorem.paragraph(),
                        body: faker_1.faker.lorem.paragraphs(3),
                        authorId: user.id,
                        tags: {
                            create: [
                                { content: faker_1.faker.lorem.word() },
                                { content: faker_1.faker.lorem.word() },
                            ],
                        },
                    },
                    include: {
                        tags: true,
                    },
                });
                // Create 3 comments for each article
                yield prisma.comment.createMany({
                    data: Array.from({ length: 3 }).map(() => ({
                        body: faker_1.faker.lorem.sentence(),
                        authorId: users[Math.floor(Math.random() * users.length)].id,
                        articleId: article.id,
                    })),
                });
            }
        })));
        console.log("Seeding completed");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
