const initState = {
}

function cartReducers(state=initState, action){
    switch (action.type) {
        case "ADD_TO_CART":
            let newState = Object.assign({}, state);
            newState[action.itemID] = newState[action.itemID] ? newState[action.itemID]+1 : 1;
            return newState;
        case "CLEAR_CART":
            return {};
        default:
            return state;
    }
}

export default cartReducers
