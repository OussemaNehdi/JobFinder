import SavedClient from "./saved-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";

export default async function SavedPage() {
  // Add a server-side session check to prevent auth mismatch
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login?callbackUrl=/saved");
  }
  
  return <SavedClient />;
}
