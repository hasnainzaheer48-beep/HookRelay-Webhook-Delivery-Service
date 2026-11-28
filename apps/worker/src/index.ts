import {loadEnv, workerRedis} from '@hookrelay/shared';

const env = loadEnv();

try {
  console.log("checking redis...");
  const reply = await workerRedis.ping();
  console.log("redis:", reply);
} catch (err) {
  console.error("worker cannot reach redis:", err);
  process.exit(1);
}

console.log("worker started, database host: ", new URL(env.DATABASE_URL).host);