import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
      <p className="text-lg text-gray-700">
        This app allows you to search job listings from an external API and save
        your favorites.
      </p>
    </main>
  );
}
