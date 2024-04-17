type Config = {
    salary: number,
    hours: number,
    wage: number,
}

type HistoryLog = {
    start: number,
    end: number,
    wage: number,
}

type AppData = {
    settings: Config,
    history: HistoryLog[]
}