'use client';
import { useState } from "react";
import { api } from "~/trpc/react";

type Job = {
  title: string;
  companyName: string;
  url: string;
};

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: jobs, isLoading, error } = api.job.search.useQuery(
    { keyword: searchTerm },
    { enabled: !!searchTerm }
  );
  const saveJob = api.job.save.useMutation();

  // Get the current session to check if the user is logged in
  
  

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 mt-8 flex flex-col gap-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Search Jobs</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          setSearchTerm(keyword);
        }}
        className="flex gap-2 justify-center"
      >
        <input
          type="text"
          placeholder="Enter keyword..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 font-semibold shadow transition"
        >
          Search
        </button>
      </form>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      {jobs && jobs.length > 0 && (
        <ul className="flex flex-col gap-4 mt-4">
          {(jobs as Job[]).map((job: Job, i: number) => (
            <li key={i} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-gray-100">
              <div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {job.title}
                </a>
                <div className="text-gray-600 text-sm">{job.companyName}</div>
              </div>
              <button
                onClick={() => saveJob.mutate({ ...job })}
                className="rounded-lg bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-semibold shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={saveJob.isPending}
              >
                {saveJob.isPending ? "Saving..." : "Save"}
              </button>
            </li>
          ))}
        </ul>
      )}
      {jobs && jobs.length === 0 && searchTerm && (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
}
