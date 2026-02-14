import React, { useEffect } from "react";

export const PathName = () => {
    const token = sessionStorage.getItem("user");

    useEffect(() => {
        if (!token) return;

        const parsedToken = JSON.parse(token);
        const ttl = parsedToken?.ttl || 60000;
        // const ttl = 60000;
        const loginTime = Date.now();

        const expiryTime = loginTime + ttl;
        const now = Date.now();
        const remainingTime = expiryTime - now;

        if (remainingTime <= 0) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            window.location.href = "/login";
            return;
        }

        const timeout = setTimeout(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            window.location.href = "/login";
        }, remainingTime);

        return () => clearTimeout(timeout);
    }, [token]);

    return null;
};