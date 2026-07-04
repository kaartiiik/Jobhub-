"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useJob } from "@/hooks/useJob";

import Loader from "@/components/ui/components/Loader";
import ErrorState from "@/components/ui/components/ErrorState";

import Modal from "@/components/ui/components/Modal";
import ApplyJobForm from "@/components/applications/components/ApplyJobForm";
import ProtectedRoute from "@/components/auth/components/ProtectedRoute";

export default function JobDetailsPage() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const {
    data: job,
    isLoading,
    error,
  } = useJob(id);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <ErrorState message="Failed to load job" />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {job.title}
      </h1>

      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.type}</p>
      <p>{job.experience}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">
          Description
        </h2>

        <p>{job.description}</p>
        <button
  onClick={() => setOpen(true)}
  className="bg-green-600 text-white px-4 py-2 rounded mt-6 cursor-pointer"
>
  Apply Now
</button>
      </div>
      <Modal
  isOpen={open}
  onClose={() => setOpen(false)}
>
  <ProtectedRoute>
  <ApplyJobForm
    job={job}
    onClose={() => setOpen(false)}
  />
  </ProtectedRoute>
</Modal>
    </div>
  );
}