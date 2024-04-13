import './SettingsContainer.css';

import {Preferences} from '@capacitor/preferences'
import {IonAlert, IonButton, IonInput, IonItem, IonLabel, IonList} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {Storage} from "@ionic/storage";
import GetStore from "../lib/store";

const setSalary = async () => {
    await Preferences.set({
        key: 'salary',
        value: '50000',
    });
};


const SettingsContainer: React.FC = () => {

    const [yearlySalary, setYearlySalary] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [hourlyWage, setHourlyWage] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    // Calculate the hourly wage when yearly salary or weekly hours is updated
    useEffect(() => {
        calculateHourlyWage();
    }, [yearlySalary, weeklyHours]);

    // Save settings to the ionic store when an hourly wage is successfully calculated
    useEffect(() => {
        persistSettings();
    }, [hourlyWage]);

    const persistSettings: any = async() => {
        const store = await GetStore();
        await Promise.all([
            store.set('salary', yearlySalary),
            store.set('hours', weeklyHours),
            store.set('wage', hourlyWage),
        ])
    }
    const calculateHourlyWage = () => {
        if (yearlySalary > 0 && weeklyHours > 0) {
            const hourlyWageResult = yearlySalary / (52 * weeklyHours);
            setHourlyWage(hourlyWageResult);
        } else {
            setShowAlert(true);
        }
    };

    return (
        <div className="container">
            <IonItem>
                <IonLabel position="floating">Yearly Salary ($)</IonLabel>
                <IonInput type="number" value={yearlySalary} onIonChange={(e) => setYearlySalary(parseInt(e.detail.value!, 10))}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Weekly Hours Worked</IonLabel>
                <IonInput type="number" value={weeklyHours} onIonChange={(e) => setWeeklyHours(parseInt(e.detail.value!, 10))}></IonInput>
            </IonItem>
            {hourlyWage !== null && (
                <IonItem>
                    <IonLabel>Hourly Wage: ${hourlyWage.toFixed(2)}</IonLabel>
                </IonItem>
            )}
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Invalid Input"
                message="Please enter valid values for Yearly Salary and Weekly Hours."
                buttons={['OK']}
            />
        </div>
    );
};

export default SettingsContainer;
