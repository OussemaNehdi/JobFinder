import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginPage from "./login/page";
import { api } from "~/trpc/react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      
      {!session ? (
        <LoginPage />
      ) : (
        //get the name from the email prefix before the '@'
        <h1 className="text-2xl font-bold">Welcome {session.user?.email?.split("@")[0]}</h1>
        
      )}
    </main>
  );
}
