const { Queue } = require("bullmq");
const { redisConnection,} = require("../providers/redisProvider");

const JOB_QUEUE_NAME = "job-queue";

const jobQueue = new Queue(
  JOB_QUEUE_NAME,
  {
    connection: redisConnection,
  }
);

jobQueue.on("error", (error) => {
  console.error(
    "Job queue error:",
    error.message
  );
});

const addCreateJob = (
  recruiterId,
  jobData
) => {
  return jobQueue.add(
    "create-job",
    {
      recruiterId,
      jobData,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};

module.exports = {
  JOB_QUEUE_NAME,
  jobQueue,
  addCreateJob,
};
