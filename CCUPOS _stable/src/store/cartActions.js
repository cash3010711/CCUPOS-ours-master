export function addToCart(itemID,count){
    return {
        type: "ADD_TO_CART",
        itemID,
        count
    }
}

export function changeToCart(itemID,count){
    return {
        type: "CHANGE_TO_CART",
        itemID,
        count
    }
}

export function changeToCartCustom(itemID,customcountkey,count){
    return {
        type: "CHANGE_TO_CART_CUSTOM",
        itemID,
        customcountkey,
        count
    }
}

export function addToCartCustom(itemID,count,sugar,ice){
    return {
        type: "ADD_TO_CART_CUSTOM",
        itemID,
        count,
        sugar,
        ice
    }
}

export function removeFromCart(itemID){
    return {
        type: "REMOVE_FROM_CART",
        itemID
    }
}

export function removeFromCartCustom(itemID,customcountkey){
    return {
        type: "REMOVE_FROM_CART_CUSTOM",
        itemID,
        customcountkey
    }
}

export function clearCart(){
    return {
        type: "CLEAR_CART",
    }
}
