"use client";

import {
  APPLICATION_TEXT,
} from "../constants/applicationStatus";

export default function ApplicationCard({
  application,
  handleWithdraw,
}) {
  const jobTitle =
    application.job?.title ||
    application.jobTitle ||
    "Untitled Job";

  const applicantName =
    application.candidate?.name ||
    application.name ||
    "Unknown applicant";

  const applicantEmail =
    application.candidate?.email ||
    application.email ||
    "No email available";

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="text-xl font-bold">
        {jobTitle}
      </h2>

      <p>
        {APPLICATION_TEXT.APPLICANT}:{" "}
        {applicantName}
      </p>

      <p>
        {APPLICATION_TEXT.EMAIL}:{" "}
        {applicantEmail}
      </p>


      <button
        onClick={() =>
          handleWithdraw(
            application.id
          )
        }
        className="mt-3 text-red-500"
      >
        {
          APPLICATION_TEXT.WITHDRAW
        }
      </button>
    </div>
  );
}
