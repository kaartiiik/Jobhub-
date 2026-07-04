require("dotenv").config();

const { Worker } = require("bullmq");
const {redisConnection,} = require("../providers/redisProvider");
const {JOB_QUEUE_NAME,} = require("../queues/jobQueue");
const {createJobRecord,} = require("../services/jobService");

const worker = new Worker(
  JOB_QUEUE_NAME,
  async (job) => {
    const {
      recruiterId,
      jobData,
    } = job.data;

    const createdJob =
      await createJobRecord({
        ...jobData,
        recruiterId,
      });

    return createdJob.toJSON();
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(
    `Create job ${job.id} completed`
  );
});

worker.on("failed", (job, error) => {
  console.error(
    `Create job ${job?.id} failed:`,
    error.message
  );
});

console.log(
  `Job worker running on ${JOB_QUEUE_NAME}`
);
