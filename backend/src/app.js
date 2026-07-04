const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const authenticateUser = require("./middlewares/authMiddleware");
const authorizeRole = require("./middlewares/roleMiddleware");
const jobRoutes = require("./routes/jobRoute");
const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:4000",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

app.use("/applications", applicationRoutes);
app.use("/saved-jobs", savedJobRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.get("/recruiter-dashboard",authenticateUser,authorizeRole("recruiter"),
  (req, res) => {
    res.json({
      message:
        "Welcome Recruiter",
    });
  }
);
app.get("/profile", authenticateUser,
  (req, res) => {
    res.json({
      message:
        "Protected Route",
      user: req.user,
    });
  }
);
app.get("/", (req, res) => {
  res.json({
    message: "JobHub Backend Running",
  });
});

module.exports = app;
