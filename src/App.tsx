import { Search } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Board } from "@/components/kanban/Board";
import { ChatPanel } from "@/components/agent/ChatPanel";

function App() {
  return (
    <div className="flex bg-white text-airbnb-ink h-screen overflow-hidden">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col bg-airbnb-surface relative">
        {/* Sticky Top Bar with Pill Search */}
        <div className="sticky top-0 bg-white border-b border-airbnb-hairline p-4 z-10 flex justify-center">
          <div className="border border-airbnb-hairline soft-shadow bg-white rounded-full px-5 py-2 flex items-center space-x-4 w-[500px]">
            <span className="text-sm font-semibold border-r border-airbnb-hairline pr-4">상태</span>
            <span className="text-sm font-semibold border-r border-airbnb-hairline pr-4">우선순위</span>
            <input type="text" placeholder="태스크 검색..." className="text-sm outline-none flex-1 bg-transparent" />
            <div className="bg-airbnb-red w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer">
              <Search size={14} />
            </div>
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto">
          <header className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">내 태스크 관리</h2>
            <p className="text-airbnb-muted">에어비앤비 감성으로 관리하는 에이전트 워크플로우</p>
          </header>
          <Board />
        </div>
        
        <ChatPanel />
      </div>
    </div>
  );
}

export default App;
