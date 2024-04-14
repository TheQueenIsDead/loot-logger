import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './History.css';
import HistoryContainer from "../components/HistoryContainer";

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