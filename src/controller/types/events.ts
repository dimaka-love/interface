import { MaybePromise } from '../../react/types'
import { Slot } from '.'

export interface DimakaInterfaceEvents {
    movementUpdated(x: number, y: number, z: number)
    movementStopped()
    // we don't care about promises
    // todo ensure effect is cancelled
    /**
     * @param index zero-based
     */
    slotSelectChanged(index: number, slot: Slot): boolean | MaybePromise<void>
    isFlyingChanged(enabled: boolean): boolean | MaybePromise<void>
    /** Slot data updated */
    slotUpdated(index: number, slot: Slot): boolean | MaybePromise<void>
}
