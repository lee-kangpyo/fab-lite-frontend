import useSWR from "swr";
import { api, Task } from "@/lib/api";

const fetcher = () => api.getTasks();

export function useTasks() {
  const { data, error, isLoading, mutate } = useSWR<Task[]>("/api/tasks", fetcher, { refreshInterval: 5000 });
  return { tasks: data || [], error, isLoading, mutate };
}