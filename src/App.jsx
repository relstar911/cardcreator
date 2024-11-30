import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CardCanvas from './components/CardCanvas';
import Toolbar from './components/Toolbar';
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

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

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
          </div>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
