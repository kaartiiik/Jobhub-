import api from "@/lib/api";

export const applyJob = async ({
  jobId,
  resume,
}) => {
  const formData = new FormData();
  formData.append("jobId", jobId);
  formData.append("resume", resume);

  const res = await api.post(
    "/applications",
    formData
  );

  return res.data;
};

export const getApplications = async () => {
  const res = await api.get("/applications");

  return res.data;
};

export const getRecruiterApplications = async () => {
  const res = await api.get(
    "/applications/recruiter"
  );

  return res.data;
};

export const withdrawApplication = async (id) => {
  const res = await api.delete(`/applications/${id}`);

  return res.data;
};
