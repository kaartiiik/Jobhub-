"use client";

import dynamic from "next/dynamic";
import EmptyState from "@/components/ui/components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getSavedJobs } from "@/services/savedJobs";

import useAuthStore from "@/store/authStore";

const JobList = dynamic(
  () =>
    import(
      "@/components/jobs/components/JobList"
    ),
  {
    loading: () => (
      <p>Loading saved jobs...</p>
    ),
  }
);

export default function SavedJobsPage() {
  const user = useAuthStore(
    (state) => state.user
  );
const { data: savedJobs = [] } =
  useQuery({
    queryKey: ["savedJobs"],
    queryFn: getSavedJobs,
  });

const jobs = savedJobs.map(
  (savedJob) => savedJob.job
);
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">
        {savedJobs.length} Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        <EmptyState
          message="No saved jobs"
        />
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
}