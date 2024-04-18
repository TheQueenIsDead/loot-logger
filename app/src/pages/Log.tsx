import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useEffect, useState} from "react";


interface LogProps {
    wage: number
    pushHistoryLog: (log: HistoryLog) => void
}

const Log: React.FC<LogProps> = ({wage, pushHistoryLog}) => {

    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [moneyEarned, setMoneyEarned] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (startTime !== 0) {
            const id = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
                setMoneyEarned(calculateMoneyEarned(Date.now() - startTime))
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

    const calculateMoneyEarned = (ellapsedTimeMilliseconds: number): number => {
        const wagePerMinute = wage / 60
        const wagePerSecond = wagePerMinute / 60
        const wagePerMillisecond = wagePerSecond / 1000
        return ellapsedTimeMilliseconds * wagePerMillisecond
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
        pushHistoryLog({
            start: startTime,
            end: startTime + elapsedTime,
            wage: wage
        })

        setStartTime(0);
        setElapsedTime(0);
        setMoneyEarned(0)
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
                    <h2>${moneyEarned.toFixed(2)} earned @ ${wage.toFixed(2)}/ph</h2>
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
