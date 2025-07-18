import { PrismaClient } from "../generated/prisma";
import { logger } from "./logging";

export const prismaClients = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

prismaClients.$on('query', (e: any) => {
    logger.info(e)
})

prismaClients.$on('error', (e: any) => {
    logger.error(e)
})

prismaClients.$on('info', (e: any) => {
    logger.info(e)
})

prismaClients.$on('warn', (e: any) => {
    logger.warn(e)
})
