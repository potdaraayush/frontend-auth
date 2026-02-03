import Button from "./Button";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-5 flex flex-col gap-3 border-2 transition
      ${task.completed ? "border-green-400" : "border-gray-200"}`}
    >

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mt-1 w-5 h-5 accent-blue-600"
        />

        <h3
          className={`text-lg font-semibold break-words
          ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {task.title}
        </h3>
      </div>

      {task.description && (
        <p
          className="
            text-gray-600 text-sm
            break-words
            overflow-hidden
            line-clamp-4
          "
          title={task.description}
        >
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex justify-end">
        <Button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
