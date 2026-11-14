import { loadEnv } from "@hookrelay/shared";

export function register() {
    console.log("register called", process.env.REDIS_URL)
    loadEnv()
}