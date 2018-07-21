const initState = {
    combine: false,
    combinenumber : ""
}

export default function billcombineReducers(state=initState, action){
    switch (action.type) {

        case "SET_COMBINE_NUMBER":
            return {combine:true, combinenumber : action.combinenumber}
        case "CLOSE_COMBINE":
            return { combine:false,combinenumber : ""}
        default:
            return state;
    }
}
