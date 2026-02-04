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
    <nav className="sticky top-0 z-40 bg-zinc-700 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
          Task Manager
        </h1>

        <div className="flex items-center gap-5">
          <span className="text-sm text-zinc-400">
            Hello,&nbsp;
            <span className="font-medium text-zinc-200">{user?.name}</span>
          </span>

          <button
            onClick={() => navigate("/profile")}
            className="rounded-xl px-4 py-1.5 text-sm font-medium text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl px-4 py-1.5 text-sm font-medium text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
