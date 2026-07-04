"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

import useAuthStore from "@/store/authStore";

import {saveJob,removeSavedJob,getSavedJobs,}
 from "@/services/savedJobs";

import {useMutation,useQuery,useQueryClient,} from "@tanstack/react-query";

function JobCard({ job }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAuthStore(
    (state) => state.user
  );

  const { data: savedJobs = [] } =
    useQuery({
      queryKey: ["savedJobs"],
      queryFn: getSavedJobs,
    });

  const saveMutation =
    useMutation({
      mutationFn: saveJob,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "savedJobs",
          ],
        });
      },
    });

  const removeMutation =
    useMutation({
      mutationFn:
        removeSavedJob,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "savedJobs",
          ],
        });
      },
    });

  const saved =
    savedJobs.some(
      (savedJob) =>
        savedJob.job.id ===
        job.id
    );

  const handleSave = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (saved) {
      const savedRecord =
        savedJobs.find(
          (savedJob) =>
            savedJob.job.id ===
            job.id
        );

      removeMutation.mutate(
        savedRecord.id
      );
    } else {
      saveMutation.mutate(
        job.id
      );
    }
  };

  return (
    <div className="border rounded-lg p-5 shadow">
      <h2 className="text-xl font-bold">
        {job.title}
      </h2>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <p>{job.salary}</p>

      <p className="text-sm text-gray-600 mt-2">
        {job.applicantCount ?? 0} applicants in the last 10 days
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          href={`/jobs/${job.id}`}
          className="text-blue-600"
        >
          View Details
        </Link>

        <button
          onClick={handleSave}
          className={`font-semibold cursor-pointer ${
            saved
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {saved
            ? "Remove"
            : "Save"}
        </button>
      </div>
    </div>
  );
}

export default memo(JobCard);
