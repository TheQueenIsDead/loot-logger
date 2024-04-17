import {Storage} from "@ionic/storage";

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
        const [salary, hours, wage] = await Promise.all([
            this.database.get('salary'),
            this.database.get('hours'),
            this.database.get('wage'),
        ])
        console.log(salary, hours, wage)
        return {
            salary: salary,
            hours: hours,
            wage: wage,
        }
    }

    public async setConfig(yearlySalary: number, weeklyHours: number, hourlyWage: number | null): Promise<[any, any, any]> {
        return Promise.all([
            this.database.set('salary', yearlySalary),
            this.database.set('hours', weeklyHours),
            this.database.set('wage', hourlyWage),
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
