"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getApplications, withdrawApplication } from "@/services/applications";

export default function useApplications() {
  const queryClient = useQueryClient();

  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  const withdrawMutation = useMutation({
    mutationFn: withdrawApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  const handleWithdraw = (id) => {
    withdrawMutation.mutate(id);
  };

  return {
    applications,
    handleWithdraw,
  };
}