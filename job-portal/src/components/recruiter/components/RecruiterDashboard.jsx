"use client";

import RoleGuard
from "@/components/auth/components/RoleGuard";

import CreateJobForm
from "./CreateJobForm";

import useRecruiterJobs
from "../hooks/useRecruiterJobs";

import {
  RECRUITER_TABS,
}
from "../constants/recruiterTabs";

export default function RecruiterDashboard() {
  const {
    jobs,
    isLoading,
    showForm,
    toggleForm,
    handleDeleteJob,
  } = useRecruiterJobs();

  if (isLoading) {
    return (
      <p className="p-10">
        Loading...
      </p>
    );
  }

  return (
    <RoleGuard
      allowedRoles={[
        "recruiter",
      ]}
    >
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">
          {RECRUITER_TABS.TITLE}
        </h1>

        <button
          onClick={toggleForm}
          className="bg-blue-600 text-black px-4 py-2 rounded"
        >
          {showForm
            ? RECRUITER_TABS.CLOSE_FORM
            : RECRUITER_TABS.CREATE_JOB}
        </button>

        {showForm && (
          <div className="mt-6">
            <CreateJobForm />
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            {
              RECRUITER_TABS.POSTED_JOBS
            }
          </h2>

          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded mb-3"
            >
              <h3 className="font-bold">
                {job.title}
              </h3>

              <p>
                {job.company}
              </p>

              <button
                onClick={() =>
                  handleDeleteJob(
                    job.id
                  )
                }
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}