import { createContext } from "react";

const defaultSettings: Settings = {
    hours: 0, salary: 0, wage: null
}
export const SettingsContext = createContext(defaultSettings);