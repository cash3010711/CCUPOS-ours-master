export function addToCart(itemID){
    return {
        type: "ADD_TO_CART",
        itemID
    }
}

export function clearCart(){
    return {
        type: "CLEAR_CART",
    }
}
