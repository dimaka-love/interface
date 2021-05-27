import { mapValues, omitBy } from "lodash-es";
import createStore, { UseStore } from "zustand";
import { persist } from "zustand/middleware";

import { SettingsSchema } from "./createSettings";
import { useUserState } from "./state";

export let useSettingsStore: UseStore<any> | undefined;
export let appSettingsTabsSchema: undefined | Record<string, any>;
export let settingsLocalStorageKey = "";

const deserializeStore = (str: string): Record<"state" | "version", any> => {
    return JSON.parse(str);
};

const filterValues = <K extends any>(obj: Record<string, K>, filterFn: (key: string, value: K) => boolean) => {
    return Object.fromEntries(
        Object.entries(obj).filter((arr) => filterFn(...arr))
    );
};

// TS = Tabs Schema
type InitSettingsStoreOptions<TS extends Record<string, SettingsSchema>> = {
    localStorageKey: string;
    settingsTabsSchema: TS;
};

export const useSettingsLoaded = () => {
    return useUserState(s => s.userSettingLoaded);
};

type GetSettingValue<
    TS extends { [tab: string]: SettingsSchema; },
    T extends keyof TS,
    G extends keyof TS[T] = keyof TS[T],
    SS extends keyof TS[T][G] = keyof TS[T][G]
    > =
    (tab: T, group: G, setting: SS) => TS[T][G][SS] extends { type: infer U; } ? U : void;

export const getSettingValue = <
    TS extends { [tab: string]: SettingsSchema; },
    T extends keyof TS,
    G extends keyof TS[T],
    SS extends keyof TS[T][G],
    >(tabsSchema: TS, tab: T, group: G, setting: SS):
    TS[T][G][SS] extends { type: "menu"; } ? keyof TS[T][G][SS]["values"] :
    TS[T][G][SS] extends { defaultValue: infer U; } ? U : void => {
    if (!useSettingsStore) throw new Error(`useSettingsStore is not ready yet`);
    const userSettingsState = useSettingsStore.getState();
    return userSettingsState?.[tab]?.[group]?.[setting] ?? tabsSchema[tab][group][setting]["defaultValue"];
};

/** This function **MUST** be called before AppProvider is used. Any suggestions on API improvements are welcome! */
export const initSettingsStore = <TS extends Record<string, SettingsSchema>>({ localStorageKey, settingsTabsSchema }: InitSettingsStoreOptions<TS>) => {
    if (useSettingsStore) {
        if (import.meta.env.NODE_ENV !== "production" && import.meta["hot"]) return;
        throw new Error(`useSettingsStore has already initialized`);
    }
    appSettingsTabsSchema = settingsTabsSchema;
    settingsLocalStorageKey = localStorageKey;
    // try to expose api
    useSettingsStore = createStore(persist(
        () => ({} as any),
        {
            name: localStorageKey,
            // version: 1,
            serialize({ state, version }) {
                state = mapValues(state, (settingsGroups, tabName) => {
                    const settignsGroupsParsed = mapValues(settingsGroups, (settingsList, groupName) => {
                        return filterValues(settingsList, (key, value) => {
                            const settingSchema = settingsTabsSchema[tabName]![groupName]![key]!;
                            if (!("defaultValue" in settingSchema)) return false;
                            return settingSchema.defaultValue !== value;
                        });
                    });
                    return omitBy(settignsGroupsParsed, (value) => {
                        return Object.keys(value).length === 0;
                    });
                });
                state = omitBy(state, (value) => {
                    return Object.keys(value).length === 0;
                });
                return JSON.stringify({ state, version });
            },
            deserialize: deserializeStore,
            onRehydrateStorage() {
                return () => {
                    useUserState.setState({ userSettingLoaded: true });
                };
            },
        }
    ));
};
