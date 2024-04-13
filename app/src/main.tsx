import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GetStore from './lib/store'

// Call GetStore on app startup in order to initialise the singleton
await GetStore()

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);