"use client";

import JobSearch from "./JobSearch";
import JobFilters from "./JobFilters";
import JobList from "./JobList";

import Loader from "@/components/ui/components/Loader";
import ErrorState from "@/components/ui/components/ErrorState";
import EmptyState from "@/components/ui/components/EmptyState";

import useJobsLogic from "../hooks/useJobsLogic";

export default function JobsPage() {
  const {
    filteredJobs,
    search,
    setSearch,
    location,
    setLocation,
    type,
    setType,
    isLoading,
    error,
  } = useJobsLogic();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to fetch jobs"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">
        Available Jobs
      </h1>

      <div className="space-y-4 mb-8">
        <JobSearch
          search={search}
          setSearch={setSearch}
        />

        <JobFilters
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
        />
      </div>

      <p className="text-gray-500 mb-6">
        {filteredJobs.length} jobs found
      </p>

      {filteredJobs.length === 0 ? (
        <EmptyState
          message="No jobs found"
        />
      ) : (
        <JobList jobs={filteredJobs} />
      )}
    </div>
  );
}