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

interface HistoryProps {
    history: HistoryLog[]
}
const History: React.FC<HistoryProps> = ({history}) => {

    const [totalTime, setTotalTime] = useState(0)
    const [totalEarned, setTotalEarned] = useState(0)
    const formatTime = (time: number): string => {
        const date = new Date(time)
        return date.toLocaleTimeString()
    }

    const calculateEarned = (item: HistoryLog): number => {
        return (((item.end - item.start) / 1000) * (item.wage / 60 / 60))
    }

    useEffect(() => {
        setTotalEarned(0)
        setTotalTime(0)
        history.forEach(log => {
            setTotalTime(previous => {
                return previous + ((log.end - log.start) / 1000)
            })
            setTotalEarned(previous => {
                return previous + calculateEarned(log)
            })
        })
    }, [history])

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
                    <IonItem key="summary">
                        <IonLabel></IonLabel>
                        <IonLabel></IonLabel>
                        <IonLabel>{totalTime.toFixed(2)}s</IonLabel>
                        <IonLabel></IonLabel>
                        <IonLabel>${totalEarned.toFixed(2)}</IonLabel>
                    </IonItem>
                </IonList>
            </div>
        </IonContent>
    </IonPage>
    );
};

export default History;
