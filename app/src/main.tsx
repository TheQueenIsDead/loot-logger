import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import * as Sentry from "@sentry/capacitor";
import * as SentryReact from "@sentry/react";
import {BrowserTracing} from "@sentry/react";


console.log("debug")

Sentry.init(
    {
        dsn: "https://8fe32e4624f58f6e753fe034b5022d81@o4507146805772288.ingest.de.sentry.io/4507146808655952",
        // Set your release version, such as "getsentry@1.0.0"
        release: "my-project-name@<release-name>",
    // Set your dist version, such as "1"
    dist: "<dist>",
    integrations: [
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
        new BrowserTracing(),
    // SentryReact.browserTracingIntegration({
    //     tracePropagationTargets: ["localhost", "https://yourserver.io/api"],
    // }),
],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
},
// Forward the init method from @sentry/angular
SentryReact.init
);



const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);