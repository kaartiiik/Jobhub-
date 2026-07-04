"use client";

import ApplicationCard
from "./ApplicationCard";

import useApplications
from "../hooks/useApplications";

import {
  APPLICATION_TEXT,
} from "../constants/applicationStatus";

export default function ApplicationsPage() {
  const {
    applications,
    handleWithdraw,
  } = useApplications();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">
        {
          APPLICATION_TEXT.TITLE
        } ({applications.length})
      </h1>

      {applications.length ===
      0 ? (
        <p>
          {
            APPLICATION_TEXT.NO_APPLICATIONS
          }
        </p>
      ) : (
        <div className="space-y-4">
       {applications.map(
  (application) => (
    <ApplicationCard
      key={application.id}
      application={
        application
      }
      handleWithdraw={
        handleWithdraw
      }
    />
  )
)}
        </div>
      )}
    </div>
  );
}
