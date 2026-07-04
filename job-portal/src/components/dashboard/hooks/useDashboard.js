"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useAuthStore from "@/store/authStore";

import { getSavedJobs } from "@/services/savedJobs";
import { getApplications } from "@/services/applications";

export default function useDashboard() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const { data: savedJobs = [] } =
    useQuery({
      queryKey: ["savedJobs"],
      queryFn: getSavedJobs,
      enabled: !!user,
    });

  const {
    data: applications = [],
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;

    if (user.role === "recruiter") {
      router.replace("/recruiter");
    }
  }, [user, router]);

  const goToSavedJobs = () => {
    router.push("/saved-jobs");
  };

  const goToApplications = () => {
    router.push("/applications");
  };

  return {
    user,
    savedJobs,
    applications,
    goToSavedJobs,
    goToApplications,
  };
}