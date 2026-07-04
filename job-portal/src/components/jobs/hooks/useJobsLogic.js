"use client";

import { useState, useMemo } from "react";

import { useJobs } from "@/hooks/useJobs";
import useDebounce from "@/hooks/useDebounce";

export default function useJobsLogic() {
  const {
    data: apiJobs = [],
    isLoading,
    error,
  } = useJobs();

  const jobs = apiJobs;

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [type, setType] =
    useState("");

  const debouncedSearch =
    useDebounce(search);

  const filteredJobs =
    useMemo(() => {
      if (!jobs) return [];

      return jobs.filter((job) => {
        const matchesSearch =
          job.title
            .toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            ) ||
          job.company
            .toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            );

        const matchesLocation =
          !location ||
          job.location === location;

        const matchesType =
          !type ||
          job.type === type;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesType
        );
      });
    }, [
      jobs,
      debouncedSearch,
      location,
      type,
    ]);

  return {
    filteredJobs,
    search,
    setSearch,
    location,
    setLocation,
    type,
    setType,
    isLoading,
    error,
  };
}
