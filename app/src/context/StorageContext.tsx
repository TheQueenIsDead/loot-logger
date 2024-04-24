import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../Storage';

interface StorageContextType {
    config: Config;
    history: HistoryLog[];
    pushHistoryLog: (log: HistoryLog) => Promise<void>;
    saveConfig: (config: Config) => Promise<void>;
}

const defaultContextValue: StorageContextType = {
    config: {
        salary: 0,
        hours: 0,
        wage: 0,
    }, // Assuming an empty object can be a default state
    history: [],
    pushHistoryLog: async () => {},
    saveConfig: async () => {}
};

const StorageContext = createContext<StorageContextType>(defaultContextValue);

export const useStorage = () => useContext(StorageContext);

export const StorageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [config, setConfig] = useState<Config>(defaultContextValue.config);
    const [history, setHistory] = useState<HistoryLog[]>([]);

    const pushHistoryLog = async (log: HistoryLog) => {
        try {
            const store = await StorageService.getInstance();
            await store.pushHistory(log);
            setHistory([...history, log]);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const saveConfig = async (config: Config) => {
        try {
            const store = await StorageService.getInstance();
            await store.setConfig(config);
            setConfig(config);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    useEffect(() => {
        const fetchStorageData = async () => {
            const store = await StorageService.getInstance();
            const [loadedConfig, loadedHistory] = await Promise.all([
                store.getConfig(),
                store.getHistory()
            ]);
            setConfig(loadedConfig);
            setHistory(loadedHistory);
        };

        fetchStorageData();
    }, []);

    return (
        <StorageContext.Provider value={{ config, history, pushHistoryLog, saveConfig }}>
            {children}
        </StorageContext.Provider>
    );
};