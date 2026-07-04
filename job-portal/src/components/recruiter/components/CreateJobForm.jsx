"use client";

import { useForm } from "react-hook-form";
import { createJob } from "@/services/jobs";
import useAuthStore from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

 

export default function CreateJobForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
const user = useAuthStore(
  (state) => state.user
);
  const onSubmit = async (
    data
  ) => {
    try {
 await createJob({
  ...data,
  recruiterId: user.id,
    recruiterName: user.name,

  salary:
    data.salary ||
    "Not Specified",

  type:
    data.type ||
    "Full Time",

  experience:
    data.experience ||
    "0+ Years",

  description:
    data.description ||
    "No description provided",
});
 queryClient.invalidateQueries({
      queryKey: ["jobs"],
    });

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["jobs"],
        });
      }, 1500);

      reset();

      alert(
        "Job creation queued successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create job"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        placeholder="Job Title"
        {...register("title", {
          required: true,
        })}
        className="border p-3 w-full"
      />

      <input
        placeholder="Company"
        {...register("company", {
          required: true,
        })}
        className="border p-3 w-full"
      />

      <input
        placeholder="Location"
        {...register("location", {
          required: true,
        })}
        className="border p-3 w-full"
      />

      <input
        placeholder="Salary"
        {...register("salary")}
        className="border p-3 w-full"
      />

      <input
        placeholder="Type"
        {...register("type")}
        className="border p-3 w-full"
      />

      <input
        placeholder="Experience"
        {...register("experience")}
        className="border p-3 w-full"
      />

      <textarea
        placeholder="Description"
        {...register(
          "description"
        )}
        className="border p-3 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-black px-4 py-2 rounded"
      >
        Create Job
      </button>
    </form>
  );
}
