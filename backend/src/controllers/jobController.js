const jobService = require("../services/jobService");

const createJob = async (req, res) => {
  try {
    const job =
      await jobService.queueCreateJob(
        req.user.id,
        req.body
      );

    res.status(202).json({
      message:
        "Job creation queued successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs =
      await jobService.getAllJobs();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job =
      await jobService.getJobById(
        req.params.id
      );

    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const updateJob = async (
  req,
  res
) => {
  try {
    const job =
      await jobService.updateJob(
        req.params.id,
        req.user.id,
        req.body
      );

    res.status(200).json({
      message:
        "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message:
        error.message,
    });
  }
};

const deleteJob = async (
  req,
  res
) => {
  try {
    await jobService.deleteJob(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      message:
        "Job deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message:
        error.message,
    });
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob, updateJob
};
