import { Task } from "@/lib/api";
import { TaskCard } from "./TaskCard";

const labels: Record<string, string> = { todo: "할 일", in_progress: "진행 중", done: "완료" };

interface Props { status: string; tasks: Task[]; onStatusChange: (id: string, status: string) => void; }

export function Column({ status, tasks, onStatusChange }: Props) {
  return (
    <div className="flex flex-col w-80 flex-shrink-0">
      <h3 className="text-xs font-bold text-airbnb-muted uppercase tracking-widest px-2 mb-4">
        {labels[status]} ({tasks.length})
      </h3>
      <div className="flex-1 space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}