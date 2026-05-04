import './index.css'
import { Heart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-white text-airbnb-ink font-sans">
      <header className="p-6 border-b border-airbnb-hairline">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Heart className="text-airbnb-red" size={28} />
          FabriX Lite
        </h1>
      </header>
      <main className="p-6">
        <div className="bg-airbnb-surface rounded-airbnb p-6 soft-shadow">
          <h2 className="text-xl font-medium mb-2">Airbnb Design System</h2>
          <p className="text-airbnb-body">React + Vite + Tailwind v4</p>
        </div>
      </main>
    </div>
  )
}

export default App
