import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { stopwatch, list, settings } from 'ionicons/icons';
import Log from './pages/Log';
import History from './pages/History';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { DefaultAppContextData} from "./AppContext";
import {useEffect, useState} from "react";
import {StorageService} from "./Storage";
import history from "./pages/History";

setupIonicReact();


const App: React.FC = () => {

  const [config, setConfig] = useState<Config>(DefaultAppContextData.settings)
  const [history, setHistory] = useState<HistoryLog[]>(DefaultAppContextData.history)


  // Save history is a hook that can be passed to components to that they can push new history logs.
  // It will update the reactive history state as well as persist to the ionic storage.
  const saveHistory = (log: HistoryLog) => {
    setHistory([...history, log])

    StorageService.getInstance()
      .then(store => {
        store.pushHistory(log)
            .then(() => {
              console.log("Pushed history record: " + JSON.stringify(log))
            })
            .catch(err => {
              console.log("Failed to push history record: " + err)
            })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    StorageService.getInstance().then(service => {
      service.getConfig()
      .then(config => {
        console.log("Updating config")
        setConfig(config)
      })
      service.getHistory().then(history => {
        console.log("Updating history")
        if (history !== null) {
          setHistory(history)
        }
      })
    })
  }, []);

  useEffect(() => {
    console.log("UPDATING ROOT CONFIG" + JSON.stringify(config))
  }, [config]);

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/log">
            <Log wage={config.wage} saveHistory={saveHistory} />
          </Route>
          <Route exact path="/history">
            <History history={history} saveHistory={saveHistory}/>
          </Route>
          <Route path="/settings">
            <Settings config={config} setConfig={setConfig}/>
          </Route>
          <Route exact path="/">
            <Redirect to="/log" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="log" href="/log">
            <IonIcon aria-hidden="true" icon={stopwatch} />
            <IonLabel>Log</IonLabel>
          </IonTabButton>
          <IonTabButton tab="history" href="/history">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>History</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
