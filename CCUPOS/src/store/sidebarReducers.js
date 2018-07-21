const initState = {
    open: false,
    language : 'zh-TW'
}

function sidebarReducers(state=initState, action){
    switch (action.type) {
        case "OPEN_SIDEBAR":
            return {...state, open: !state.open}
        case "SET_SIDEBAR":
            return {...state, open: action.state}
        case "SET_LANGUAGE":
            return {...state, language : action.language}
        case "CLOSE_SIDEBAR":
            return {...state, open:false}
        default:
            return state;
    }
}

export default sidebarReducers
