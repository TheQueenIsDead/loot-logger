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

    public getConfig() {

        let config = defaultConfig

        Promise.all([this.database.get('salary'), this.database.get('hours'), this.database.get('wage')])
            .then(values => {
                console.log("Initial DB load: " + JSON.stringify(values))
                const [salary, hours, wage] = values
                if (salary !== null) { config.salary = salary }
                if (hours !== null) { config.hours = hours }
                if (wage !== null) { config.wage = wage }
                return config
            })
            .catch(err => {
                throw err
            })
        console.log("ERRR not good BUDDY")
        return config
    }

    public async setConfig(config: Config): Promise<[any, any, any]> {
        return Promise.all([
            this.database.set('salary', config.salary),
            this.database.set('hours', config.hours),
            this.database.set('wage', config.wage),
        ])
    }

    public async getHistory() {
        const value = await this.database.get('history')
        return JSON.parse(value)
    }

    public async setHistory(history: HistoryLog[]) {
        const value = JSON.stringify(history)
        return this.database.set('history', value)
    }

    public async pushHistory(history: HistoryLog) {
        const value = await this.getHistory()
        value.push(history)
        await this.setHistory(value)
    }
}
