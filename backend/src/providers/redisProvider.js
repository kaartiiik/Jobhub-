const IORedis = require("ioredis");

const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  password:
    process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
};

const createRedisClient = () => {
  const client = new IORedis({
    host: redisConnection.host,
    port: redisConnection.port,
    password: redisConnection.password,
    connectTimeout: 1000,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy:() =>null,
    lazyConnect: true,
  });

  client.on("error", (error) => {
    console.error(
      "Redis connection error:",
      error.message
    );
  });

  return client;
};

let redisClient = createRedisClient();

const getRedisClient = async () => {
  if (redisClient.status === "ready") {
    return redisClient;
  }

  if (redisClient.status === "end") {
    redisClient = createRedisClient();
  }

  if (redisClient.status === "wait") {
    await redisClient.connect();
  }

  return redisClient;
};

module.exports = {
  redisConnection,
  getRedisClient,
};
