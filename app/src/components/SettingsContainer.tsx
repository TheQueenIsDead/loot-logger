import './SettingsContainer.css';

import {IonAlert, IonButton, IonIcon, IonInput, IonItem, IonLabel} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {StorageService} from '../services/Storage';
import {save} from "ionicons/icons";

type Settings = {
    salary: number,
    hours: number,
    wage: number | null,
}


const SettingsContainer: React.FC = () => {

    const [yearlySalary, setYearlySalary] = useState<number>(0);
    const [weeklyHours, setWeeklyHours] = useState<number>(0);
    const [hourlyWage, setHourlyWage] = useState<number | null>(0);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const loadSettings = async () => {
        const store = await StorageService.getInstance()
        const config = await store.getConfig()
        const settings: Settings = {
            hours: config.hours,
            salary: config.salary,
            wage: config.wage
        }
        return settings
    }
    const saveSettings = () => {
        console.log("saving settings!!!")
        StorageService.getInstance().then(store => {
            store.setConfig(yearlySalary, weeklyHours, hourlyWage).then(()=>{
                console.log("updated thing!!!")
            }).catch(()=> {
                console.log("failed to set config")
            })
        }).catch(() => {
            console.log("failed to get store")
        })
    }

    const calculateHourlyWage = () => {
        if (yearlySalary > 0 && weeklyHours > 0) {
            const hourlyWageResult = yearlySalary / (52 * weeklyHours);
            if (hourlyWageResult !== hourlyWage) {
                setHourlyWage(hourlyWageResult);
            }
        }
    };

    // Load previous settings on load
    useEffect(() => {
        loadSettings().then(config => {
            setYearlySalary(config.salary)
            setWeeklyHours(config.hours)
            setHourlyWage(config.wage)
        })
    }, []);

    // Calculate the hourly wage when yearly salary or weekly hours is updated
    useEffect(() => {
        calculateHourlyWage();
    }, [yearlySalary, weeklyHours]);

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

            <IonButton onClick={saveSettings}>
                <IonIcon icon={save}/> Save
            </IonButton>
        </div>
    );
};

export default SettingsContainer;
