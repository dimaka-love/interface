import { useState, useMemo, useEffect } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { usePopper } from 'react-popper'
import ItemSlot from 'low-level/components/GameHUD/ItemSlot'

//@ts-ignore
// import McData from 'minecraft-data'
//@ts-ignore
// import McAssets from 'minecraft-assets'

const hoverFocusableProxy = proxy({
    value: false,
})

addEventListener('keydown', ({ altKey }) => {
    // todo check other!
    if (altKey) {
        hoverFocusableProxy.value = true
    }
})
// todo window blur
addEventListener('keyup', ({ altKey }) => {
    // todo check other!
    if (altKey) {
        hoverFocusableProxy.value = false
    }
})

let lastClickEventCoords: { clientX: number; clientY: number }
const draggingSlot = proxy({
    slot: undefined as any,
})

const SLOT_BG = '#616161'
const SLOT_SIZE = 32

const getItemData = (name: string) => {
    // todo
    //@ts-ignore
    const mcData = window.mcData ?? McData(window.currentVersion)
    //@ts-ignore
    const mcAssets = window.mcAssets ?? McAssets(window.currentVersion)
    const data = mcData.itemsByName[name]
    const isBlock = !!mcData.blocksByName[name]
    const texturePath = `${isBlock ? 'blocks' : 'items'}/${
        (isBlock ? mcAssets.blocksModels[name]?.textures?.side.replace(/^(minecraft:)?block\//, '') : undefined) || name
    }`
    return { ...data, isBlock: isBlock, texturePath }
}

//@ts-ignore todo
const textureBase = window.textureBase ?? 'https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.16.4'

export const DraggingSlot = () => {
    const [draggingEl, setDraggingEl] = useState(null as HTMLDivElement | null)
    const { slot: draggingItem } = useSnapshot(draggingSlot)

    useEffect(() => {
        const el = draggingEl
        if (!el) return
        const controller = new AbortController()
        document.addEventListener(
            'pointermove',
            e => {
                el.style.left = e.clientX - SLOT_SIZE / 2 + 'px'
                el.style.top = e.clientY - SLOT_SIZE / 2 + 'px'
            },
            {
                signal: controller.signal,
            },
        )
        document.dispatchEvent(new MouseEvent('pointermove', lastClickEventCoords))
        setTimeout(() => {
            document.addEventListener(
                'pointerdown',
                e => {
                    const el = (e.target as HTMLDivElement).closest('.slot') as HTMLDivElement
                    if (!el) return
                    const { slotIndex } = el.dataset
                    // todo restore count
                    if (!slotIndex || isNaN(+slotIndex)) return
                    // const slotType = el.dataset.slotType as SlotType
                    // if (!slotType || slotType === 'blockOutput') return
                    // const thatSlot: Slot = slots[slotType!][slotIndex!]
                    // if (thatSlot) {
                    //     if (thatSlot[0] === draggingSlot.slot![0]) {
                    //         //@ts-expect-error readonly
                    //         thatSlot[1] += draggingSlot.slot![1]
                    //         draggingSlot.slot = undefined
                    //     } else {
                    //         return
                    //     }
                    // } else {
                    //     slots[slotType!][slotIndex!] = draggingSlot.slot
                    draggingItem.action(draggingItem.index, +slotIndex, draggingItem.count)
                    draggingSlot.slot = undefined
                    // }
                    controller.abort()
                },
                {
                    signal: controller.signal,
                },
            )
            // todo
        })
    }, [draggingEl])

    if (!draggingItem) return null
    return (
        <div
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                width: SLOT_SIZE,
                height: SLOT_SIZE,
            }}
            ref={setDraggingEl}
        >
            <ItemSlot {...{ ...getSlotDataProps(draggingItem.itemData) }} />
        </div>
    )
}

const getSlotDataProps = itemData => {
    return {
        blocksPadding: 6,
        data: itemData.isBlock
            ? {
                  type: 'block',
                  // todo
                  count: itemData.count,
                  getTexture(side) {
                      return `${textureBase}/${itemData.texturePath}.png`
                  },
              }
            : {
                  type: 'item',
                  texture: `${textureBase}/${itemData.texturePath}.png`,
                  count: itemData.count,
              },
    } as any
}

export default ({
    item,
    action,
}: {
    item?: { name; count }
    action?: { drag: { /* onMoveStart */ onMoved(oldIndex, newIndex, count); index: number } } /* | SlotActionCallback */
}) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement>(null!)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
    const [hovered, setHovered] = useState(false)
    const hoverFocusable = useSnapshot(hoverFocusableProxy)
    const { slot: draggingItem } = useSnapshot(draggingSlot)

    const { styles, attributes } = usePopper(referenceElement as unknown as Element, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement, padding: 8 } }],
        placement: 'top',
    })

    const { drag: actionDrag } = typeof action === 'object' ? action : { drag: undefined }

    const itemData = useMemo(() => {
        return item && { ...getItemData(item.name), count: item.count }
    }, [item])

    if (actionDrag?.index !== undefined && draggingItem?.index === actionDrag?.index) return null
    return (
        <div
            // data-slot-type={actionDrag?.type}
            data-slot-index={actionDrag?.index}
            style={{ width: SLOT_SIZE, aspectRatio: '1', /* background: SLOT_BG, border: '1px solid black' */ marginRight: 3, marginBottom: 3 }}
            className="slot"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {itemData && hovered && (
                // todo make proxy, only one in state
                <div
                    ref={setPopperElement}
                    style={{
                        ...styles.popper,
                        color: 'white',
                        background: 'black',
                        userSelect: 'text',
                        pointerEvents: hoverFocusable.value ? undefined : 'none',
                        zIndex: 100,
                    }}
                    {...attributes.popper}
                >
                    {itemData.displayName} {itemData.id && `(#${itemData.id})`}
                    <div ref={setArrowElement} style={styles.arrow} />
                </div>
            )}
            {item && (
                <div
                    //@ts-ignore
                    ref={setReferenceElement}
                    style={{
                        width: SLOT_SIZE,
                        height: SLOT_SIZE,
                    }}
                    onPointerDown={event => {
                        if (!action) return
                        if (draggingSlot.slot) return
                        // if (typeof action === 'function') {
                        //     action(item!, event as unknown as PointerEvent)
                        //     return
                        // }
                        const { clientX, clientY } = event
                        lastClickEventCoords = { clientX, clientY }
                        const { index } = action.drag
                        const { count, name } = { ...item }
                        // const reduceSlotQuantity = (by: number) => {
                        //     const restSize = count - by
                        //     action.drag
                        //     slots[type][index] = restSize === 0 ? undefined : [itemId, restSize]
                        // }

                        // if (event.button === 2) {
                        //     const halfSize = Math.ceil(slots[type][index]![1] / 2)
                        //     draggingSlot.slot = [itemId, halfSize]
                        //     reduceSlotQuantity(halfSize)
                        // } else if (event.ctrlKey) {
                        //     if (pushItem('inventory', [itemId, 1])) {
                        //         reduceSlotQuantity(1)
                        //     }
                        // } else if (event.altKey) {
                        //     draggingSlot.slot = [itemId, itemData!.stackSize]
                        // } else {

                        draggingSlot.slot = {
                            index,
                            count,
                            itemData,
                            action: actionDrag?.onMoved,
                        }
                        // slots[type][index] = undefined
                        // }
                    }}
                >
                    <ItemSlot
                        {...{
                            ...getSlotDataProps(itemData),
                        }}
                    />
                </div>
            )}
        </div>
    )
}
