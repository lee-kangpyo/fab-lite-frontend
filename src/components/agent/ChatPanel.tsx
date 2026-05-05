import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export function ChatPanel() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput("");
    await sendMessage(msg);
  };

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-white rounded-airbnb airbnb-shadow border border-airbnb-hairline flex flex-col z-20 overflow-hidden h-[500px]">
      <header className="p-4 border-b border-airbnb-hairline flex justify-between items-center bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-airbnb-red flex items-center justify-center text-white font-bold text-sm">A</div>
          <div>
            <p className="font-bold text-sm">에어비앤비 에이전트</p>
            <p className="text-[10px] text-green-600 font-bold">● 온라인</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-3 max-w-[85%] ${msg.role === "user" ? "bg-airbnb-red text-white rounded-2xl rounded-tr-none" : "bg-airbnb-surface text-airbnb-ink border border-airbnb-hairline rounded-2xl rounded-tl-none"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-airbnb-muted animate-pulse">에이전트 입력 중...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-airbnb-hairline bg-white">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요..."
            className="w-full bg-airbnb-surface border border-airbnb-hairline rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-airbnb-red/20"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 w-8 h-8 bg-airbnb-red text-white rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}