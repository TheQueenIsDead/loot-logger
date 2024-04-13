import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SettingsContainer from "../components/SettingsContainer";
import './Settings.css';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SettingsContainer/>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
