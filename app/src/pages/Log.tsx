import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useEffect, useState} from "react";


interface LogProps {
    wage: number
    saveHistory: (log: HistoryLog) => void
}

const Log: React.FC<LogProps> = ({wage, saveHistory}) => {

    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (startTime !== 0) {
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
        const seconds = Math.floor(time / 1000);
        const moneyPerSecond = wage / 60 / 60
        return (Math.round(seconds * moneyPerSecond * 100) / 100).toFixed(2)
    }

    const handleStart = () => {
        setStartTime(Date.now());
    };

    const handleStop = () => {
        if (timerId) {
            clearInterval(timerId);
        }
    };

    // TODO: Move state up to the parent app so that the history page updates when the reset button is pushed.
    const handleReset = async () => {
        saveHistory({
            end: startTime,
            start: Date.now(),
            wage: wage
        })

        setStartTime(0);
        setElapsedTime(0);
        if (timerId) {
            clearInterval(timerId);
        }
    };



    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Log</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div className="container">
                <div style={{textAlign: 'center'}}>
                    <h2>{formatTime(elapsedTime)} seconds</h2>
                    {/*<h2>${moneyEarned(elapsedTime)} earned @ ${wage}/ph</h2>*/}
                    <h2>${moneyEarned(elapsedTime)} earned @ ${wage.toFixed(2)}/ph</h2>
                    {startTime === 0 ? (
                        <IonButton onClick={handleStart}>Start</IonButton>
                    ) : (
                        <IonButton onClick={handleStop}>Stop</IonButton>
                    )}
                    <IonButton onClick={handleReset} disabled={startTime === null}>
                        Reset
                    </IonButton>
                </div>
            </div>


        </IonContent>
    </IonPage>
    );
};

export default Log;
