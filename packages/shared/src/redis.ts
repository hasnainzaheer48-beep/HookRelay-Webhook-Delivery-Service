import Redis from "ioredis";


const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not set");
}

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};


export const redis =
  globalForRedis.redis ??
  new Redis(redisUrl, {
    lazyConnect: true,
    connectTimeout: 1000,
    maxRetriesPerRequest:2 ,
  });

redis.on("error", (err) => {
  console.error(err)
});

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}