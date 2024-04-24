import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
    onRegister: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Call the login function with email and password
        onLogin(email, password);
    };

    const handleRegister = () => {
        // Call the register function with email and password
        onRegister(email, password);
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
