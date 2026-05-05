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

  const handleDelete = async (id: string) => {
    if (window.confirm("정말 이 태스크를 삭제하시겠습니까?")) {
      await api.deleteTask(id);
      mutate();
    }
  };

  return (
    <div className="flex space-x-8 overflow-x-auto pb-8 h-full">
      <AnimatePresence mode="popLayout">
        {COLUMNS.map((col) => (
          <Column 
            key={col} 
            status={col} 
            tasks={tasks.filter((t) => t.status === col)} 
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}