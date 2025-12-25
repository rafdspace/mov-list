import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>

      <Link
        to="/"
        className="mt-6 inline-block px-2 py-1 rounded-xl bg-black text-white hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
