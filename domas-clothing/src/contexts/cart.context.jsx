import { createContext, useState, useEffect } from "react";


// helper function > find inside of existing array any item that match id of new Item > if present increase qty, if not add
const addCartItem = ( cartItems, productToAdd ) => {
    // find if cardItems contains productToAdd
    const existingCartItem = cartItems.find( (cartItem) => cartItem.id === productToAdd.id)
    // If found, increment quantity
    if(existingCartItem) {
        return cartItems.map( (cartItem) => cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // new cartItem object, spreading through old properties of cartItem and add quantitiy plus 1
        : cartItem); // just return the cartItem
    }
    // return new array with modified cartItems / new cart item
    // to all existing cartItems, we add new cardItem with productToAdd with additional quantity field of one
    return [...cartItems, { ...productToAdd, quantity: 1}]
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}, // to control the quantitiy we don't want to set the product array directly > we want to add our own method
    cartCount: 0, // total item count cartIcon with useEffect
})

/*
products        CartItems
{               {
    id,             id,
    name,           name,
    price,          price,
    imageUrl        imageUrl,
}                   quantity
                }
*/


export const CartProvider = ( {children} ) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);

    // everytime cartItems array change, we recalculate the cartCount
    useEffect( () => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => { 
        setCartItems( addCartItem (cartItems, productToAdd ));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}