import './SettingsContainer.css';

import {IonAlert, IonInput, IonItem, IonLabel, IonList} from "@ionic/react";
import {useEffect, useState} from "react";
import {StorageService} from '../services/Storage';

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


    StorageService.getInstance().then(store => {
        console.log("Managed to get db:" + JSON.stringify(store));
        store.getConfig().then(res => {
            console.log(JSON.stringify(res))
            setYearlySalary(res.salary)
            setWeeklyHours(res.hours)
            setHourlyWage(res.wage)
        })
    }).catch(err => {
        console.log("Failed to get db: " + err.toString())
    })


    // Calculate the hourly wage when yearly salary or weekly hours is updated
    useEffect(() => {
        calculateHourlyWage();
    }, [yearlySalary, weeklyHours]);

    // // Save settings to the ionic store when an hourly wage is successfully calculated
    // useEffect(() => {
    //     StorageService.getInstance().then(store => {
    //         store.setConfig(yearlySalary, weeklyHours, hourlyWage)
    //     })
    // }, [hourlyWage]);


    const calculateHourlyWage = () => {
        if (yearlySalary > 0 && weeklyHours > 0) {
            const hourlyWageResult = yearlySalary / (52 * weeklyHours);
            if (hourlyWageResult !== hourlyWage) {
                setHourlyWage(hourlyWageResult);
            }
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
