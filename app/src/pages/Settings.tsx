import {
    IonButton,
    IonContent,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, {useEffect, useState} from "react";
import {save} from "ionicons/icons";

interface SettingsProps {
    config: Config
    setConfig: (config: Config) => void
}

const Settings: React.FC<SettingsProps> = ({config, setConfig}) => {

    // TODO: Remove if not needed
    // const [present] = useIonToast();

    // Keep passed in props in local state in order to udate UI components
    let [state, setState] = useState<Config>(config)

    // Helper functions to update local state items
    const setSalary= (salary: number) => {setState(previous => { return {...previous, ...{salary: salary}}})}
    const setHours= (hours: number) => {setState(previous => { return {...previous, ...{hours: hours}}})}
    const setWage= (wage: number) => {setState(previous => { return {...previous, ...{wage: wage}}})}

    // If the props are updated, update the local state with the changed values.
    useEffect(() => {
        setState(config)
    }, [config]);

    // Calculate the hourly wage when local salary or hours are updated
    useEffect(() => {
        calculateHourlyWage();
    }, [state.salary, state.hours]);

    const calculateHourlyWage = () => {
        console.log("Caclulating.... 🤓")
        if (state.salary > 0 && state.hours > 0) {
            const hourlyWageResult = state.salary / (52 * state.hours);
            if (hourlyWageResult !== state.wage) {
                setWage(hourlyWageResult)
            }
        }
    };

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
                              onIonChange={(e) => setSalary(parseInt(e.detail.value!, 10))}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Weekly Hours Worked</IonLabel>
                    <IonInput type="number" value={state.hours}
                              onIonChange={(e) => setHours(parseInt(e.detail.value!, 10))}></IonInput>
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

                <IonButton onClick={() => {
                    console.log(state)
                    setConfig(state)
                }}>
                    <IonIcon icon={save}/> Save
                </IonButton>
            </div>

        </IonContent>
    </IonPage>
    );
};

export default Settings;
