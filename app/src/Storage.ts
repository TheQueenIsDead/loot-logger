import {Storage} from "@ionic/storage";
import {defaultConfig} from "./defaults";

export class StorageService {

    private static instance: StorageService
    private database: Storage

    private constructor(db: Storage) {
        this.database = db;
    }


    public static async getInstance() {
        if (!StorageService.instance) {
            const store = new Storage();
            const db = await store.create()
            StorageService.instance = new StorageService(db);
        }
        return StorageService.instance;
    }

    public async getConfig() {

        let config = defaultConfig

        const data = await Promise.all([this.database.get('salary'), this.database.get('hours'), this.database.get('wage')])

        const salary = data[0];
        if (salary !== null) {
            config.salary = salary
        }

        const hours = data[1]
        if (hours !== null) {
            config.hours = hours
        }

        const wage = data[2]
        if (wage !== null) {
            config.wage = wage
        }

        return config
    }

    public async setConfig(config: Config): Promise<[any, any, any]> {
        return Promise.all([
            this.database.set('salary', config.salary),
            this.database.set('hours', config.hours),
            this.database.set('wage', config.wage),
        ])
    }

    public async getHistory(): Promise<HistoryLog[]> {
        let history: HistoryLog[] = []
        const data = await this.database.get('history')
        if (data !== null) {
            history = JSON.parse(data)
        }
        return history
    }

    public async setHistory(history: HistoryLog[]) {
        const value = JSON.stringify(history)
        return this.database.set('history', value)
    }

    public async pushHistory(history: HistoryLog) {
        const data = await this.getHistory()
        data.push(history)
        await this.setHistory(data)
    }
}
