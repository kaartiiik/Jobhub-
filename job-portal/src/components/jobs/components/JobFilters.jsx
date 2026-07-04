"use client";

export default function JobFilters({
  location,
  setLocation,
  type,
  setType,
}) {
  return (
   <div className="flex flex-col sm:flex-row gap-4">
      <select
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="border rounded-lg p-2"
      >
        <option value="" className ="text-black">
          All Locations
        </option>

        <option value="Remote" className ="text-black">
          Remote
           
        </option>

        <option value="Bangalore" className ="text-black">
          Bangalore
        </option>

        <option value="Hyderabad" className ="text-black">
          Hyderabad
        </option>

        <option value="Pune" className ="text-black">
          Pune
        </option>
      </select>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
        className="border rounded-lg p-2"
      >
        <option value="" className ="text-black">
          All Types
        </option>

        <option value="Full Time" className ="text-black">
          Full Time
        </option>

        <option value="Contract" className ="text-black">
          Contract
        </option>
      </select>
    </div>
  );
}