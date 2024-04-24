import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Realm from 'realm-web';

const REALM_APP_ID = "application-0-vyzlwzl"; // Replace with your App ID
const app = new Realm.App({ id: REALM_APP_ID });

interface AuthContextType {
    currentUser: Realm.User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
    currentUser: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<Realm.User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if currentUser is already set in the app
        if (app.currentUser) {
            setCurrentUser(app.currentUser);
        }
        setLoading(false);
    }, []);
   
    async function login(email: string, password: string) {
        const credentials = Realm.Credentials.emailPassword(email, password);
        console.log(credentials)
        try {
            const user = await app.logIn(credentials);
            setCurrentUser(user);
        } catch (error) {
            console.error("Failed to log in", error);
        }
    }

    async function register(email: string, password: string) {
        try {
            // Register the user with email/password credentials
            await app.emailPasswordAuth.registerUser({email, password});
            // Automatically log in the user after registration
            await login(email, password);
        } catch (error) {
            console.error("Failed to register", error);
            throw error; // Rethrow the error for handling in the UI
        }
    }

    async function logout() {
        if (currentUser && app.currentUser) {
            try {
                await app.currentUser.logOut();
                setCurrentUser(null);
            } catch (error) {
                console.error("Error logging out", error);
            }
        }
    }

    const value = {
        currentUser,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
