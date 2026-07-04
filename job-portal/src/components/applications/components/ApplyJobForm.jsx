"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuthStore from "@/store/authStore";

import { applyJob } from "@/services/applications";

export default function ApplyJobForm({
  job,
  onClose,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  const queryClient =
    useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: applyJob,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "applications",
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      toast.success(
        "Application submitted!"
      );

      onClose();
    },

    onError: (error) => {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to apply"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      jobId: job.id,
      resume: data.resume?.[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        defaultValue={user?.name}
        readOnly
        className="border p-3 w-full text-black"
      />

      <input
        defaultValue={user?.email}
        readOnly
        className="border p-3 w-full text-black"
      />

      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          {...register("resume", {
            required:
              "Resume is required",
            validate: {
              fileType: (
                files
              ) =>
                [
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ].includes(
                  files?.[0]
                    ?.type
                ) ||
                "Only PDF, DOC, and DOCX files are allowed",
              fileSize: (
                files
              ) =>
                !files?.[0] ||
                files[0].size <=
                  5 *
                    1024 *
                    1024 ||
                "Resume must be 5MB or less",
            },
          })}
          className="border p-3 w-full text-black"
        />

        {errors.resume && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.resume
                .message
            }
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={
          mutation.isPending
        }
      >
        {mutation.isPending
          ? "Applying..."
          : "Submit Application"}
      </button>
    </form>
  );
}
