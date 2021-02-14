// Setup Redis DB
import redis from 'redis';
import { promisify } from 'util';
import { Env } from '../config/env';

const { redis_db_url: dbUrl } = Env.all();

// @ts-ignore
const redisClient = redis.createClient({ url: dbUrl });

redisClient.on('connect', function () {
  console.log('Redis connected successfully');
});
redisClient.on('error', function () {
  console.log('Error connecting to redis');
});

export class RedisSetup {

  public promisifyCommands() {
    // Convert callbacks for redis into promise
    const setRedisKey = promisify(redisClient.set).bind(redisClient);
    const getRedisKey = promisify(redisClient.get).bind(redisClient);
    const redisKeyExist = promisify(redisClient.exists).bind(redisClient);
    const getRedisKeyTTL = promisify(redisClient.ttl).bind(redisClient);
    const expireRedisKey = promisify(redisClient.expire).bind(redisClient);

    return {
      setRedisKey,
      getRedisKey,
      redisKeyExist,
      getRedisKeyTTL,
      expireRedisKey
    };
  }
}
