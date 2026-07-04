"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecruiterApplications } from "@/services/applications";

export default function useApplicants() {
  const { data: applications = [] } =
    useQuery({
      queryKey: [
        "recruiter-applications",
      ],
      queryFn:
        getRecruiterApplications,
    });

  return {
    applications,
  };
}
