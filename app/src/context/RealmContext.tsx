import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Realm from 'realm-web';
import {User} from "realm-web";

const REALM_APP_ID = process.env.MONGO_REALM_APP_ID || ""; // Replace with your App ID
const app = new Realm.App({ id: REALM_APP_ID });

interface RealmContextType {
    app: Realm.App | null;
    currentUser: Realm.User | null;
    login: (email: string, password: string) => Promise<Realm.User>;
    register: (email: string, password: string) => Promise<Realm.User>;
    logout: () => Promise<void>;
}

const defaultAuthContext: RealmContextType = {
    app: null,
    currentUser: null,
    login: async (): Promise<Realm.User> => { return new Promise<Realm.User>(() => {return null})},
    register: async (): Promise<Realm.User> => { return new Promise<Realm.User>(() => {return null})},
    logout: async () => {}
};

const RealmContext = createContext<RealmContextType>(defaultAuthContext);

export function useRealm() {
    return useContext(RealmContext);
}

export const RealmProvider = ({ children }: { children: ReactNode }) => {
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
        const user = await app.logIn(credentials)
        if (user !== null) {
            setCurrentUser(user)
        }
        return user
    }

    async function register(email: string, password: string) {

        // Try register the user with email/password credentials
        try {
            await app.emailPasswordAuth.registerUser({email, password})
            // Automatically log in the user after registration
            return login(email, password)
        } catch (err) {
            throw err
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
        app,
        currentUser,
        login,
        register,
        logout
    };

    return (
        <RealmContext.Provider value={value}>
            {!loading && children}
        </RealmContext.Provider>
    );
};
