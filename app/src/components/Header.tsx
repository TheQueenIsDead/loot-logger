import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { useRealm } from '../context/RealmContext';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { logout } = useRealm();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to logout:", error);
            // Handle logout failure (e.g., show error message)
        }
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={handleLogout}>Logout</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
