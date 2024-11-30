import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CardCanvas from './components/CardCanvas';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong:</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="app">
          <div className="toolbar">
            <Toolbar />
          </div>
          <div className="main-content">
            <div className="card-canvas-container">
              <CardCanvas />
            </div>
            <PropertiesPanel />
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
