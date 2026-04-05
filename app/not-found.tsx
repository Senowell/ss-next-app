import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <p className="text-6xl font-bold text-black-200 mb-2">404</p>
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved, deleted, or never existed.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
