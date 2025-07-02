import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 border-b mb-4">
            <Link to="/" className="text-xl font-bold text-blue-600">My Blog</Link>
            <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600">Create Blog</Link>
      </div>
    </nav>
  );
}
