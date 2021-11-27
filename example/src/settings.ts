import { CreateControllerParams } from '@dimaka/interface/controller/create'

const LOCAL_STORAGE_KEY = 'game-local-settings'
export const settingsProvider: CreateControllerParams['settingsStore']['provider'] =
    {
        load() {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
                ?.data
        },
        saveConfig(newConfig) {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({ data: newConfig, version: '0.0.1' }),
            )
        },
    }
