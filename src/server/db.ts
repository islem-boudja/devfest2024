import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

import { env } from "~/env";

const redis = createClient({
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_URL,
    port: parseInt(env.REDIS_PORT, 10),
  },
});

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

export { redis };
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
