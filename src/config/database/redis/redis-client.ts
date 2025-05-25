import { Redis } from "ioredis";

export default class RedisConfig {
  private static instance: Redis | null = null;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisConfig.instance) {
      RedisConfig.instance = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
        db: Number(process.env.REDIS_DB) || 0,

        retryStrategy: (times) => {
          if (times >= Number(process.env.REDIS_MAX_RETRIES) || 5) return null;
          return Math.min(times * 50, 2000);
        },

        maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || 5,
        enableReadyCheck: true,
      });

      RedisConfig.instance.on("connect", () => {
        console.log("Redis connected successfully");
      });

      RedisConfig.instance.on("error", (err) => {
        console.error("Redis connection error:", err);
      });
    }
    return RedisConfig.instance;
  }
}
