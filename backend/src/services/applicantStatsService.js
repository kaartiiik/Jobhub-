const {getRedisClient,} = require("../providers/redisProvider");

const TEN_DAYS_MS =
  10 * 24 * 60 * 60 * 1000;

const getBaseKey = (jobId) =>
  `jobs:${jobId}:applicants:base`;

const getRecentKey = (jobId) =>
  `jobs:${jobId}:applicants:recent`;

const getFallbackBaseCount = (jobId) => {
  const value = Number(jobId) || 1;

  return (value % 50) + 1;
};

const getOrCreateBaseCount =
  async (redis, jobId) => {
    const baseKey =
      getBaseKey(jobId);
    const existing =
      await redis.get(baseKey);

    if (existing) {
      return Number(existing);
    }

    const baseCount =
      Math.floor(
        Math.random() * 50
      ) + 1;

    await redis.set(
      baseKey,
      baseCount,
      "NX"
    );

    const stored =
      await redis.get(baseKey);

    return Number(stored);
  };

const getApplicantCount =
  async (jobId) => {
    try {
      const redis =
        await getRedisClient();
      const now = Date.now();
      const recentKey =
        getRecentKey(jobId);

      await redis.zremrangebyscore(
        recentKey,
        0,
        now - TEN_DAYS_MS
      );

      const [baseCount, recentCount] =
        await Promise.all([
          getOrCreateBaseCount(
            redis,
            jobId
          ),
          redis.zcount(
            recentKey,
            now - TEN_DAYS_MS,
            now
          ),
        ]);

      return (
        Number(baseCount) +
        Number(recentCount)
      );
    } catch (error) {
      console.error(
        "Failed to get applicant count:",
        error.message
      );

      return getFallbackBaseCount(
        jobId
      );
    }
  };

const addApplicantEvent =
  async (jobId, applicationId) => {
    try {
      const redis =
        await getRedisClient();
      const now = Date.now();
      const recentKey =
        getRecentKey(jobId);

      await redis.zadd(
        recentKey,
        now,
        `${applicationId}:${now}`
      );

      await redis.zremrangebyscore(
        recentKey,
        0,
        now - TEN_DAYS_MS
      );
    } catch (error) {
      console.error(
        "Failed to add applicant event:",
        error.message
      );
    }
  };

module.exports = {
  getApplicantCount,
  addApplicantEvent,
};