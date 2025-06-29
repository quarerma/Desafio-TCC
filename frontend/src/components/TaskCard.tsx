import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";

export default function TaskCard({ task, onCheckboxChange, isChecked }) {
  const getPriorityStyles = (priority: string) => {
    const iconProps = {
      className: `w-5 h-5 ${
        priority?.toUpperCase() === "LOW"
          ? "text-green-500"
          : priority?.toUpperCase() === "MEDIUM"
          ? "text-yellow-500"
          : priority?.toUpperCase() === "HIGH"
          ? "text-red-500"
          : "text-gray-500"
      }`,
    };

    switch (priority?.toUpperCase()) {
      case "HIGH":
        return <SignalHigh {...iconProps} />;
      case "MEDIUM":
        return <SignalMedium {...iconProps} />;
      case "LOW":
        return <SignalLow {...iconProps} />;
      default:
        return <SignalLow {...iconProps} />;
    }
  };

  return (
    <div className="w-full bg-card p-4 border border-border rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-x-4">
          <h1 className="text-xl font-semibold">{task.title}</h1>
          <span className="font-light text-sm text-secondary">
            TASK-{task.id}
          </span>
          <div className="bg-selected p-1 border border-border rounded-lg">
            {getPriorityStyles(task.priority)}
          </div>
        </div>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={isChecked}
          onChange={(e) => onCheckboxChange(task.id, e.target.checked)}
        />
      </div>
      <p className="text-sm text-secondary line-clamp-3 flex-grow">
        {task.description}
      </p>
    </div>
  );
}
