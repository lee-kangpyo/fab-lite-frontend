import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export interface Message { role: "user" | "assistant"; content: string; }

export function useChat(initialSessionId?: string) {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSession = useCallback(async (id: string) => {
    try {
      const history = await api.getSessionHistory(id);
      setMessages(history.messages.map((m: any) => ({ role: m.role, content: m.content })));
      setSessionId(id);
    } catch (e) {
      console.error("Failed to load session:", e);
    }
  }, []);

  useEffect(() => {
    if (initialSessionId) {
      loadSession(initialSessionId);
    }
  }, [initialSessionId, loadSession]);

  const createSession = async () => {
    const { session_id } = await api.createSession();
    setSessionId(session_id);
    setMessages([]);
    return session_id;
  };

  const sendMessage = async (content: string) => {
    if (!sessionId) {
      await createSession();
    }
    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsLoading(true);
    try {
      const { reply } = await api.sendMessage(sessionId!, content);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "응답 오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading, sessionId, setSessionId, loadSession, createSession };
}