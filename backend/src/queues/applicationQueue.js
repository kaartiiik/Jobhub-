const { Queue } = require("bullmq");
const {redisConnection,} = require("../providers/redisProvider");

const APPLICATION_QUEUE_NAME =
  "application-queue";

const applicationQueue = new Queue(
  APPLICATION_QUEUE_NAME,
  {
    connection: redisConnection,
  }
);

applicationQueue.on("error", (error) => {
  console.error(
    "Application queue error:",
    error.message
  );
});

const addApplicationJob = (
  candidateId,
  jobId,
  resume
) => {
  return applicationQueue.add(
    "apply-job",
    {
      candidateId,
      jobId,
      resume,
    },
    {
      jobId: `apply:${candidateId}:${jobId}`,
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
  APPLICATION_QUEUE_NAME,
  applicationQueue,
  addApplicationJob,
};
