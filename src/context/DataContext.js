import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode"



const DataContext = createContext(null)

export default DataContext

export function DataContextProvider({ children }) {

    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem("tymonial") !== null) {
            const info = JSON.parse(localStorage.getItem("tymonial"))
            setUser(info)
        }

    }, [])
    const isAuthenticated = checkAuth()

    const logout = () => {
        localStorage.clear()
        window.location = "/login"
    }

    return (
        <DataContext.Provider value={{ logout, user, isAuthenticated }}>
            {children}
        </DataContext.Provider>
    )
}

function checkAuth() {

    const authToken = localStorage.getItem("authToken")

    if (authToken === null) {
        return false;
    }

    const { accessToken } = JSON.parse(authToken);

    if (!accessToken) {
        return false
    }

    try {
        // exp gives us date in miliseconds
        let { exp } = decode(accessToken);

        // convert milliseconds -> seconds
        let date = new Date().getTime() / 1000;

        // check if exp date is < the present date
        if (exp < date) {
            return false;
        }
    } catch (e) {
        return false;
    }

    return true;

}