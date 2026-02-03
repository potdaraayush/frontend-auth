import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Tasks from "./Tasks";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Welcome, {user?.name}!
        </h1>
        <Tasks />
      </div>
    </div>
  );
}

export default Dashboard;
