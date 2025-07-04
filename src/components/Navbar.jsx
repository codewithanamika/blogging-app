import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';


export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const handleCreateClick = () => {
    if (currentUser) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('user logged out');
        window.location.replace("/");
        console.log("navigated to home");
      } catch (error) {
        console.error('Logout failed:', error)

      }
    
  };
    return (
        <nav className="flex justify-between items-center py-4 border-b mb-4">
            <Link to="/" className="text-xl font-bold text-blue-600">My Blog</Link>
            <div className="space-x-4">
        <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>

        <button 
          onClick={handleCreateClick}
          className="text-gray-700 hover:text-blue-600">Create Blog</button>
      </div>
    </nav>
  );
}
