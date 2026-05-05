import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface Message { role: "user" | "assistant"; content: string; }

export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api.createSession().then(({ session_id }) => {
      if (!cancelled) {
        setSessionId(session_id);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const sendMessage = async (content: string) => {
    if (!sessionId) return;
    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsLoading(true);
    try {
      const { reply } = await api.sendMessage(sessionId, content);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "응답 오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
}