import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import * as Sentry from "@sentry/capacitor";
import * as SentryReact from "@sentry/react";

Sentry.init({
    dsn: "https://8fe32e4624f58f6e753fe034b5022d81@o4507146805772288.ingest.de.sentry.io/4507146808655952",
    // release: "",
    // dist: "",
    tracesSampleRate: 1,
    integrations: [],
    debug: true
}, SentryReact.init);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);