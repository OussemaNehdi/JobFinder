import SearchClient from "./search-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SearchPage() {
  // Add a server-side session check to prevent auth mismatch
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/search")}`);
  }
  
  return (
    <Suspense fallback={<div className="text-center py-10">Loading search page...</div>}>
      <SearchClient />
    </Suspense>
  );
}
