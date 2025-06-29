import { get, post, del } from "@/boot/axios";
import { useUserSession } from "@/hooks/session";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  SignalLow,
  SignalMedium,
  SignalHigh,
  ChevronDown,
  Trash2,
} from "lucide-react";

// Define the schema for task creation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    errorMap: () => ({ message: "Priority must be LOW, MEDIUM, or HIGH" }),
  }),
});

type TaskFormData = z.infer<typeof taskSchema>;

// Priority icon component
const PriorityIcon = ({
  priority,
}: {
  priority: "LOW" | "MEDIUM" | "HIGH" | null;
}) => {
  const iconProps = {
    className: `w-5 h-5 ${
      priority === "LOW"
        ? "text-green-500"
        : priority === "MEDIUM"
        ? "text-yellow-500"
        : priority === "HIGH"
        ? "text-red-500"
        : "text-gray-500"
    }`,
  };

  return (
    <>
      {priority === "LOW" && <SignalLow {...iconProps} />}
      {priority === "MEDIUM" && <SignalMedium {...iconProps} />}
      {priority === "HIGH" && <SignalHigh {...iconProps} />}
      {!priority && <SignalLow {...iconProps} />}
    </>
  );
};

export default function TaskList() {
  const { user } = useUserSession();
  const [tasksLocal, setTasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | null
  >(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<number>>(
    new Set()
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = (await get(`tasks?user_id=${user.id}`)).data;
      setTasks(tasks);
      return tasks;
    },
  });

  // Handle task creation
  const onSubmit = async (data: TaskFormData) => {
    try {
      const newTask = await post("tasks", {
        ...data,
        user_id: user.id,
      });

      setTasks((prev) => [...prev, newTask.data]);

      reset();
      setSelectedPriority(null);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleCheckboxChange = (taskId: number, checked: boolean) => {
    setSelectedTaskIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(taskId);
      } else {
        newSet.delete(taskId);
      }
      return newSet;
    });
  };

  const handleDeleteTasks = async () => {
    try {
      const params = new URLSearchParams();
      params.append("task_ids", Array.from(selectedTaskIds).join(","));
      await del(`tasks?${params.toString()}`);

      setTasks((prev) => prev.filter((task) => !selectedTaskIds.has(task.id)));

      setSelectedTaskIds(new Set());
    } catch (error) {
      console.error("Failed to delete tasks:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full p-4 bg-card border border-border mb-5 rounded-lg flex flex-col space-y-4">
        <h1 className="text-lg font-semibold">Criar uma Nova Tarefa</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div className="flex items-center w-full space-x-4">
            <div className="flex flex-col space-y-2 w-[80%]">
              <h1>Título</h1>
              <input type="text" className="input p-1" {...register("title")} />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="flex-1 flex-col space-y-2">
              <h1>Prioridade</h1>
              <div className="relative">
                <select
                  className="input p-1 w-full appearance-none pl-8"
                  {...register("priority", {
                    onChange: (e) => setSelectedPriority(e.target.value),
                  })}
                >
                  <option value="" disabled selected>
                    Selecione a prioridade
                  </option>
                  {[
                    { value: "LOW", label: "Baixa" },
                    { value: "MEDIUM", label: "Média" },
                    { value: "HIGH", label: "Alta" },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <PriorityIcon priority={selectedPriority} />
                </div>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 " />
              </div>
              {errors.priority && (
                <span className="text-red-500 text-sm">
                  {errors.priority.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 flex-col space-y-2">
            <h1>Descrição</h1>
            <textarea className="input p-1" {...register("description")} />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="button w-fit px-20 py-2">
              Criar tarefa
            </button>
          </div>
        </form>
      </div>
      {tasksLocal && tasksLocal.length ? (
        <>
          <div className="flex items-center h-[10px] mb-5 justify-between">
            <h1>Tarefas:</h1>
            {selectedTaskIds.size > 0 && (
              <button
                onClick={handleDeleteTasks}
                className="ml-4 py-1 px-10  bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600"
              >
                <Trash2 className="w-5 h-5" />
                Deletar ({selectedTaskIds.size})
              </button>
            )}
          </div>
          <div className="w-full grid grid-cols-3 auto-rows-[150px] gap-10">
            {tasksLocal.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onCheckboxChange={handleCheckboxChange}
                isChecked={selectedTaskIds.has(task.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full bg-[var(--card-secondary)] py-10 rounded-xl border-border border text-center text-secondary">
          <span className="material-icons-round">assignment</span>
          <h1>No Tasks Created</h1>
        </div>
      )}
    </div>
  );
}
