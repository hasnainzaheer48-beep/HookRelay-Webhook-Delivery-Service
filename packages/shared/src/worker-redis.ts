import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not set");
}

export const workerRedis = new Redis(redisUrl, {
    lazyConnect: true,
    commandTimeout: 5000,
    maxRetriesPerRequest: null,
  });

workerRedis.on("error", (err) => {
  console.error(err)
});

