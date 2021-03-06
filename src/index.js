import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import 'regenerator-runtime';

import App from './views/pages/App';
import ErrorBoundary from './ErrorBoundary';

const renderApp = () =>
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.querySelector('#root'),
  );

renderApp();
