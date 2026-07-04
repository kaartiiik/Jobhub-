const savedJobService = require("../services/savedJobService");

const saveJob = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  try {
    const saved = await savedJobService.saveJob(
      req.user.id,
      req.body.jobId
    );

    res.status(201).json(saved);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

const getSavedJobs =
  async (req, res) => {
    const jobs =
      await savedJobService.getSavedJobs(
        req.user.id
      );

    res.json(jobs);
  };

const removeSavedJob =
  async (req, res) => {
    await savedJobService.removeSavedJob(
      req.params.id,
      req.user.id
    );

    res.json({
      message:
        "Removed Successfully",
    });
  };

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};