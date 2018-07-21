//state - store object
const initState = {

}

function cartReducers(state=initState, action){
    switch (action.type) {
        case "ADD_TO_CART":
            var newState = Object.assign({}, state);

            if(newState[action.itemID] === null || newState[action.itemID] === undefined) newState[action.itemID]  =  new Object()
            newState[action.itemID].count = newState[action.itemID].count ? newState[action.itemID].count + action.count : action.count;

            return newState;
        case "CHANGE_TO_CART":
            var newState = Object.assign({}, state);

            if(newState[action.itemID] === null || newState[action.itemID] === undefined) newState[action.itemID]  =  new Object()
            newState[action.itemID].count = action.count;
            return newState;
        case "CHANGE_TO_CART_CUSTOM":
            var newState = Object.assign({}, state);

            newState[action.itemID].count +=  action.count - newState[action.itemID][action.customcountkey]
            if(newState[action.itemID] === null || newState[action.itemID] === undefined) newState[action.itemID]  =  new Object()
            newState[action.itemID][action.customcountkey] = action.count;

            return newState;

        case "ADD_TO_CART_CUSTOM":
            var newState = Object.assign({}, state);

            if(newState[action.itemID] === null || newState[action.itemID] === undefined  )
            newState[action.itemID]  =  new Object()
            newState[action.itemID].count = newState[action.itemID].count ? newState[action.itemID].count + action.count : action.count
            newState[action.itemID][`count${action.sugar}${action.ice}`]= newState[action.itemID][`count${action.sugar}${action.ice}`] ? newState[action.itemID][`count${action.sugar}${action.ice}`] + action.count : action.count

            return newState;

        case "REMOVE_FROM_CART":
            var newState = Object.assign({}, state);

            if(newState[action.itemID] === null || newState[action.itemID] === undefined) return newState;

            delete newState[action.itemID]
            return newState;
        case "REMOVE_FROM_CART_CUSTOM":
            var newState = Object.assign({}, state);
            if(newState[action.itemID] === null || newState[action.itemID] === undefined) return newState;
            if(newState[action.itemID].count === newState[action.itemID][action.customcountkey])
            delete newState[action.itemID]
            else{
              newState[action.itemID].count -= newState[action.itemID][action.customcountkey]
              delete newState[action.itemID][action.customcountkey]
            }
            return newState;

        case "CLEAR_CART":
            return {};
        default:
            return state;
    }
}

export default cartReducers
