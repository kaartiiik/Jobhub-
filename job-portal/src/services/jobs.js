import api from "@/lib/api";

export async function getJobs() {
  const response = await api.get("/jobs");

  return response.data;
}

export async function getJob(id) {
  const response = await api.get(
    `/jobs/${id}`
  );

  return response.data;
}

export async function createJob(job) {
  const response = await api.post(
    "/jobs",
    job
  );

  return response.data;
}

export async function updateJob(
  id,
  job
) {
  const response = await api.put(
    `/jobs/${id}`,
    job
  );

  return response.data;
}

export async function deleteJob(id) {
  const response = await api.delete(
    `/jobs/${id}`
  );

  return response.data;
}