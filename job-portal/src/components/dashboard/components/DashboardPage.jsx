"use client";
import ProtectedRoute from "@/components/auth/components/ProtectedRoute";
import useDashboard from "../hooks/useDashboard";
import {DASHBOARD_TEXT,} from "../constants/dashboardCards";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const {
    user,
    savedJobs,
    applications,
    goToSavedJobs,
    goToApplications,
  } = useDashboard();

    const searchParams =
    useSearchParams();
useEffect(() => {
  if (
    searchParams.get(
      "message"
    ) ===
    "already_authenticated"
  ) {
    toast.success(
      "You are already signed in"
    );
  }
}, [searchParams]);

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold">
          {DASHBOARD_TEXT.TITLE},
          {" "}
          {user?.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-bold">
              {
                DASHBOARD_TEXT.SAVED_JOBS
              }
            </h2>

            <p className="text-4xl mt-2">
              {savedJobs.length}
            </p>

            <br />

            <button
              onClick={
                goToSavedJobs
              }
              className="cursor-pointer bg-blue-500 px-2 py-1 text-black rounded"
            >
              {
                DASHBOARD_TEXT.VIEW_SAVED_JOBS
              }
            </button>
          </div>

          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-bold">
              {
                DASHBOARD_TEXT.APPLICATIONS
              }
            </h2>

            <p className="text-4xl mt-2">
              {
                applications.length
              }
            </p>

            <br />

            <button
              onClick={
                goToApplications
              }
              className="cursor-pointer bg-blue-500 px-2 py-1 text-black rounded"
            >
              {
                DASHBOARD_TEXT.VIEW_APPLICATIONS
              }
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}