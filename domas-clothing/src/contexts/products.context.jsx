// 01 import createContent method
import { createContext, useState } from "react"

// 02 import products > create variable
import PRODUCTS from "../shop-data.json"

// 03 initialize Context > Context value
export const ProductsContext = createContext( {
    // we want to store an array of products
    products: [],
} );

// 04 create component
// Context Provider where we pass in the children and render them between our ProductContext.Provider
export const ProductsProvider = ( {children} ) => {
    // 
    const [ products, setProducts ] = useState(PRODUCTS);
    // export out of value is products as object
    const value = { products };
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}

// 05 import ProductsProvider in index.js and add in render function
// 06 shop.component.jsx