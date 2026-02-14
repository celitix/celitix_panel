import React, { useCallback } from "react";
import toast from 'react-hot-toast';

// ICONS
import { FiLogOut } from "react-icons/fi";

const UnknownDashboard = () => {

    const handleLogout = useCallback(() => {
        sessionStorage.removeItem("token");
        toast.success("Logged out successfully!");
        window.location.href = "/login";
        setTimeout(() => authLogout(), 1000);
        // authLogout();
        // setTimeout(() => (window.location.href = "/login"), 1000);
    }, []);
    return (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                Unknown Role Detected
            </h1>

            <p className="text-gray-700 text-lg max-w-md mb-6">
                Your account is successfully logged in but does not have a recognized
                system role assigned. Please contact your administrator to grant the
                correct permissions.
            </p>

            <div className="mt-4 text-sm text-gray-500">
                Error Code: <span className="font-semibold">ROLE_NOT_CONFIGURED</span>
            </div>

            <div className='flex items-center justify-center'>
                <button
                    onClick={handleLogout}
                    className="relative mt-6 inline-flex items-center gap-2 px-5 py-2.5 
                                                rounded-lg bg-gradient-to-r from-red-500 to-red-600 
                                                text-white font-medium shadow-md hover:shadow-lg
                                                hover:from-red-600 hover:to-red-700 transition-all duration-300
                                                overflow-hidden group cursor-pointer"
                >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                    <FiLogOut className="text-lg" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UnknownDashboard;
