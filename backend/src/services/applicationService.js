const { Application, Job, User } = require("../../database/models");
const {
  addApplicationJob,
} = require("../queues/applicationQueue");

const applyJob = async (
  candidateId,
  jobId,
  resumeFile
) => {
  const parsedJobId = Number(jobId);

  if (
    !Number.isInteger(parsedJobId)
  ) {
    throw new Error(
      "Invalid job id"
    );
  }

  if (!resumeFile) {
    throw new Error(
      "Resume is required"
    );
  }

  const job =
    await Job.findByPk(parsedJobId);

  if (!job) {
    throw new Error(
      "Job not found"
    );
  }

  const alreadyApplied =
    await Application.findOne({
      where: {
        candidateId,
        jobId: parsedJobId,
      },
    });

  if (alreadyApplied) {
    throw new Error(
      "Already applied"
    );
  }

  const queueJob =
    await addApplicationJob(
      candidateId,
      parsedJobId,
      {
        resumeUrl: `/uploads/resumes/${resumeFile.filename}`,
        resumeOriginalName:
          resumeFile.originalname,
      }
    );

  return {
    queued: true,
    queueJobId: queueJob.id,
    candidateId,
    jobId: parsedJobId,
    resumeUrl: `/uploads/resumes/${resumeFile.filename}`,
  };
};

const getApplications =
  async (candidateId) => {
    return await Application.findAll({
      where: {
        candidateId,
      },
      include: [
        {
          model: Job,
          as: "job",
        },
        {
          model: User,
          as: "candidate",
          attributes: [
            "id",
            "name",
            "email",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  };

const getRecruiterApplications =
  async (recruiterId) => {
    return await Application.findAll({
      include: [
        {
          model: Job,
          as: "job",
          where: {
            recruiterId,
          },
        },
        {
          model: User,
          as: "candidate",
          attributes: [
            "id",
            "name",
            "email",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  };

const withdrawApplication =
  async (
    id,
    candidateId
  ) => {
    const application =
      await Application.findByPk(id);

    if (!application) {
      throw new Error(
        "Application not found"
      );
    }

    if (
      application.candidateId !==
      candidateId
    ) {
      throw new Error(
        "Unauthorized"
      );
    }

    await application.destroy();
  };

module.exports = {
  applyJob,
  getApplications,
  getRecruiterApplications,
  withdrawApplication,
};
