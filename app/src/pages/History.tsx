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
import { useStorage } from '../context/StorageContext';
import Header from '../components/Header';
import moment from "moment";

const History: React.FC = () => {

    const { history } = useStorage();

    const formatTime = (time: Date): string => {
        const date = new Date(time)

        return moment(time).format("YYYY-MM-DD h:m:s a ")
        // return date.toLocaleTimeString()
    }

    return (
    <IonPage>
        <Header title='History'/>
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
                    {history.length > 0 ? (
                    history.map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel>{formatTime(item.start)}</IonLabel>
                            <IonLabel>{formatTime(item.end)}</IonLabel>
                            <IonLabel>{(item.end - item.start) / 1000} seconds</IonLabel>
                            {item.wage != null ? (
                                <IonLabel>${item.wage.toFixed(2)} per hour</IonLabel>
                            ) : (<IonLabel>Wage information missing</IonLabel>)}                            
                            <IonLabel>${(((item.end - item.start) / 1000) * (item.wage / 60 / 60)).toFixed(2)}</IonLabel>
                        </IonItem>
                    ))
                ) : (
                    <IonItem>
                        <IonLabel>No history items available</IonLabel>
                    </IonItem>
                )}
                </IonList>
            </div>
        </IonContent>
    </IonPage>
    );
};

export default History;
