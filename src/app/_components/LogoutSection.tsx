'use client';

import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function LogoutSection() {
    const { data: session } = useSession();

    if (!session?.user) {
        return null; // Don't render anything if not authenticated
    }    return (
        <div className="flex justify-end w-full">
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 text-sm font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout ({session.user.email?.split('@')[0]})</span>
            </button>
        </div>
    );
}