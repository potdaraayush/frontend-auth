
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTasks, createTask, deleteTask as apiDeleteTask, updateTask } from "../api/tasks";
import Button from "../components/Button";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ email: "User" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const result = await getTasks();
      if (result.success) {
        setTasks(result.data || []);
      }
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const trimmedTask = newTask.trim();
    const trimmedDesc = newDescription.trim();
    if (!trimmedTask) return;

    //logic to check dupes
    const isDuplicate = tasks.some(
      (task) => task.title.trim().toLowerCase() === trimmedTask.toLowerCase()
    );
    if (isDuplicate) {
      setError("Task already exists");
      return;
    }

    try {
      const result = await createTask(trimmedTask, trimmedDesc);
      if (result.success) {
        setTasks([...tasks, result.data]);
        setNewTask("");
        setNewDescription("");
        setError("");
      }
    } catch (err) {
      setError("Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const result = await apiDeleteTask(id);
      if (result.success) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const result = await updateTask(task._id, {
        completed: !task.completed,
      });
      if (result.success) {
        setTasks(
          tasks.map((t) => (t._id === task._id ? result.data : t))
        );
      }
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/v1/auth/logout");
    window.location.href = "/";
  };

  return (
    <>
      {/* <Navbar user={user} onLogout={logout} /> */}

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">My Tasks</h2>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
          <Input
            type="text"
            placeholder="Task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full md:w-auto">Add</Button>
        </form>
        {loading ? (
          <div className="py-8 text-center text-blue-600">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-lg shadow p-5 flex flex-col gap-3 border-2 transition ${task.completed ? "border-green-400" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {task.title}
                  </span>
                </div>
                {task.description && (
                  <div className="text-gray-600 text-sm flex-1">{task.description}</div>
                )}
                <Button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm self-end"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
