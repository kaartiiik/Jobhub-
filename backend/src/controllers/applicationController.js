const fs = require("fs");
const applicationService = require("../services/applicationService");

const applyJob = async (
  req,
  res
) => {
  try {
    const application =
      await applicationService.applyJob(
        req.user.id,
        req.body.jobId,
        req.file
      );

    res.status(202).json({
      message:
        "Application queued successfully",
      application,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(400).json({
      message:
        error.message,
    });
  }
};

const getApplications =
  async (req, res) => {
    try {
      const applications =
        await applicationService.getApplications(
          req.user.id
        );

      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getRecruiterApplications =
  async (req, res) => {
    try {
      const applications =
        await applicationService.getRecruiterApplications(
          req.user.id
        );

      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const withdrawApplication =
  async (req, res) => {
    try {
      await applicationService.withdrawApplication(
        req.params.id,
        req.user.id
      );

      res.json({
        message:
          "Application withdrawn",
      });
    } catch (error) {
      res.status(400).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  applyJob,
  getApplications,
  getRecruiterApplications,
  withdrawApplication,
};
