import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {useEffect, useState} from "react";
import { useStorage } from '../context/StorageContext';
import Header from '../components/Header';
import moment from 'moment';
import {useRealm} from "../context/RealmContext";


const Log: React.FC = () => {

    const {currentUser} = useRealm();
    const { config, pushHistoryLog } = useStorage();


    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [moneyEarned, setMoneyEarned] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (startTime) {
            const id = setInterval(() => {
                const now = moment();
                setElapsedTime(now.diff(startTime));
                setMoneyEarned(calculateMoneyEarned(now.diff(startTime)));
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

    const calculateMoneyEarned = (elapsedTimeMilliseconds: number): number => {
        const wagePerMinute = config.wage / 60
        const wagePerSecond = wagePerMinute / 60
        const wagePerMillisecond = wagePerSecond / 1000
        return elapsedTimeMilliseconds * wagePerMillisecond
    }

    const handleStart = () => {
        setStartTime(moment());
    }
    const handleStop = () => {
        if (timerId) {
            clearInterval(timerId);
        }
    };

    // TODO: Change this to only persist if the timer has started
    //  (It's possible to add 0 duration logs by clicking this)
    const handleReset = async () => {
        if (currentUser === null) {
            // TODO: Handle nicely.
            return
        }
        if (startTime) {
            pushHistoryLog({
                owner_id: currentUser.id,
                start: startTime.toDate(),
                end: moment(startTime).add(elapsedTime, 'milliseconds').toDate(),
                wage: config.wage
            });
        }

        setStartTime(null);
        setElapsedTime(0);
        setMoneyEarned(0);
        if (timerId) {
            clearInterval(timerId);
        }
    };



    return (
    <IonPage>
        <Header title='Log'/>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Log</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div className="container">
                <div style={{textAlign: 'center'}}>
                    <h2>{formatTime(elapsedTime)} seconds</h2>
                    <h2>${moneyEarned.toFixed(2)} earned @ ${config.wage.toFixed(2)}/ph</h2>
                    {startTime === null ? (
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
