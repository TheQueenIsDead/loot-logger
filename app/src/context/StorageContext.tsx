import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '../Storage';
import {useRealm} from "./RealmContext";
import { MongoHistoryLog } from '../models/models'


import * as Realm from "realm-web";
// @ts-ignore
import InsertOneResult = Realm.Services.MongoDB.InsertOneResult;
const {
    BSON: { ObjectId },
} = Realm;


const REALM_APP_ID = process.env.MONGO_REALM_APP_ID || ""; // Replace with your App ID
const app = new Realm.App({ id: REALM_APP_ID });

interface StorageContextType {
    config: Config;
    history: MongoHistoryLog[];
    pushHistoryLog: (log: MongoHistoryLog) => Promise<InsertOneResult<any>>;
    saveConfig: (config: Config) => Promise<void>;
}

const defaultContextValue: StorageContextType = {
    config: {
        salary: 0,
        hours: 0,
        wage: 0,
    }, // Assuming an empty object can be a default state
    history: [],
    pushHistoryLog: async (): Promise<InsertOneResult<any>> => { return new Promise(() => {})},
    saveConfig: async () => {}
};

const StorageContext = createContext<StorageContextType>(defaultContextValue);

export const useStorage = () => useContext(StorageContext);



export const StorageProvider: React.FC<{children: ReactNode}> = ({ children }) => {

    const {currentUser} = useRealm();
    const [config, setConfig] = useState<Config>(defaultContextValue.config);
    const [history, setHistory] = useState<MongoHistoryLog[]>([]);


    const getCollection = (collection: string) => {
       return
    }

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
        console.log(collection)
        const res  = await collection.find({user_id: currentUser.id});

        let history: MongoHistoryLog[] = [];
        for (let r of res) {
            console.log(r)
            history.push({
                user_id: r.user_id,
                start: r.start,
                end: r.end,
                wage: r.wage,
            })
        }
        return history
    }
    const pushHistoryLog = async (log: MongoHistoryLog): Promise<InsertOneResult<any>> => {

        if (currentUser === null) {
            throw 'could not push to database'
        }

        const mongo = currentUser.mongoClient('mongodb-atlas');
        const collection = mongo.db('history').collection('logs');
        console.log(collection)
        const res  = await collection.insertOne(log);

        if (res !== null) {
            setHistory([
                ...history,
                log
            ])
        }

        console.log(res)
        return res

        // TODO: Dead code
        // try {
        //     const store = await StorageService.getInstance();
        //     await store.pushHistory(log);
        //     setHistory([...history, log]);
        //     return Promise.resolve();
        // } catch (err) {
        //     return Promise.reject(err);
        // }
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