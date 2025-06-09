"use client";
import Link from "next/link";


export default function SidebarMenu() {
  
  return (
    <aside className="min-h-screen w-full max-w-xs bg-white/80 shadow-lg flex flex-col items-center py-8 px-4 gap-8 sticky top-0 z-30">
      <Link href="/" className="w-full flex justify-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-tight drop-shadow cursor-pointer">
          Job Listing App
        </h1>
      </Link>
      <nav className="flex flex-col gap-4 w-full">
        <Link href="/search">
          <button className="w-full flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
            <span role="img" aria-label="search">🔍</span> Search Jobs
          </button>
        </Link>
        <Link href="/saved">
          <button className="w-full flex items-center gap-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
            <span role="img" aria-label="saved">💾</span> Saved Jobs
          </button>
        </Link>
        <Link href="/about">
          <button className="w-full flex items-center gap-2 rounded-lg bg-gray-700 hover:bg-gray-900 text-white px-6 py-3 text-lg font-semibold shadow transition-all duration-200">
            <span role="img" aria-label="about">ℹ️</span> About
          </button>
        </Link>
      </nav>
    </aside>
  );
}
