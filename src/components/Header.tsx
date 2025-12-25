import { Link } from "react-router";
import Search from "./Search";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-400 shadow-xl text-white">
      <div className="w-full max-w-310 m-auto p-4 md:px-6 md:py-4 flex items-center justify-between gap-4 border-x border-gray-800">
        <Link to="/" className="text-xl font-bold">
          MOV
        </Link>

        <div className="flex-1 max-w-80">
          <Search />
        </div>
      </div>
    </header>
  );
}
