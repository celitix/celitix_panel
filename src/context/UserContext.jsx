import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "@/apis/user/user";
import toast from "react-hot-toast";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            setUserLoading(true);
            const response = await getUserDetails();
            if (response && response.statusCode === 200) {
                setUserData(response.data[0]);
            }
        } catch (error) {
            console.error("Failed to load user details:", error);
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserDataContext.Provider value={{ userData, userLoading, refreshUser: fetchUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }
    return context;
};