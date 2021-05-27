// SHOULD BE USED AS STANDALONE LIBRARY

export const isMacOs = navigator.userAgent.includes("Mac OS X");

export const getSiblingSelector = (elem: HTMLElement, selector: string, direction: "prev" | "next") => {
    const getSibling = (el: HTMLElement) =>
        (direction === "prev" ? el.previousElementSibling : el.nextElementSibling) as HTMLElement | null;
    let sibling = getSibling(elem);
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = getSibling(sibling);
    }
    return null;
    // describe rotate focus if out of siblings
};

export const getLastSiblingSelector = (elem: HTMLElement, selector: string, direction: "prev" | "next", returnNull = false) => {
    const getSibling = (el: HTMLElement) =>
        (direction === "prev" ? el.previousElementSibling : el.nextElementSibling) as HTMLElement | null;
    let sibling = getSibling(elem);
    while (sibling) {
        const nextSibling = getSibling(sibling);
        if (nextSibling === null || !nextSibling.matches(selector)) return sibling;
        sibling = nextSibling;
    }
    return null;
};
