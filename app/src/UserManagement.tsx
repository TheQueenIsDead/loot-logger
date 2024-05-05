import React, { ReactNode } from 'react';
import { useRealm } from './context/RealmContext';
import Login from './pages/Login';


const UserManagement: React.FC<{children: ReactNode}> = ({ children }) => {
    const { currentUser, login, register, logout } = useRealm();

    // Check if user is logged in
    const isAuthenticated = currentUser !== null;

    // Define functions for login and logout
    const handleLogin = async (email: string, password: string) => {
        return login(email, password);
    };

    const handleRegister= async (email: string, password: string) => {
        return register(email, password);
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
