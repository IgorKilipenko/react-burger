import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const root = ReactDOM.createRoot(document.querySelector('#root'));
  root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);