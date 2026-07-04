const fs = require("fs");
const path = require("path");
const multer = require("multer");

const resumeUploadDir = path.join(
  __dirname,
  "../../uploads/resumes"
);

fs.mkdirSync(resumeUploadDir, {
  recursive: true,
});

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(
      file.originalname
    );
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only PDF, DOC, and DOCX resumes are allowed"
    )
  );
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadResumeFile = (
  req,
  res,
  next
) => {
  uploadResume.single("resume")(
    req,
    res,
    (error) => {
      if (!error) {
        return next();
      }

      if (
        error instanceof
        multer.MulterError
      ) {
        return res.status(400).json({
          message:
            error.code ===
            "LIMIT_FILE_SIZE"
              ? "Resume must be 5MB or less"
              : error.message,
        });
      }

      return res.status(400).json({
        message: error.message,
      });
    }
  );
};

module.exports = {
  uploadResume,
  uploadResumeFile,
};
