import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";
import SavedClient from "./saved-client";

export default async function SavedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return <SavedClient />;
}
