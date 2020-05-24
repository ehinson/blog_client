import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import 'regenerator-runtime';

import App from './views/containers/App';
import ErrorBoundary from './ErrorBoundary';

const renderApp = () =>
  ReactDOM.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    document.querySelector('#root'),
  );

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept(App, renderApp);
// }

renderApp();
