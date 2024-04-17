import {
    IonAlert, IonButton,
    IonContent,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonToast
} from '@ionic/react';
import React, {useEffect, useState} from "react";
import {StorageService} from "../Storage";
import {save} from "ionicons/icons";

interface SettingsProps {
    config: Config
    setConfig: (config: Config) => void
}

const Settings: React.FC<SettingsProps> = ({config, setConfig}) => {


    let [state, setState] = useState<Config>(config)

    // const [showAlert, setShowAlert] = useState<boolean>(false);

    // const hourlyWage = useContext(AppContext);

    const [present] = useIonToast();

    // const loadSettings = async () => {
    //     const store = await StorageService.getInstance()
    //     const config = await store.getConfig()
    //     const settings: Config = {
    //         hours: config.hours,
    //         salary: config.salary,
    //         wage: config.wage
    //     }
    //     return settings
    // }
    const saveSettings = async () => {
        // const store = await StorageService.getInstance()
        // store.setConfig(yearlySalary, weeklyHours, hourlyWage)
        //     .then(() => {
        //         present("Config Updated.", 3000)
        //     })
        //     .catch(() => {
        //         present("Failed to save configuration!", 3000)
        //     })
        console.log({
            hours: state.hours,
            salary: state.salary,
            wage: state.wage
        })
        // TODO: Enable persistence
        // setConfig({
        //     hours: state.hours,
        //     salary: state.salary,
        //     wage: state.wage
        // })
    }

    const calculateHourlyWage = () => {
        if (state.salary > 0 && state.hours > 0) {
            const hourlyWageResult = state.salary / (52 * state.hours);
            if (hourlyWageResult !== state.wage) {
                // TODO: Update this in context
                // setHourlyWage(hourlyWageResult);
                state.wage = hourlyWageResult;
                console.log(hourlyWageResult)
            }
        }
    };

    // // Populate previous settings on load
    // useEffect(() => {
    //     loadSettings().then(config => {
    //         setYearlySalary(config.salary)
    //         setWeeklyHours(config.hours)
    //         // TODO: Update this in context
    //         // setHourlyWage(config.wage)
    //         console.log(config.wage)
    //     })
    // }, []);

    // Calculate the hourly wage when yearly salary or weekly hours is updated
    useEffect(() => {
        calculateHourlyWage();
    }, [state.salary, state.hours]);


    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Settings</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div className="container">
                <IonItem>
                    <IonLabel position="floating">Yearly Salary ($)</IonLabel>
                    <IonInput type="number" value={state.salary}
                              onIonChange={(e) => state.salary = parseInt(e.detail.value!, 10)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Weekly Hours Worked</IonLabel>
                    <IonInput type="number" value={state.hours}
                              onIonChange={(e) => state.hours = parseInt(e.detail.value!, 10)}></IonInput>
                </IonItem>
                {state.wage !== null && (
                    <IonItem>
                        <IonLabel>Hourly Wage: ${state.wage.toFixed(2)}</IonLabel>
                    </IonItem>
                )}
                {/*<IonAlert*/}
                {/*    isOpen={showAlert}*/}
                {/*    onDidDismiss={() => setShowAlert(false)}*/}
                {/*    header="Invalid Input"*/}
                {/*    message="Please enter valid values for Yearly Salary and Weekly Hours."*/}
                {/*    buttons={['OK']}*/}
                {/*/>*/}

                <IonButton onClick={saveSettings}>
                    <IonIcon icon={save}/> Save
                </IonButton>
            </div>

        </IonContent>
    </IonPage>
    );
};

export default Settings;
