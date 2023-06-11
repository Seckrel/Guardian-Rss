import redis, { RedisClientType } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisConnectionURL: string = `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB_NUMBER}`;
// const redisConnectionURL: string = `redis://redis:${process.env.REDIS_PORT || "6379"}`

let redisClient: RedisClientType;
(async () => {
  redisClient = redis.createClient({ url: redisConnectionURL });

  redisClient.on("error", (error) => console.error(`Error 2 : ${error}`));

  await redisClient.connect();
})();

export { redisClient };
