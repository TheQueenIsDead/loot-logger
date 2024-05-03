import React, { useState } from 'react';
import {IonButton, IonInput, IonItem, IonLabel, useIonToast} from '@ionic/react';

interface LoginProps {
    onLogin: (email: string, password: string) => Promise<Realm.User>;
    onRegister: (email: string, password: string) => Promise<Realm.User>;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [present] = useIonToast();

    const handleLogin = () => {
        // Call the login function with email and password
        onLogin(email, password).catch((err) => {
            present({
                message: "Failed to login: " + err.error,
                duration: 3000,
                position: 'top',
            })
        });
    };

    const handleRegister = () => {
        // Call the register function with email and password
        onRegister(email, password).catch((err) => {
            present({
                message: "Failed to register: " + err.error,
                duration: 3000,
                position: 'top',
            })
        });
    };

    return (
        <div>
            <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                />
            </IonItem>
            <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
            <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
        </div>
    );
};

export default Login;
