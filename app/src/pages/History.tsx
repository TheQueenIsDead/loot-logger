import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from "react";
import {useStorage} from '../context/StorageContext';
import Header from '../components/Header';
import moment from "moment";
import {MongoHistoryLog} from "../models/models";

const History: React.FC = () => {

    const { history } = useStorage();

    const formatTime = (time: Date): string => {
        return moment(time).format("YYYY-MM-DD h:ma ")
    }

    const timeDiffMilliseconds = (start: Date, end: Date): number => {
        return moment(end).diff(moment(start), 'milliseconds')

    }
    const formatTimeDiff = (start: Date, end: Date): string => {
        const diff = timeDiffMilliseconds(start, end)

        if (diff / 1000 >= 60) {
            return moment.utc(diff).format("m[m] ss[s]")
        }
        return moment.utc(diff).format("s[s]")
    }

    const calculateEarned = (log: MongoHistoryLog): number => {
        return (((timeDiffMilliseconds(log.start, log.end)) / 1000) * (log.wage / 60 / 60))
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
                        <IonLabel>Duration</IonLabel>
                        <IonLabel>Wage ($/hour)</IonLabel>
                        <IonLabel>Earned</IonLabel>
                    </IonItem>
                    {/* Map through the items array and render each item */}
                    {history.length > 0 ? (
                    history.map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel>{formatTime(item.start)}</IonLabel>
                            <IonLabel>{formatTimeDiff(item.start, item.end)}</IonLabel>
                            {item.wage != null ? (
                                <IonLabel>${item.wage.toFixed(2)} per hour</IonLabel>
                            ) : (<IonLabel>Wage information missing</IonLabel>)}                            
                            <IonLabel>${calculateEarned(item).toFixed(2)}</IonLabel>
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
