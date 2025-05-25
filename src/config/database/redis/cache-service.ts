import { Redis } from "ioredis";
import RedisConfig from "./redis-client";

export default class CacheService {
  private static instance: CacheService;
  private redisClient: Redis;

  private constructor() {
    this.redisClient = RedisConfig.getInstance();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  async setCache(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) await this.redisClient.setex(key, ttl, value);
      else await this.redisClient.set(key, value);
    } catch (error) {
      console.error("Error setting cache:", error);
      throw error;
    }
  }

  async getCache(key: string): Promise<string | null> {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (error) {
      console.error("Error getting cache:", error);
      throw error;
    }
  }
  
  async deleteCache(key: string): Promise<boolean> {
    try {
      const result = await this.redisClient.del(key);
      return result === 1;
    } catch (error) {
      console.error("Error deleting cache:", error);
      throw error;
    }
  }
}
