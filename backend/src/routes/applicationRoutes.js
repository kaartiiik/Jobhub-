const express = require("express");

const router =
  express.Router();

const {
  applyJob,
  getApplications,
  getRecruiterApplications,
  withdrawApplication,
} = require("../controllers/applicationController");

const authenticateUser = require("../middlewares/authMiddleware");

const authorizeRole = require("../middlewares/roleMiddleware");
const {
  uploadResumeFile,
} = require("../middlewares/uploadMiddleware");

router.post(
  "/",
  authenticateUser,
  authorizeRole("candidate"),
  uploadResumeFile,
  applyJob
);

router.get(
  "/",
  authenticateUser,
  authorizeRole("candidate"),
  getApplications
);

router.get(
  "/recruiter",
  authenticateUser,
  authorizeRole("recruiter"),
  getRecruiterApplications
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRole("candidate"),
  withdrawApplication
);

module.exports = router;
