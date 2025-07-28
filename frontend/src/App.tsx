import { useState, useEffect } from 'react'
import './App.css'

interface ApiResponse {
  message?: string;
  status?: string;
  timestamp?: string;
}

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [apiHealth, setApiHealth] = useState<ApiResponse | null>(null)

  useEffect(() => {
    // Test de l'API
    fetch('/api')
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => console.error('Erreur API:', err))

    fetch('/api/health')
      .then(res => res.json())
      .then(data => setApiHealth(data))
      .catch(err => console.error('Erreur Health:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-8 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          🌸 Geisha Garden 🌸
        </h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Frontend + Backend Intégré</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-300 mb-2">✅ API Status</h3>
              <p className="text-white text-sm">
                {apiData ? apiData.message : 'Chargement...'}
              </p>
            </div>
            
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">🏥 Health Check</h3>
              <p className="text-white text-sm">
                {apiHealth ? `${apiHealth.status} - ${new Date(apiHealth.timestamp || '').toLocaleTimeString()}` : 'Chargement...'}
              </p>
            </div>
          </div>
          
          <div className="bg-purple-500/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">🔢 Counter React</h3>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Count is {count}
            </button>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm">
          🚀 Un seul serveur sur <code className="bg-gray-800 px-2 py-1 rounded">localhost:4000</code>
        </p>
      </div>
    </div>
  )
}

export default App
