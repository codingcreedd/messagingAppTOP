const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sessionStore = new PrismaSessionStore(
    prisma,
    {
        checkPeriod: 2 * 60 * 1000, // ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
    }
);

module.exports.sessionStore = sessionStore;
module.exports.prisma_client = prisma;