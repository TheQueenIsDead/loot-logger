import './SettingsContainer.css';

import {IonAlert, IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {StorageService} from '../services/Storage';
import {save} from "ionicons/icons";

type History = {
    start: number,
    end: number,
    wage: number,
}


const HistoryContainer: React.FC = () => {

    const [history, setHistory] = useState<History[]>([])

    const loadHistory = async () => {
        const store = await StorageService.getInstance()
        const history = await store.getHistory()
        setHistory(history)
    }

    // TODO: Remove the ability to add miscellaneous history used in testing
    const addHistory = () => {
        setHistory([
            ...history,
            {
                start: 1,
                end: 1,
                wage: 1,
            }
        ])
    }

    // Populate previous settings on load
    useEffect(() => { loadHistory() }, []);

    return (
        <div className="container">
            <IonList>
                <IonItem>
                    <IonLabel>Start</IonLabel>
                    <IonLabel>End</IonLabel>
                    <IonLabel>Wage</IonLabel>
                </IonItem>
                {/* Map through the items array and render each item */}
                {history.map((item, index) => (
                <IonItem key={index}>
                {/*<IonItem>*/}
                    <IonLabel>{item.start}</IonLabel>
                    <IonLabel>{item.end}</IonLabel>
                    <IonLabel>{item.wage}</IonLabel>
                </IonItem>
                ))}
            </IonList>
            {/*TODO: Remove the ability to add miscellaneous history used in testing*/}
            <IonButton onClick={addHistory}>
                New
            </IonButton>
        </div>
    );
};

export default HistoryContainer;
