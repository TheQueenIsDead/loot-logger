import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HistoryContainer from "../components/HistoryContainer";
import './History.css';

const History: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HistoryContainer />
      </IonContent>
    </IonPage>
  );
};

export default History;
