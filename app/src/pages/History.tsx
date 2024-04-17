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
import React, {useEffect, useState} from "react";
import {StorageService} from "../Storage";

interface HistoryProps {
    history: HistoryLog[]
    // TOdo: Make this typesafe
    setHistory: (history: any) => void

}
const History: React.FC<HistoryProps> = ({history, setHistory}) => {


    // const [history, setHistory] = useState<HistoryLog[]>([])

    const loadHistory = async () => {
        const store = await StorageService.getInstance()
        const history = await store.getHistory()

        if (history === null) {
            setHistory([])
        } else {
            setHistory(history)
        }
    }

    // TODO: Remove the ability to add miscellaneous history used in testing
    const addHistory = async () => {
        setHistory([
            ...history,
            {
                start: 1,
                end: 1,
                wage: 1,
            }
        ])
        const store = await StorageService.getInstance()
        store.setHistory(history)
    }

    // Populate previous settings on load
    useEffect(() => { loadHistory() }, []);

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
                        <IonLabel>Wage</IonLabel>
                        <IonLabel>Earned</IonLabel>
                    </IonItem>
                    {/* Map through the items array and render each item */}
                    {history.map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel>{formatTime(item.start)}</IonLabel>
                            <IonLabel>{formatTime(item.end)}</IonLabel>
                            <IonLabel>{(item.end - item.start) / 1000}</IonLabel>
                            <IonLabel>{item.wage}</IonLabel>
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
