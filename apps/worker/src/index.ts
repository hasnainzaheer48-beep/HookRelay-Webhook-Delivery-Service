import {loadEnv} from '@hookrelay/shared';

const env = loadEnv();
console.log("worker started, database host: ", new URL(env.DATABASE_URL).host);