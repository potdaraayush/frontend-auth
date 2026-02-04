import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskCard({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(task._id, {
      title: title.trim(),
      description: description.trim(),
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`
        group mb-6 break-inside-avoid
        rounded-2xl border border-gray-200
        p-5 flex flex-col gap-3
        transition-shadow hover:shadow-md
        ${
          task.completed
            ? "bg-slate-50 text-slate-400"
            : "bg-white text-slate-800"
        }
      `}
    >
      {!isEditing ? (
        <>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
              className="mt-1 w-4 h-4 accent-slate-800"
            />

            <div className="flex-1">
              <h3
                className={`font-semibold leading-snug break-words ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>
          </label>

          {/* actions */}
          <div className="flex justify-end gap-4 text-xs opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-slate-700"
            >
              edit
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="text-slate-400 hover:text-red-500"
            >
              delete
            </button>
          </div>
        </>
      ) : (
        <>
          {/* edit mode */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-300"
          />

          <div className="flex justify-end gap-4 text-xs">
            <button
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              cancel
            </button>

            <button
              onClick={handleSave}
              className="text-slate-800 font-semibold hover:text-slate-900"
            >
              save
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
