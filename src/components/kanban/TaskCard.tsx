import { motion } from "framer-motion";
import { Task } from "@/lib/api";

interface Props { task: Task; onStatusChange: (id: string, status: string) => void; }

export function TaskCard({ task, onStatusChange }: Props) {
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
        {isUrgent && <span className="text-airbnb-red font-bold text-xs uppercase bg-red-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">Urgent</span>}
      </div>
      
      {task.status !== "done" && (
        <div className="pt-3 border-t border-airbnb-hairline flex justify-between items-center mt-2">
          <button 
            onClick={() => onStatusChange(task.id, task.status === "todo" ? "in_progress" : "done")}
            className="text-xs font-semibold text-airbnb-ink underline hover:text-airbnb-red transition-colors"
          >
            상태 변경하기
          </button>
        </div>
      )}
    </motion.div>
  );
}