import React, { ReactNode } from 'react';
import { RealmProvider, useRealm } from './context/RealmContext';
import Login from './pages/Login';
import { StorageProvider } from './context/StorageContext';


const UserManagement: React.FC<{children: ReactNode}> = ({ children }) => {
    const { currentUser, login, register, logout } = useRealm();

    // Check if user is logged in
    const isAuthenticated = currentUser !== null;

    // Define functions for login and logout
    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
        } catch (error) {
            console.error("Failed to log in:", error);
            // Handle login failure (e.g., show error message)
        }
    };

    const handleRegister= async (email: string, password: string) => {
        try {
            await register(email, password);
        } catch (error) {
            console.error("Failed to register in:", error);
            // Handle login failure (e.g., show error message)
        }
    };


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out:", error);
            // Handle logout failure (e.g., show error message)
        }
    };
    return (
        <>
            {isAuthenticated ? children : <Login onLogin={handleLogin} onRegister={handleRegister}/>}
        </>
    );
};

export default UserManagement;
