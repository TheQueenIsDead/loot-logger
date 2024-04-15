import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LogContainer from '../components/LogContainer';
import './Log.css';

const Log: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LogContainer />
      </IonContent>
    </IonPage>
  );
};

export default Log;
