import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
    const [token, setToken] = useState(() => {
        // Initialize token from localStorage if it exists
        return localStorage.getItem("token") || null;
    });

    useEffect(() => {
        // Update localStorage whenever the token changes
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {props.children}
        </UserContext.Provider>
    );
}
