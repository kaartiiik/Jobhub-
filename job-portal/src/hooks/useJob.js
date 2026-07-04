import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/services/jobs";

export function useJob(id) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
    enabled: !!id,
  });
}
