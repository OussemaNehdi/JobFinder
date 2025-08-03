'use client';

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SavedClient() {
  // Get session directly for better reactivity
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent("/saved")}`);
    }
  }, [status, router]);
  
  const { data: jobs, isLoading, error } = api.job.getSaved.useQuery(
    undefined,
    { 
      enabled: !!session,
      // Retry configuration for better reliability
      retry: 1,
      retryDelay: 500 
    }
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 mt-8 flex flex-col gap-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-pink-600 mb-2 text-center">Saved Jobs</h2>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      {jobs && jobs.length > 0 ? (
        <ul className="flex flex-col gap-4 mt-4">
          {jobs.map((job, i) => (
            <li key={i} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-gray-100">
              <div>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-700 hover:underline">
                  {job.title}
                </a>
                <div className="text-gray-600 text-sm">{job.companyName}</div>
              </div>
              <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">Saved</span>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className="text-center text-gray-500">No saved jobs yet.</p>
      )}
    </div>
  );
}
