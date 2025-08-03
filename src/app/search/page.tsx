import SearchClient from "./search-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";

export default async function SearchPage() {
  // Add a server-side session check to prevent auth mismatch
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login?callbackUrl=/search");
  }
  
  return <SearchClient />;
}
