"use client";

export default function JobSearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />
  );
}