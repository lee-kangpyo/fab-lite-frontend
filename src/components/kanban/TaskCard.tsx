import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Task } from "@/lib/api";

interface Props { 
  task: Task; 
  onStatusChange: (id: string, status: string) => void; 
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: Props) {
  const isUrgent = task.priority === "urgent";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -2 }}
      className={`p-5 rounded-airbnb bg-white soft-shadow border border-airbnb-hairline cursor-pointer space-y-3 ${task.status === "done" ? "opacity-60" : ""}`}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-[15px] leading-snug">{task.title}</h4>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {isUrgent && <span className="text-airbnb-red font-bold text-xs uppercase bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">Urgent</span>}
          <button 
            onClick={() => onDelete(task.id)}
            className="text-airbnb-muted hover:text-airbnb-red p-1 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="pt-3 border-t border-airbnb-hairline flex flex-wrap gap-2 mt-2">
        {["todo", "in_progress", "done"].filter(s => s !== task.status).map(s => (
          <button 
            key={s}
            onClick={() => onStatusChange(task.id, s)}
            className="text-[11px] font-bold text-airbnb-ink border border-airbnb-hairline px-2 py-1 rounded-md hover:bg-airbnb-surface transition-colors"
          >
            {s === "todo" ? "대기로" : s === "in_progress" ? "진행으로" : "완료로"}
          </button>
        ))}
      </div>
    </motion.div>
  );
}