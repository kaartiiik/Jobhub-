const express =require("express");

const router =express.Router();

const {saveJob,getSavedJobs,removeSavedJob} = require("../controllers/savedJobController");

const authenticateUser =require("../middlewares/authMiddleware");

const authorizeRole =require("../middlewares/roleMiddleware");

router.post("/",authenticateUser,authorizeRole("candidate"),saveJob);

router.get("/",authenticateUser,authorizeRole("candidate"),getSavedJobs);

router.delete("/:id",authenticateUser,authorizeRole("candidate"),removeSavedJob);

module.exports = router;
