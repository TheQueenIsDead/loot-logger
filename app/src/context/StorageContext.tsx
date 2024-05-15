import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../Storage';
import {useRealm} from "./RealmContext";
import { MongoHistoryLog } from '../models/models'


import * as Realm from "realm-web";
// @ts-ignore
const {
    BSON: { ObjectId },
} = Realm;

interface StorageContextType {
    config: Config;
    history: MongoHistoryLog[];
    pushHistoryLog: (log: MongoHistoryLog) => Promise<globalThis.Realm.Services.MongoDB.InsertOneResult<any>>;
    saveConfig: (config: Config) => Promise<void>;
    deleteHistoryLog: (log: MongoHistoryLog) => Promise<globalThis.Realm.Services.MongoDB.DeleteResult>;
}

const defaultContextValue: StorageContextType = {
    config: {
        salary: 0,
        hours: 0,
        wage: 0,
    }, // Assuming an empty object can be a default state
    history: [],
    pushHistoryLog: async (): Promise<globalThis.Realm.Services.MongoDB.InsertOneResult<any>> => { return new Promise(() => {})},
    saveConfig: async () => {},
    deleteHistoryLog: async (): Promise<globalThis.Realm.Services.MongoDB.DeleteResult> => { return new Promise(() => {})}
};

const StorageContext = createContext<StorageContextType>(defaultContextValue);

export const useStorage = () => useContext(StorageContext);



export const StorageProvider: React.FC<{children: ReactNode}> = ({ children }) => {

    const {currentUser} = useRealm();
    const [config, setConfig] = useState<Config>(defaultContextValue.config);
    const [history, setHistory] = useState<MongoHistoryLog[]>([]);

    useEffect(() => {
        getHistoryLog().then(h => {
            setHistory(h)
        })

    }, []);

    const getHistoryLog = async () : Promise<MongoHistoryLog[]> => {
        if (currentUser === null){
            throw 'could not retrieve history from database'
        }
        const mongo = currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('history').collection('logs');
        const res  = await collection.find({owner_id: currentUser.id});

        let history: MongoHistoryLog[] = [];
        for (let r of res) {
            history.push({
                owner_id: r.owner_id,
                start: r.start,
                end: r.end,
                wage: r.wage,
            })
        }
        return history
    }
    const pushHistoryLog = async (log: MongoHistoryLog): Promise<globalThis.Realm.Services.MongoDB.InsertOneResult<any>> => {

        if (currentUser === null) {
            throw 'could not push to database'
        }

        const mongo = currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('history').collection('logs');
        const res  = await collection.insertOne(log);

        if (res !== null) {
            setHistory([
                ...history,
                log
            ])
        }

        return res
    };
    const deleteHistoryLog = async (log: MongoHistoryLog): Promise<any> => {

        if (currentUser === null) {
            throw 'could not push to database'
        }

        const mongo = currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('history').collection('logs');

        const res = await collection.deleteOne(log);

        console.log(res)

        if (res.deletedCount > 0) {
            let newHistory = [...history]
            newHistory.splice(newHistory.indexOf(log), 1)
            setHistory(newHistory)
        }

        return res
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
        <StorageContext.Provider value={{ config, history, pushHistoryLog, saveConfig, deleteHistoryLog}}>
            {children}
        </StorageContext.Provider>
    );
};