import { useTasks } from "@/hooks/useTasks";
import { api } from "@/lib/api";
import { AnimatePresence } from "framer-motion";
import { Column } from "./Column";

const COLUMNS = ["todo", "in_progress", "done"];

export function Board() {
  const { tasks, mutate } = useTasks();

  const handleStatusChange = async (id: string, status: string) => {
    await api.updateStatus(id, status);
    mutate();
  };

  return (
    <div className="flex space-x-8 overflow-x-auto pb-8 h-full">
      <AnimatePresence mode="popLayout">
        {COLUMNS.map((col) => (
          <Column key={col} status={col} tasks={tasks.filter((t) => t.status === col)} onStatusChange={handleStatusChange} />
        ))}
      </AnimatePresence>
    </div>
  );
}