import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface HistoryProps {
    history: HistoryLog[]
}
const History: React.FC<HistoryProps> = ({history}) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1,2,3,4,5,6,7],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [7,6,5,4,3,2,1],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const formatTime = (time: number): string => {
        const date = new Date(time)
        return date.toLocaleTimeString()
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">History</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div className="container">
                <Bar options={options} data={data}/>
                <IonList>
                    <IonItem>
                        <IonLabel>Start</IonLabel>
                        <IonLabel>End</IonLabel>
                        <IonLabel>Duration</IonLabel>
                        <IonLabel>Wage ($/hour)</IonLabel>
                        <IonLabel>Earned</IonLabel>
                    </IonItem>
                    {/* Map through the items array and render each item */}
                    {history.map((item, index) => (
                        <IonItem key={index}>
                            <IonLabel>{formatTime(item.start)}</IonLabel>
                            <IonLabel>{formatTime(item.end)}</IonLabel>
                            <IonLabel>{(item.end - item.start) / 1000}</IonLabel>
                            <IonLabel>${item.wage.toFixed(2)}</IonLabel>
                            <IonLabel>${(((item.end - item.start) / 1000) * (item.wage / 60 / 60)).toFixed(2)}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </div>
        </IonContent>
    </IonPage>
    );
};

export default History;
