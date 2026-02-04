import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const { user: authUser } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks whenever the user changes (e.g., after profile update)
  useEffect(() => {
    if (!authUser) return;

    setLoading(true);
    getTasks()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) setTasks(res.data);
        else setTasks([]);
      })
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, [authUser]);

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const filteredTasks = safeTasks.filter((task) => {
    const titleMatch = task.title?.toLowerCase().includes(search.toLowerCase());
    const descMatch = task.description?.toLowerCase().includes(search.toLowerCase());
    if (!(titleMatch || descMatch)) return false;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTasks = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  // Add new task
  const handleAdd = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    try {
      const res = await createTask(title.trim(), description.trim());
      if (res.success) {
        setTasks((prev) => [res.data, ...prev]);
        setTitle("");
        setDescription("");
        setError("");
        setSuccess("Task added successfully!");
        setTimeout(() => setSuccess(""), 2000);
      } else {
        setError(res.message || "Failed to create task");
      }
    } catch {
      setError("Failed to create task");
    }
  };

  // Toggle completed
  const handleToggle = async (task) => {
    try {
      const res = await updateTask(task._id, { completed: !task.completed });
      if (res.success) {
        setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      }
    } catch {
      setError("Failed to update task");
    }
  };

  // Update task
  const handleUpdate = async (id, updates) => {
    try {
      const res = await updateTask(id, updates);
      if (res.success) {
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
        setSuccess("Task updated!");
        setTimeout(() => setSuccess(""), 2000);
      }
    } catch {
      setError("Failed to update task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      const res = await deleteTask(id);
      if (res.success) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        setSuccess("Task deleted!");
        setTimeout(() => setSuccess(""), 2000);
      }
    } catch {
      setError("Failed to delete task");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-8">
      <div className="max-w-6xl">
        {/* header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Your tasks for today</h1>
          <p className="text-sm text-slate-500 mt-1">
            {activeTasks.length} active · {completedTasks.length} completed
          </p>
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        {success && <p className="text-sm text-green-500 mb-4">{success}</p>}

        {/* search + filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* add task */}
        <div className="mb-10 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full rounded-xl border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <Button
            onClick={handleAdd}
            className="rounded-xl px-5 py-2 bg-slate-800 hover:bg-slate-700"
          >
            Add task
          </Button>
        </div>

        {/* ACTIVE TASKS */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
        >
          <AnimatePresence initial={false}>
            {activeTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* COMPLETED TASKS */}
        {completedTasks.length > 0 && (
          <div className="mt-14">
            <h2 className="text-sm font-medium text-slate-500 mb-4">Completed</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 opacity-70 grayscale">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
