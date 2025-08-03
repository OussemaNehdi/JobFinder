import SavedClient from "./saved-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SavedPage() {
  // Add a server-side session check to prevent auth mismatch
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/saved")}`);
  }
  
  return (
    <Suspense fallback={<div className="text-center py-10">Loading saved jobs...</div>}>
      <SavedClient />
    </Suspense>
  );
}
