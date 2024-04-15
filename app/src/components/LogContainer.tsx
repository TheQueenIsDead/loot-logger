import './LogContainer.css';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {useEffect, useState} from "react";
import {StorageService} from "../services/Storage";

const LogContainer: React.FC = () => {
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const wage = 12.34

    useEffect(() => {
        if (startTime !== null) {
            const id = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1); // Update every millisecond

            setTimerId(id);

            return () => clearInterval(id);
        }
    }, [startTime]);

    const formatTime = (time: number): string => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = Math.floor((time % 1000) / 10); // Extract milliseconds and round
        return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const moneyEarned = (time: number): string => {
        const moneyPerSecond = wage / 60 / 60
        return (Math.round(time/1000 * moneyPerSecond * 100) / 100).toFixed(2)
    }

    const handleStart = () => {
        setStartTime(Date.now());
    };

    const handleStop = () => {
        if (timerId) {
            clearInterval(timerId);
        }
    };

    const handleReset = async () => {

        const store = await StorageService.getInstance()
        const config = await store.getConfig()
        await store.pushHistory({
            start: startTime,
            end: Date.now(),
            wage: config.wage,
        })

        setStartTime(null);
        setElapsedTime(0);
        if (timerId) {
            clearInterval(timerId);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Timer App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div style={{ textAlign: 'center' }}>
                    <h2>{formatTime(elapsedTime)} seconds</h2>
                    <h2>${moneyEarned(elapsedTime)} earned</h2>
                    {startTime === null ? (
                        <IonButton onClick={handleStart}>Start</IonButton>
                    ) : (
                        <IonButton onClick={handleStop}>Stop</IonButton>
                    )}
                    <IonButton onClick={handleReset} disabled={startTime === null}>
                        Reset
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LogContainer;
