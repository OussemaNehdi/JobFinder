"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

export default function SidebarMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Make sure we're on the client before using client-side features
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleNavigation = (path: string) => {
    if (!session && (path === '/search' || path === '/saved')) {
      router.push(`/login?callbackUrl=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };
  
  return (
    <aside className="min-h-screen w-full max-w-xs bg-white/80 shadow-lg flex flex-col items-center py-8 px-4 gap-8 sticky top-0 z-30">
      <Link href="/" className="w-full flex justify-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-tight drop-shadow cursor-pointer">
          Job Listing App
        </h1>
      </Link>
      <Suspense fallback={<div className="w-full text-center">Loading navigation...</div>}>
        {isClient && (
          <nav className="flex flex-col gap-4 w-full">
            {status === 'loading' ? (
              <div className="text-center text-gray-500 py-3">Loading...</div>
            ) : (
              <>
                {/* Use Links for better SEO and accessibility but with custom onClick handler */}
                <Link 
                  href="/search"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/search');
                  }}
                >
                  <button className="w-full flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
                    <span role="img" aria-label="search">🔍</span> Search Jobs
                  </button>
                </Link>
                
                <Link 
                  href="/saved"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/saved');
                  }}
                >
                  <button className="w-full flex items-center gap-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
                    <span role="img" aria-label="saved">💾</span> Saved Jobs
                  </button>
                </Link>
                
                <Link href="/about">
                  <button className="w-full flex items-center gap-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
                    <span role="img" aria-label="about">ℹ️</span> About
                  </button>
                </Link>
              </>
            )}
          </nav>
        )}
      </Suspense>
    </aside>
  );
}
