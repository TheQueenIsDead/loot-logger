import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from "react";

interface HistoryProps {
    history: HistoryLog[]
    saveHistory: (history: HistoryLog) => void
}
const History: React.FC<HistoryProps> = ({history, saveHistory}) => {

    // TODO: Remove the ability to add miscellaneous history used in testing
    const addHistory = async () => {
        saveHistory({
            start: 1,
            end: 1,
            wage: 69,
        })
    }


    const formatTime = (time: number): string => {
        const date = new Date(time)
        return date.toLocaleTimeString()
    }

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

            <div className="container">
                <IonList>
                    <IonItem>
                        <IonLabel>Start</IonLabel>
                        <IonLabel>End</IonLabel>
                        <IonLabel>Duration</IonLabel>
                        <IonLabel>Wage ($/hour)</IonLabel>
                        <IonLabel>Earned</IonLabel>
                    </IonItem>
                    {/* Map through the items array and render each item */}
                    {history.map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel>{formatTime(item.start)}</IonLabel>
                            <IonLabel>{formatTime(item.end)}</IonLabel>
                            <IonLabel>{(item.end - item.start) / 1000}</IonLabel>
                            <IonLabel>${item.wage.toFixed(2)}</IonLabel>
                            <IonLabel>${(((item.end - item.start) / 1000) * (item.wage / 60 / 60)).toFixed(2)}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                {/*TODO: Remove the ability to add miscellaneous history used in testing*/}
                <IonButton onClick={addHistory}>
                    New
                </IonButton>
            </div>

        </IonContent>
    </IonPage>
    );
};

export default History;
