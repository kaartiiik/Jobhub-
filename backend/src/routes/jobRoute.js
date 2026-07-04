const express = require("express");

const router = express.Router();

const { createJob,getAllJobs,getJobById,updateJob,deleteJob} = require("../controllers/jobController");

const authenticateUser = require("../middlewares/authMiddleware");

const authorizeRole = require("../middlewares/roleMiddleware");

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.put(
  "/:id",
  authenticateUser,
  authorizeRole("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRole("recruiter"),
  deleteJob
);

router.post(
  "/",
  authenticateUser,
  authorizeRole("recruiter"),
  createJob
);

module.exports = router;
