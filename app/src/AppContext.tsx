import { createContext } from 'react'

export const DefaultAppContextData: AppData = {
    settings: {
        salary: 0,
        hours: 0,
        wage: 0
    },
    history: []
}

export const AppContext = createContext(DefaultAppContextData)
