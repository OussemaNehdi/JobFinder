import { TRPCReactProvider } from "~/trpc/react";
import "../styles/globals.css";
import SidebarMenu from "./_components/SidebarMenu";

export const metadata = {
  title: "Job Listing App",
  description: "Search and save jobs from a public API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 font-sans text-gray-900">
        <div className="flex min-h-screen">
          <SidebarMenu />
          <div className="flex-1 flex flex-col">
            <header className="w-full py-6 px-4 flex justify-between items-center shadow-md bg-white/80 backdrop-blur sticky top-0 z-20">
              {/* You can add a user block or logo here if needed */}
            </header>
            <TRPCReactProvider>
              <main className="flex flex-col items-center justify-center w-full flex-1 px-4 py-8">
                {children}
              </main>
            </TRPCReactProvider>
            <footer className="w-full py-4 text-center text-gray-500 bg-white/70 mt-8 border-t">
              &copy; {new Date().getFullYear()} Job Listing App. All rights reserved.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
