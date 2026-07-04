"use client";

import { useState } from "react";

import { useJobs } from "@/hooks/useJobs";
import { deleteJob } from "@/services/jobs";

import useAuthStore from "@/store/authStore";

export default function useRecruiterJobs() {
  const {
    data: apiJobs = [],
    isLoading,
  } = useJobs();
  const user = useAuthStore(
  (state) => state.user
);
const jobs = apiJobs.filter(
  (job) =>
    String(job.recruiterId) ===
    String(user?.id)
);

  const [showForm, setShowForm] =
    useState(false);

  const toggleForm = () => {
    setShowForm(
      (prev) => !prev
    );
  };

  const handleDeleteJob =
    async (id) => {
      await deleteJob(id);
    };

  return {
    jobs,
    isLoading,
    showForm,
    toggleForm,
    handleDeleteJob,
  };
}
