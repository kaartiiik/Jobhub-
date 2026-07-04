import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}