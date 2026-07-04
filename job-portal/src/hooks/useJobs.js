import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/services/jobs";

export function useJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}