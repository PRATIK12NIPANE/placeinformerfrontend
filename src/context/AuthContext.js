import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const { data } = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
                    setUser(data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }
        };
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
