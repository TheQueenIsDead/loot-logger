import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import * as SentryCapacitor from "@sentry/capacitor";
import * as SentryReact from "@sentry/react";
import {BrowserTracing} from "@sentry/react";

import {Capacitor} from "@capacitor/core";



switch (Capacitor.getPlatform()) {
    case "web":
        console.log("initialising sentry react")
        // @ts-ignore
        SentryReact.init({
            dsn: "https://8fe32e4624f58f6e753fe034b5022d81@o4507146805772288.ingest.de.sentry.io/4507146808655952",
            // release: "",
            // dist: "",
            tracesSampleRate: 1,
            integrations: [new BrowserTracing()],
            // debug: true
        })
        break
    case "android":
        console.log("initialising sentry capacitor")
        SentryCapacitor.init({
            dsn: "https://8fe32e4624f58f6e753fe034b5022d81@o4507146805772288.ingest.de.sentry.io/4507146808655952",
            // release: "",
            // dist: "",
            tracesSampleRate: 1,
            integrations: [],
            debug: true
        })
        break
    default: // default and ios
        break
}



const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);