const { Job } = require("../../database/models");
const {getRedisClient} = require("../providers/redisProvider");
const { addCreateJob,} = require("../queues/jobQueue");
const { getApplicantCount,} = require("./applicantStatsService");

const JOBS_CACHE_KEY =
  "jobs:all:with-applicant-count";
const JOBS_CACHE_TTL_SECONDS = Number(
  process.env.JOBS_CACHE_TTL_SECONDS ||
    60
);

const clearJobsCache = async () => {
  try {
    const redis = await getRedisClient();
    await redis.del(JOBS_CACHE_KEY);
  } catch (error) {
    console.error(
      "Failed to clear jobs cache:",
      error.message
    );
  }
};

const createJobRecord = async (jobData) => {
  const job = await Job.create(jobData);

  await clearJobsCache();

  return job;
};

const queueCreateJob = async (
  recruiterId,
  jobData
) => {
  const queueJob =
    await addCreateJob(
      recruiterId,
      jobData
    );

  return {
    queued: true,
    queueJobId: queueJob.id,
    recruiterId,
  };
};

const getAllJobs = async () => {
  try {
    const redis = await getRedisClient();
    const cachedJobs =
      await redis.get(JOBS_CACHE_KEY);

    if (cachedJobs) {
      return JSON.parse(cachedJobs);
    }
  } catch (error) {
    console.error(
      "Failed to read jobs cache:",
      error.message
    );
  }

  const jobs = await Job.findAll({
    order: [["createdAt", "DESC"]],
  });

  const serializedJobs =
    await Promise.all(
      jobs.map(async (job) => {
        const serializedJob =
          job.toJSON();

        return {
          ...serializedJob,
          applicantCount:
            await getApplicantCount(
              serializedJob.id
            ),
        };
      })
    );

  try {
    const redis = await getRedisClient();
    await redis.set(
      JOBS_CACHE_KEY,
      JSON.stringify(serializedJobs),
      "EX",
      JOBS_CACHE_TTL_SECONDS
    );
  } catch (error) {
    console.error(
      "Failed to write jobs cache:",
      error.message
    );
  }

  return serializedJobs;
};

const getJobById = async (id) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid job id");
  }

  const job = await Job.findByPk(parsedId);

  if (!job) {
    throw new Error("Job not found");
  }

  const serializedJob = job.toJSON();

  return {
    ...serializedJob,
    applicantCount:
      await getApplicantCount(
        serializedJob.id
      ),
  };
};
const updateJob = async (
  id,
  recruiterId,
  jobData
) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid job id");
  }

  const job = await Job.findByPk(parsedId);

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.recruiterId !== recruiterId) {
    throw new Error(
      "You are not authorized to update this job"
    );
  }

  await job.update(jobData);

  await clearJobsCache();

  return job;
};

const deleteJob = async (
  id,
  recruiterId
) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid job id");
  }

  const job = await Job.findByPk(parsedId);

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.recruiterId !== recruiterId) {
    throw new Error(
      "You are not authorized to delete this job"
    );
  }

  await job.destroy();

  await clearJobsCache();

  return;
};

module.exports = {
  queueCreateJob,
  createJobRecord,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
  clearJobsCache,
};
