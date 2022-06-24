import { createContext, useState, useEffect } from "react"
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
})

// provider > actual component
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] =useState(null);
    const value = { currentUser, setCurrentUser };

    // method will only run on mounting
    useEffect( () => {
        // receives some kind of callback 
        const unsubsribe = onAuthStateChangedListener( (user) => {
            console.log(user);
        })

        return unsubsribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
