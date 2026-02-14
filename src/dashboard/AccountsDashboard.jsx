import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// APIS
import { fetchAllUsers, fetchUserbySrno, fetchUserSrno, getUsersBalance } from "@/apis/admin/admin";
import { getUserDetails } from "@/apis/user/user";
import { fetchIpDetails, fetchTransactions } from "@/apis/settings/setting";

const AccountsDashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isFetching, setIsFetching] = useState([]);
    const [loading, setLoading] = useState([]);

    const fetchAllUsersDetails = async () => {
        const data = {
            userId: "",
            mobileNo: "",
            companyName: "",
            status: "-1",
        };
        try {
            setIsFetching(true);
            const res = await fetchAllUsers(data);
            setAllUsers(res.userMstPojoList);
        } catch (e) {
            // console.log(e);
            toast.error("Something went wrong! Please try again later.");
        } finally {
            setIsFetching(false);
        }
    };

    const fetchUsersBalanceBySrno = async () => {
        try {
            const res = await getUsersBalance()
        } catch (error) {
            console.log("error", error)
        }
    }

    const fetchUserDetails = async () => {
        setLoading(true);
        const response = await getUserDetails();

        if (response && response.statusCode === 200) {
            setUserData(response.data);
        } else {
            console.error("Failed to load user details.");
            toast.error("Failed to load user details!");
        }
        setLoading(false);
    };

    const getipDetails = async () => {
        try {
            const res = await fetchIpDetails();
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchUserDetailsBySrno = async () => {
        try {
            const res = await fetchUserbySrno();
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchUserBySrno = async () => {
        try {
            const res = await fetchUserSrno()
        } catch (error) {
            console.log("error", error)
        }
    }
    const fetchTransactionsHistoryUser = async () => {
        try {
            const data = {
                startDate: "2022-01-01",
                toDate: "2025-12-30",
                rechargeType: 0,
                userSrNo: "-1"
            };
            const res = await fetchTransactions(data)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchAllUsersDetails();
        fetchUserDetails();
        getipDetails();
        fetchUserDetailsBySrno();
        fetchUserBySrno()
        fetchTransactionsHistoryUser()
        fetchUsersBalanceBySrno()
    }, []);
    return (
        // fetchAllUsers,fetchUserbySrno,getuserdetails,showipdetails,

        <div>AccountsDashboard</div>
    );
};

export default AccountsDashboard;
