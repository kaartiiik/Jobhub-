require("dotenv").config();

const { Worker } = require("bullmq");
const { Application, Job } = require("../../database/models");
const {redisConnection,} = require("../providers/redisProvider");
const {APPLICATION_QUEUE_NAME,} = require("../queues/applicationQueue");
const {
  addApplicantEvent,
} = require("../services/applicantStatsService");
const {
  clearJobsCache,
} = require("../services/jobService");

const worker = new Worker(
  APPLICATION_QUEUE_NAME,
  async (job) => {
    const { candidateId, jobId, resume } = job.data;

    const existingApplication =
      await Application.findOne({
        where: {
          candidateId,
          jobId,
        },
      });

    if (existingApplication) {
      return existingApplication.toJSON();
    }

    const jobRecord =
      await Job.findByPk(jobId);

    if (!jobRecord) {
      throw new Error("Job not found");
    }

    const application =
      await Application.create({
        candidateId,
        jobId,
        resumeUrl:
          resume?.resumeUrl,
        resumeOriginalName:
          resume?.resumeOriginalName,
      });

    await addApplicantEvent(
      jobId,
      application.id
    );

    await clearJobsCache();

    return application.toJSON();
  },
  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(
    `Application job ${job.id} completed`
  );
});

worker.on("failed", (job, error) => {
  console.error(
    `Application job ${job?.id} failed:`,
    error.message
  );
});

console.log(
  `Application worker running on ${APPLICATION_QUEUE_NAME}`
);
