import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-700">Task Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Hello, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
