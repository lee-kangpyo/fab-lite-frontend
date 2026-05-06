const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  created_at: string;
}

export const api = {
  async getTasks(status?: string): Promise<Task[]> {
    const url = status ? `${BASE_URL}/api/tasks?status=${status}` : `${BASE_URL}/api/tasks`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async updateStatus(id: string, status: string): Promise<Task> {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
  },

  async createSession(): Promise<{ session_id: string }> {
    const res = await fetch(`${BASE_URL}/api/chat/sessions`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to create session");
    return res.json();
  },

  async sendMessage(sessionId: string, message: string): Promise<{ reply: string }> {
    const res = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  },

  async getSessions(): Promise<any[]> {
    const res = await fetch(`${BASE_URL}/api/chat/sessions`);
    return res.json();
  },

  async getSessionHistory(sessionId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/api/chat/sessions/${sessionId}/history`);
    return res.json();
  },
};