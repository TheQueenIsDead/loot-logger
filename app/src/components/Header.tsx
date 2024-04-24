import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { logout } = useAuth();

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
