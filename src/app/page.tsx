import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginPage from "./login/page";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {!session ? (
        <LoginPage />
      ) : (
        <div className="container mx-auto px-4 py-12">
          {/*  */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl mb-10">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,700 Q400,450 780,700 L800,800 L0,800 Z" fill="white" />
                <path d="M20,400 Q400,100 780,400" fill="none" stroke="white" strokeWidth="12" />
                <circle cx="400" cy="250" r="100" fill="none" stroke="white" strokeWidth="12" />
              </svg>
            </div>
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                  Welcome, <span className="text-blue-200">{session.user?.email?.split("@")[0]}</span>!
                </h1>
                <p className="text-xl text-blue-100 max-w-lg">Ready to find your next opportunity? Start searching for jobs or review your saved listings.</p>
                <div className="mt-8">
                  <Link href="/search">
                    <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                      Search Jobs
                    </button>
                  </Link>
                  <Link href="/saved">
                    <button className="ml-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                      Saved Jobs
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative h-32 w-32 md:h-48 md:w-48 bg-white rounded-full p-2 shadow-xl">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse"></div>
                  <div className="relative z-10 h-full w-full bg-white rounded-full flex items-center justify-center">
                    <span className="text-5xl md:text-7xl font-bold text-blue-700">{session.user?.email?.split("@")[0]?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Search Jobs Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Jobs</h2>
                <p className="text-gray-600 mb-6">Browse through available positions and find your perfect match with our powerful search tools.</p>
                <Link href="/search">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full">
                    Start Searching
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Saved Jobs Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="h-2 bg-gradient-to-r from-pink-400 to-pink-600"></div>
              <div className="p-8">
                <div className="bg-pink-100 text-pink-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <span className="text-3xl">💼</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Jobs</h2>
                <p className="text-gray-600 mb-6">Review and manage your saved job listings in one convenient location.</p>
                <br></br>
                <Link href="/saved">
                  <button className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full ">
                    View Saved Jobs
                  </button>
                </Link>
              </div>
            </div>
            
            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="h-2 bg-gradient-to-r from-gray-500 to-gray-700"></div>
              <div className="p-8">
                <div className="bg-gray-100 text-gray-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <span className="text-3xl">ℹ️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 mb-6">Learn more about our job listing platform and how it can help advance your career.</p>
                <Link href="/about">
                  <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 w-full">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Welcome Note */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                <span className="text-2xl">👋</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome to Job Listing App</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Thank you for joining our platform! We're dedicated to helping you find the perfect job opportunity.
              Use the search feature to browse through available positions, save interesting listings to review later,
              and keep track of your application process all in one place.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-blue-700 font-medium">
                Get started by clicking on "Search Jobs" to browse available positions, or check out the features in the sidebar menu.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
