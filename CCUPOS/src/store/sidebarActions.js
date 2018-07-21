export function openSidebar(){
    return {
        type: "OPEN_SIDEBAR"
    }
}

export function setLanguage(language){
    return {
        type: "SET_LANGUAGE",
        language
    }
}


export function setSidebar(state){
    return {
        type: "SET_SIDEBAR",
        state
    }
}

export function closeSidebar(){
    return {
        type: "CLOSE_SIDEBAR"
    }
}
