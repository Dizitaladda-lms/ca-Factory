const { PrismaClient } = require("@prisma/client");

// Reuse the same Prisma client across warm serverless invocations.
const prismaGlobal = globalThis;
const prisma = prismaGlobal.__prismaClient || new PrismaClient();
prismaGlobal.__prismaClient = prisma;

module.exports = prisma;
