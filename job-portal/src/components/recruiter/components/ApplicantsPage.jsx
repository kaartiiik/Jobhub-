"use client";

import RoleGuard
from "@/components/auth/components/RoleGuard";

import useApplicants
from "../hooks/useApplicants";

import {
  RECRUITER_TABS,
}
from "../constants/recruiterTabs";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function ApplicantsPage() {
  const {
    applications,
  } = useApplicants();

  return (
    <RoleGuard
      allowedRoles={[
        "recruiter",
      ]}
    >
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">
          {
            RECRUITER_TABS.APPLICANTS
          }
        </h1>

        {applications.length === 0 ? (
          <p>
            {
              RECRUITER_TABS.NO_APPLICATIONS
            }
          </p>
        ) : (
          applications.map(
            (application) => (
              <div
                key={application.id}
                className="border rounded-lg p-4 mb-4"
              >
                <h2 className="text-xl font-bold">
                  {
                    application.candidate
                      ?.name ||
                    "Unknown applicant"
                  }
                </h2>

                <p>
                  {
                    application.candidate
                      ?.email ||
                    "No email available"
                  }
                </p>

                <p>
                  Applied For:{" "}
                  {
                    application.job
                      ?.title ||
                    "Untitled job"
                  }
                </p>

                {application.resumeUrl ? (
                  <a
                    href={`${API_URL}${application.resumeUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-blue-600 underline"
                  >
                    View Resume
                    {application.resumeOriginalName
                      ? ` (${application.resumeOriginalName})`
                      : ""}
                  </a>
                ) : (
                  <p className="mt-3 text-gray-500">
                    No resume uploaded
                  </p>
                )}
              </div>
            )
          )
        )}
      </div>
    </RoleGuard>
  );
}
