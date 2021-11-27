import { ControllerAPI } from './types'
import { DimakaInterfaceEvents } from './types/events'

const emitInterfaceEvent = <E extends keyof DimakaInterfaceEvents>(
    controller: ControllerAPI,
    eventName: E,
    ...args: Parameters<DimakaInterfaceEvents[E]>
) => {
    let returnsFalse = false
    for (const event of controller.events[eventName]) {
        if (event(...(args as [any, any])) === false) returnsFalse = true
    }

    // of course this will be removed and in final release we will use e.preventDefault
    return returnsFalse
}

export const getInterfaceEmitter = (controller: ControllerAPI) => {
    return new Proxy({} as DimakaInterfaceEvents, {
        get(_, eventName) {
            return (...args) => {
                emitInterfaceEvent(controller, eventName as any, ...args)
            }
        },
    })
}
