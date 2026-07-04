const {SavedJob, Job} = require("../../database/models");

const saveJob = async (
  candidateId,
  jobId
) => {
  const job =
    await Job.findByPk(jobId);

  if (!job)
    throw new Error(
      "Job not found"
    );

  const exists =
    await SavedJob.findOne({
      where: {
        candidateId,
        jobId,
      },
    });

  if (exists)
    throw new Error(
      "Job already saved"
    );

  return await SavedJob.create({
    candidateId,
    jobId,
  });
};

const getSavedJobs =
  async (candidateId) => {
    return await SavedJob.findAll({
      where: {
        candidateId,
      },
      include: ["job"],
    });
  };

const removeSavedJob =
  async (
    id,
    candidateId
  ) => {
    const saved =
      await SavedJob.findByPk(id);

    if (!saved)
      throw new Error(
        "Saved job not found"
      );

    if (
      saved.candidateId !==
      candidateId
    )
      throw new Error(
        "Unauthorized"
      );

    await saved.destroy();
  };

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};
