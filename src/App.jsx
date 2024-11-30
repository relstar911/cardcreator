import CardCanvas from './components/CardCanvas'
import Toolbar from './components/Toolbar'
import PropertiesPanel from './components/PropertiesPanel'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TCG Card Creator</h1>
      </header>
      <main className="app-main">
        <div className="toolbar">
          <Toolbar />
        </div>
        <div className="canvas-container">
          <CardCanvas />
        </div>
        <div className="properties-panel">
          <PropertiesPanel />
        </div>
      </main>
    </div>
  )
}

export default App
