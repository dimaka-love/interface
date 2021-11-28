import createStore from 'zustand'

export const useModalOpened = createStore(() => ({
    state: false,
}))

export const useFocusState = createStore(() => ({
    focusedElemsStack: [] as HTMLElement[],
}))

export const addElemToFocus = (elem: HTMLElement) => {
    const [...stack] = useFocusState.getState().focusedElemsStack
    stack.push(elem)
    useFocusState.setState({ focusedElemsStack: stack })
}

export const focusLastElem = () => {
    const [...stack] = useFocusState.getState().focusedElemsStack
    stack.slice(-1)[0]?.focus()
    stack.splice(-1, 1)
    useFocusState.setState({ focusedElemsStack: stack })
}
